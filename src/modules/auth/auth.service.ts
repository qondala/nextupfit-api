import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";

import { MailService } from "@app/common/service";

import { UserService } from "@app/module/user/service";
import { UserEntity } from "@app/module/user/entity";

import {
  LoginDto,
  ForgotPasswordDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
  IdTokenDto,
  AuthTokenDto,
  AccessTokenDto
} from "./dto";


import { FirebaseAuthService } from "./firebaseauth.service";
import { DetailsUserDto } from "../user/dto";
import { UserProfileTypeEnum } from "../user/types";



@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
    private firebaseAuthService: FirebaseAuthService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserEntity> {

    if (await this.userService.userWithEmailExists(registerDto.email)) {
      throw new ConflictException("Email already exists");
    }

    const user = await this.userService.create({
      ...registerDto,
      userProfile: [UserProfileTypeEnum.attendee],
    });

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

  async signUpWithIdToken(idTokenDto: IdTokenDto): Promise<AuthTokenDto> {
    console.log("Signin up with id token :", idTokenDto);
    const decoded = await this.firebaseAuthService.verifyToken(idTokenDto.idToken);

    console.log("Decoded id token:", {...decoded});
    console.log("Frontend id token:", {...idTokenDto});

    const userExists = await this.userService.userWithEmailExists(decoded.email);

    if (!userExists) {
      await this.userService.create({
        email: decoded.email ?? idTokenDto.userData.email,
        profileImageUrl: decoded.picture ?? idTokenDto.userData.profileImageUrl ?? "",
        firstName: idTokenDto.userData.firstName ?? decoded.displayName ?? "",
        lastName: idTokenDto.userData.lastName ?? "",
        password: decoded.uid,
        userProfile: [UserProfileTypeEnum.attendee],
      });
    }

    return await this.signInWithIdToken(idTokenDto);
  }

  async signInWithIdToken(
    idTokenDto: IdTokenDto,
  ): Promise<AuthTokenDto> {
    console.log("Login with token data : ", idTokenDto);
    const decoded = await this.firebaseAuthService.verifyToken(idTokenDto.idToken);

    const user = await this.userService.findByEmail(decoded.email);

    if (!user) {
      return await this.signUpWithIdToken(idTokenDto);
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
      const user = await this.userService.findOne(userId);

      if (!user) {
        throw new UnauthorizedException("Invalid verification token");
      }

      if (!user.isEmailVerified) {
        user.isEmailVerified = true;
        await this.userService.update(userId, user);
      } else {
        console.log("User already verified");
      }
    } catch (err) {
      throw new UnauthorizedException("Invalid verification token");
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<AuthTokenDto> {
    const user = await this.userService.findByEmail(loginDto.email);
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
    const user = await this.userService.findByEmail(forgotPasswordDto.email);
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
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new UnauthorizedException("Invalid reset token");
      }

      const hashedPassword = await argon2.hash(resetPasswordDto.password);
      user.passwordHash = hashedPassword;
      await this.userService.update(user.id, user);
    } catch (err) {
      throw new UnauthorizedException("Invalid reset token");
    }
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<AccessTokenDto> {
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

  async validateUser(email: string, pass: string): Promise<DetailsUserDto | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await argon2.verify(user.passwordHash, pass))) {
      return user;
    }

    return null;
  }

}
