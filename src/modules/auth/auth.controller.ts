import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Query,
  Request
} from "@nestjs/common";

import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import {
  RegisterDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyEmailDto,
  IdTokenDto,
  AuthTokenDto,
  AccessTokenDto,
  LoginDto,
} from "./dto";


import {
  LocalAuthGuard,
  JwtRefreshTokenAuthGuard,
  JwtAuthGuard
} from "@app/common/guards";

import { Public, User } from "@app/common/decorators";
import { DetailsUserDto } from "@app/module/user/dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {

  constructor(private authService: AuthService) {}

  @Public()
  @Post("register")
  @ApiCreatedResponse({
    description: "User registered successfully.",
    type: DetailsUserDto
  })
  async register(@Body() registerDto: RegisterDto): Promise<DetailsUserDto> {
    return this.authService.register(registerDto);
  }


  @Public()
  @Post("signup/id-token")
  @ApiCreatedResponse({
    description: "User registered successfully.",
    type: AuthTokenDto
  })
  async signupWithIdToken(@Body() idTokenDto: IdTokenDto): Promise<AuthTokenDto> {
    const res = await this.authService.signUpWithIdToken(idTokenDto);
    console.log("Signup with id token:", res);
    return res;
  }

  @Public()
  @Post("signin/id-token")
  @ApiOkResponse({
    description: "User signed in successfully.",
    type: AuthTokenDto
  })
  async signinWithIdToken(@Body() idTokenDto: IdTokenDto): Promise<AuthTokenDto> {
    return this.authService.signInWithIdToken(idTokenDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOkResponse({
    description: "User signed in successfully.",
    type: AuthTokenDto
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthTokenDto> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post("forgot-password")
  @ApiOkResponse({ description: "Password reset email sent" })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Public()
  @Post("reset-password")
  @ApiOkResponse({ description: "Password reset successful" })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Public()
  @Get("verify-email")
  @ApiOkResponse({ description: "Email verified successfully" })
  async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto): Promise<void> {
    return this.authService.verifyEmail(verifyEmailDto.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "User profile",
    type: DetailsUserDto
  })
  getProfile(@User() user: DetailsUserDto): DetailsUserDto {
    return user;
  }

  @Public()
  @UseGuards(JwtRefreshTokenAuthGuard)
  @Post("refresh-token")
  @ApiOkResponse({
    description: "Token refreshed successfully.",
    type: AccessTokenDto
  })
  async refreshToken(@Request() req): Promise<AccessTokenDto> {
    const refreshToken = req.body.refreshToken;
    const newAccessToken = await this.authService.refreshToken(refreshToken);
    return newAccessToken;
  }

  @Public()
  @Post("callback/apple-signin")
  async appleSignIn(@Req() req: Request) {
    console.log("Apple callback has been called with parameter: ", req);
  }
}
