import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  HttpCode,
  Query,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { Request, Response } from "express";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { VerifyEmailDto } from "./dto/verifyemail.dto";
import { LocalAuthGuard } from "../../shared/guards/local-auth.guard";
import { JwtRefreshTokenAuthGuard } from "../../shared/guards/jwt-refreh-token-auth.guard";
import { Public } from "../../shared/decorators/public.decorator";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { IdTokenDto } from "./dto/id-token.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("register")
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ description: "User registered successfully" })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post("signup/id-token")
  @ApiBody({ type: IdTokenDto })
  @ApiCreatedResponse({ description: "User registered successfully" })
  async signupWithIdToken(@Body() idTokenDto: IdTokenDto) {
    return this.authService.signUpWithIdToken(idTokenDto);
  }

  @Public()
  @Post("signin/id-token")
  @ApiBody({ type: IdTokenDto })
  @ApiCreatedResponse({ description: "User signed in successfully" })
  async signinWithIdToken(@Body() idTokenDto: IdTokenDto) {
    return this.authService.signInWithIdToken(idTokenDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: "Login successful", type: String })
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post("forgot-password")
  @ApiBody({ type: ForgotPasswordDto })
  @ApiOkResponse({ description: "Password reset email sent" })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Public()
  @Post("reset-password")
  @ApiBody({ type: ResetPasswordDto })
  @ApiOkResponse({ description: "Password reset successful" })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Public()
  @Post("verify-email")
  @ApiQuery({ type: VerifyEmailDto })
  @ApiOkResponse({ description: "Email verified successfully" })
  async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  @ApiBearerAuth()
  @ApiOkResponse({ description: "User profile" })
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Public()
  @UseGuards(JwtRefreshTokenAuthGuard)
  @Post("refresh-token")
  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({ description: "Token refreshed successfully", type: String })
  @ApiUnauthorizedResponse({ description: "Invalid refresh token" })
  @HttpCode(200)
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.body.refresh_token;
    const newAccessToken = await this.authService.refreshToken(refreshToken);
    return res.send({ access_token: newAccessToken });
  }

  @Public()
  @Post("callback/apple-signin")
  async appleSignIn(@Req() req: Request) {
    console.log("Apple callback has been called with parameter: ", req);
  }
}
