import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import * as argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../entities/user.entity";
import { AuthService } from "../../modules/auth/auth.service";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../../modules/users/users.service";
import { MailService } from "../../shared/services/mail.service";
import { LoginDto } from "../../modules/auth/dto/login.dto";

const mockUser: User = {
  id: 1,
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  passwordHash: "hashedPassword",
  profileImageUrl: null,
  createdAt: new Date(),
  lastLogin: new Date(),
  coach: null,
  goals: [],
  bodyMeasurements: [],
  contentRatings: [],
  contentReviews: [],
  notifications: [],
  coachFollows: [],
  recommendations: [],
  recommendationsReceived: [],
  userPrograms: [],
  trainingSessions: [],
  userNutrition: [],
  userNutritionProgress: [],
  affiliateLinks: [],
  payments: [],
  userSubscriptions: [],
  sessionReviews: [],
  privateDiscussions: [],
  coachRatings: [],
  nutritionProgramReviews: [],
  isEmailVerified: true,
  verificationToken: null,
  resetPasswordToken: null,
  progress: [],
};

const mockUserService = {
  create: jest.fn().mockResolvedValue(mockUser),
  findOneByEmail: jest.fn().mockResolvedValue(mockUser),
  update: jest.fn().mockResolvedValue(mockUser),
  findByResetPasswordToken: jest.fn().mockResolvedValue(mockUser),
  findByVerificationToken: jest.fn().mockResolvedValue(mockUser),
  findOne: jest.fn().mockResolvedValue(mockUser),
};

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockMailService = {
  sendVerificationEmail: jest.fn(),
  sendResetPasswordEmail: jest.fn(),
};

const mockConfigService = {
  get: jest.fn().mockReturnValue("secret"),
};

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("register", () => {
    it("should register a new user and send a verification email", async () => {
      const registerDto = {
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        password: "password",
      };
      await service.register(registerDto);
      expect(mockUserService.create).toHaveBeenCalledWith(registerDto);
      expect(mockUserService.update).toHaveBeenCalledWith(mockUser.id, {
        verificationToken: expect.any(String),
      });
      expect(mockMailService.sendVerificationEmail).toHaveBeenCalledWith(
        mockUser.email,
        expect.any(String),
      );
    });
  });

  describe("validateUser", () => {
    it("should validate a user with correct credentials", async () => {
      const user = await service.validateUser(mockUser.email, "password");
      expect(user).toEqual({
        id: 1,
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        profileImageUrl: null,
        createdAt: new Date(),
        lastLogin: new Date(),
        coach: null,
        goals: [],
        bodyMeasurements: [],
        contentRatings: [],
        contentReviews: [],
        notifications: [],
        coachFollows: [],
        recommendations: [],
        recommendationsReceived: [],
        userPrograms: [],
        trainingSessions: [],
        userNutrition: [],
        userNutritionProgress: [],
        affiliateLinks: [],
        payments: [],
        userSubscriptions: [],
        sessionReviews: [],
        nutritionProgramReviews: [],
        isEmailVerified: true,
        verificationToken: null,
        resetPasswordToken: null,
      });
      expect(argon2.verify).toHaveBeenCalledWith("password");
    });

    it("should return null for incorrect password", async () => {
      const user = await service.validateUser(mockUser.email, "wrongpassword");
      expect(user).toBeNull();
    });

    it("should throw UnauthorizedException for unverified email", async () => {
      mockUser.isEmailVerified = false;
      await expect(
        service.validateUser(mockUser.email, "password"),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe("login", () => {
    it("should generate access and refresh tokens", async () => {
      const loginResponse = await service.login({
        email: mockUser.email,
        password: "password",
      });
      expect(loginResponse.accessToken).toBeDefined();
      expect(loginResponse.refreshToken).toBeDefined();
      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
    });
  });

  describe("forgotPassword", () => {
    it("should send a password reset email", async () => {
      await service.forgotPassword({ email: mockUser.email });
      expect(mockUserService.update).toHaveBeenCalledWith(mockUser.id, {
        resetPasswordToken: expect.any(String),
      });
      expect(mockMailService.sendResetPasswordEmail).toHaveBeenCalledWith(
        mockUser.email,
        expect.any(String),
      );
    });
  });

  describe("resetPassword", () => {
    it("should reset the user password", async () => {
      const token = uuidv4();
      await service.resetPassword({
        email: mockUser.email,
        password: "newpassword",
        token: token,
      });
      expect(mockUserService.findByResetPasswordToken).toHaveBeenCalledWith(
        token,
      );
      expect(argon2.hash).toHaveBeenCalledWith("newpassword", 10);
      expect(mockUserService.update).toHaveBeenCalledWith(mockUser.id, {
        passwordHash: expect.any(String),
        resetPasswordToken: null,
      });
    });
  });

  describe("verifyEmail", () => {
    it("should verify the user email", async () => {
      const token = uuidv4();
      await service.verifyEmail(token);
      expect(mockUserService.findByVerificationToken).toHaveBeenCalledWith(
        token,
      );
      expect(mockUserService.update).toHaveBeenCalledWith(mockUser.id, {
        isEmailVerified: true,
        verificationToken: null,
      });
    });
  });

  describe("refreshToken", () => {
    it("should generate a new access token", async () => {
      const refreshToken = "refreshtoken";
      const newAccessToken = await service.refreshToken({
        refreshToken: refreshToken,
      });
      expect(mockJwtService.verify).toHaveBeenCalledWith(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        userId: mockUser.id,
        email: mockUser.email,
      });
      expect(newAccessToken).toBeDefined();
    });

    it("should throw UnauthorizedException for expired refresh token", async () => {
      mockJwtService.verify.mockImplementation(() => {
        throw new Error("TokenExpiredError");
      });
      await expect(
        service.refreshToken({ refreshToken: "expiredtoken" }),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it("should throw UnauthorizedException for invalid refresh token", async () => {
      mockJwtService.verify.mockImplementation(() => {
        throw new Error("JsonWebTokenError");
      });
      await expect(
        service.refreshToken({ refreshToken: "invalidtoken" }),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
});
