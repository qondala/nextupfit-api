import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { MailService } from "../../shared/services/mail.service";

import { User } from "../../entities/user.entity";
import { UsersService } from "../users/users.service";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RegisterDto } from "./dto/register.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { FirebaseAuthService } from "./firebaseauth.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private firebaseAuthService: FirebaseAuthService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const userExists = await this.usersService.findByEmail(registerDto.email);
    if (userExists) {
      throw new ConflictException("Email already exists");
    }

    const user = await this.usersService.create(registerDto);

    // Generate a verification token (e.g., using JWT)
    const verificationToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: "1h" },
    );
    const context = {
      url: `${process.env.APP_URL}/auth/verify-email?token=${verificationToken}`,
      name: user.email,
    };
    const subject = `Welcome to ${process.env.APP_NAME} ! Please confirm your email.`;

    // Send email verification
    await this.mailService.sendMail(user.email, subject, context);

    return user;
  }

  async signUpWithIdToken(idToken: string) {
    const decoded = await this.firebaseAuthService.verifyToken(idToken);
    const userExists = await this.usersService.findByEmail(decoded.email);
    if (!userExists) {
      await this.usersService.create({
        email: decoded.email,
        profileImageUrl: decoded.picture,
        firstName: decoded.displayName,
        lastName: "",
        password: decoded.uid,
      });
    }
    return await this.signInWithIdToken(idToken);
  }

  async signInWithIdToken(
    idToken: string,
  ): Promise<{ uid: number; accessToken: string; refreshToken: string }> {
    const decoded = await this.firebaseAuthService.verifyToken(idToken);
    const user = await this.usersService.findByEmail(decoded.email);
    if (!user) {
      return await this.signUpWithIdToken(idToken);
      // throw new UnauthorizedException("Invalid credentials");
    }

    const passwordMatch = await argon2.verify(user.passwordHash, decoded.uid);
    if (!passwordMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user.id, email: user.email };
    return {
      uid: user.id,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: "5h",
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      }),
    };
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const userId = decoded.userId;
      const user = await this.usersService.findOne(userId);

      if (!user) {
        throw new UnauthorizedException("Invalid verification token");
      }

      if (!user.isEmailVerified) {
        user.isEmailVerified = true;
        await this.usersService.update(userId, user);
      } else {
        console.log("User already verified");
      }
    } catch (err) {
      throw new UnauthorizedException("Invalid verification token");
    }
  }
  async login(
    loginDto: LoginDto,
  ): Promise<{ uid: number; accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const passwordMatch = await argon2.verify(
      user.passwordHash,
      loginDto.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user.id, email: user.email };
    return {
      uid: user.id,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: "5h",
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      }),
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new UnauthorizedException("Invalid email");
    }

    // Generate a reset token (e.g., using JWT)
    const resetToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: "1h" },
    );

    // Send reset password email
    await this.mailService.sendMail(
      user.email,
      "Reset your password",
      `
      <p>Click this link to reset your password:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Reset Password</a>
      `,
    );
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    // Validate reset token
    try {
      const decoded = this.jwtService.verify(resetPasswordDto.token, {
        secret: process.env.JWT_SECRET,
      });

      const userId = decoded.userId;
      const user = await this.usersService.findOne(userId);
      if (!user) {
        throw new UnauthorizedException("Invalid reset token");
      }

      const hashedPassword = await argon2.hash(resetPasswordDto.password);
      user.passwordHash = hashedPassword;
      await this.usersService.update(user.id, user);
    } catch (err) {
      throw new UnauthorizedException("Invalid reset token");
    }
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ accessToken: string }> {
    // Validate refresh token
    try {
      const decoded = this.jwtService.verify(refreshTokenDto.refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET, // Use a separate secret for refresh tokens
      });

      // Generate new access token
      const payload = { sub: decoded.sub, email: decoded.email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken: accessToken };
    } catch (err) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await argon2.verify(user.passwordHash, pass))) {
      const { passwordHash, ...result } = user; // Exclure passwordHash du résultat
      return result;
    }
    return null;
  }
}
