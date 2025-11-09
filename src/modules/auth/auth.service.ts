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
  AccessTokenDto,
} from "./dto";

import { FirebaseAuthService } from "./firebaseauth.service";
import { DetailsUserDto } from "../user/dto";

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
    const decoded = await this.firebaseAuthService.verifyToken(
      idTokenDto.idToken,
    );

    console.log("Decoded id token:", { ...decoded });
    console.log("Frontend id token:", { ...idTokenDto });

    const userExists = await this.userService.userWithEmailExists(
      decoded.email,
    );

    if (!userExists) {
      await this.userService.create({
        email: decoded.email ?? idTokenDto.userData.email,
        profileImageUrl:
          decoded.picture ?? idTokenDto.userData.profileImageUrl ?? "",
        firstName: idTokenDto.userData.firstName ?? decoded.displayName ?? "",
        lastName: idTokenDto.userData.lastName ?? "",
        password: decoded.uid,
        age: 0,
        gender: 0,
      });
    }

    return await this.signInWithIdToken(idTokenDto);
  }

  async signInWithIdToken(idTokenDto: IdTokenDto): Promise<AuthTokenDto> {
    console.log("Login with token data : ", idTokenDto);
    const decoded = await this.firebaseAuthService.verifyToken(
      idTokenDto.idToken,
    );

    const user = await this.userService.findByEmail(decoded.email);

    if (!user) {
      return await this.signUpWithIdToken(idTokenDto);
    }

    return this.generateTokens(user);
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

  async login(loginDto: LoginDto): Promise<AuthTokenDto> {
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

    return this.generateTokens(user);
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


  async validateUser(
    email: string,
    pass: string,
  ): Promise<DetailsUserDto | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await argon2.verify(user.passwordHash, pass))) {
      return user;
    }

    return null;
  }

  async generateTokens(user: UserEntity): Promise<AuthTokenDto> {
    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });

    // Hash refresh token with Argon2id
    const hashedRt = await argon2.hash(refreshToken, {
      type: argon2.argon2id,
    });

    // Store current token as previous token for grace period
    await this.userService.update(user.id, {
      previousRefreshToken: user.refreshToken,
      refreshToken: hashedRt,
      refreshTokenRotatedAt: new Date(),
    });

    return { uid: user.id, accessToken, refreshToken };
  }


  async refreshTokens(refreshToken: string): Promise<AuthTokenDto> {
    try {
      // Grace period for token rotation (in milliseconds)
      // For handling race conditions between refresh token rotation and token reuse detection
      // In fact, two requests can be sent by the client at the same time, creating a race condition
      // The first request will rotate the refresh token, and the second request will use the old refresh token
      // So we make the old refresh token valid for a short period of time (grace period)
      // If the second request is sent within this grace period, it will be accepted
      const GRACE_PERIOD_MS = 10000; // 10 seconds

      // First, verify the JWT signature and expiration
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      });

      const user = await this.userService.findOne(decoded.sub);

      // No refresh token stored - user logged out or never logged in
      if (!user.refreshToken) {
        throw new UnauthorizedException("Invalid refresh token");
      }

      // Verify the refresh token hash against current token
      let isValid = await argon2.verify(user.refreshToken, refreshToken);

      if (!isValid && user.previousRefreshToken && user.refreshTokenRotatedAt) {
        // Check if we're within the grace period
        const timeSinceRotation =
          Date.now() - new Date(user.refreshTokenRotatedAt).getTime();

        if (timeSinceRotation <= GRACE_PERIOD_MS) {
          // Within grace period - check against previous token
          isValid = await argon2.verify(
            user.previousRefreshToken,
            refreshToken,
          );

          if (isValid) {
            console.log(
              `[INFO] Token verified within grace period for user ${user.id} (${timeSinceRotation}ms after rotation)`
            );
          }
        }
      }

      if (!isValid) {
        // TOKEN REUSE DETECTED!
        // The JWT is valid (not expired, correct signature) but doesn't match
        // either current or previous hash (or is outside grace period).
        // This indicates:
        // 1. The token was already used and replaced (outside grace period), OR
        // 2. Potential security breach - stolen token being reused

        console.warn(
          `[SECURITY] Refresh token reuse detected for user ${user.id}. Invalidating all tokens.`
        );

        // Invalidate all refresh tokens for this user as a security measure
        await this.userService.update(user.id, {
          refreshToken: null,
          previousRefreshToken: null,
        });

        throw new UnauthorizedException(
          "Refresh token reuse detected. Please login again."
        );
      }

      // Token is valid - generate new tokens (this will rotate the refresh token)
      return this.generateTokens(user);
    } catch (err) {
      // Handle JWT verification errors (expired, invalid signature, etc.)
      if (err instanceof UnauthorizedException) {
        throw err;
      }

      console.log("Error verifying refresh token: ", err);
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
}
