import { Test, TestingModule } from "@nestjs/testing";
import { Request, Response } from "express";

import { AuthController } from "@app/module/auth/auth.controller";
import { AuthService } from "@app/module/auth/auth.service";

import {
  LoginDto,
  ForgotPasswordDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from "@app/module/auth/dto";

import {
  JwtAuthGuard,
  JwtRefreshTokenAuthGuard,
  LocalAuthGuard,
} from "@app/common/guards";


describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            forgotPassword: jest.fn(),
            resetPassword: jest.fn(),
            verifyEmail: jest.fn(),
            refreshToken: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideGuard(JwtRefreshTokenAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("register", () => {
    it("should call authService.register", async () => {
      const registerDto: RegisterDto = {
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        password: "password",
      };
      jest.spyOn(authService, "register").mockResolvedValue({} as any);
      await controller.register(registerDto);
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe("login", () => {
    it("should call authService.login", async () => {
      const loginDto: LoginDto = {
        email: "test@example.com",
        password: "password",
      };
      jest.spyOn(authService, "login").mockResolvedValue({} as any);
      await controller.login({ user: { id: 1 } } as unknown as Request);
      expect(authService.login).toHaveBeenCalled();
    });
  });

  describe("forgotPassword", () => {
    it("should call authService.forgotPassword", async () => {
      const forgotPasswordDto: ForgotPasswordDto = {
        email: "test@example.com",
      };
      jest.spyOn(authService, "forgotPassword").mockResolvedValue({} as any);
      await controller.forgotPassword(forgotPasswordDto);
      expect(authService.forgotPassword).toHaveBeenCalledWith(
        forgotPasswordDto.email,
      );
    });
  });

  describe("resetPassword", () => {
    it("should call authService.resetPassword", async () => {
      const resetPasswordDto: ResetPasswordDto = {
        token: "resettoken",
        password: "newpassword",
        email: "",
      };
      jest.spyOn(authService, "resetPassword").mockResolvedValue({} as any);
      await controller.resetPassword(resetPasswordDto);
      expect(authService.resetPassword).toHaveBeenCalledWith(
        resetPasswordDto.token,
        resetPasswordDto.password,
      );
    });
  });

  describe("verifyEmail", () => {
    it("should call authService.verifyEmail", async () => {
      const verifyEmailDto: VerifyEmailDto = {
        token: "verifytoken",
      };
      jest.spyOn(authService, "verifyEmail").mockResolvedValue({} as any);
      await controller.verifyEmail(verifyEmailDto);
      expect(authService.verifyEmail).toHaveBeenCalledWith(
        verifyEmailDto.token,
      );
    });
  });

  describe("refreshToken", () => {
    it("should call authService.refreshToken", async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: "refreshtoken",
      };
      jest.spyOn(authService, "refreshToken").mockResolvedValue({} as any);
      await controller.refreshToken(
        { body: refreshTokenDto } as Request,
        {} as Response,
      );
      expect(authService.refreshToken).toHaveBeenCalledWith(
        refreshTokenDto.refreshToken,
      );
    });
  });
});
