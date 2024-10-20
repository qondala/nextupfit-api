import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { HomeService } from "./home.service";
import { ApiTags, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { Coach } from "src/entities/coach.entity";
import { Category } from "src/entities/category.entity";
import { Challenge } from "src/entities/challenge.entity";
import { User } from "src/entities/user.entity";
import { Session } from "src/entities/session.entity";
import { UserRole } from "src/shared/constants/roles";
import { Roles } from "src/shared/guards/roles.guards";
import { Request } from "express";
import { NutritionProgram } from "src/entities/nutrition-program.entity";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";

@ApiTags("Home")
@Controller("home")
@UseGuards(JwtAuthGuard) //  Activer l'authentification pour toutes les routes de ce contrôleur
@ApiBearerAuth()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  // home.controller.ts
  @Get()
  @ApiOkResponse({ description: "Successfully retrieved home data" })
  async getHomeData(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("pageSize", new DefaultValuePipe(10), ParseIntPipe)
    pageSize: number = 10,
    @Req() req: Request, // request object for user id
  ): Promise<any> {
    const userId = req.user?.id;
    return this.homeService.getHomeData(page, pageSize, userId);
  }

  @Get("categories")
  @ApiOkResponse({
    type: [Category],
    description: "Successfully retrieved categories",
  })
  async getCategories(): Promise<Category[]> {
    return this.homeService.getCategories();
  }

  @Get("sessions")
  @ApiOkResponse({
    type: [Session],
    description: "Successfully retrieved sessions",
  })
  async getSessions(
    @Query("page") page: number = 1,
    @Query("pageSize") pageSize: number = 10,
  ): Promise<PaginationResult<Session>> {
    return this.homeService.getSessions(page, pageSize);
  }

  @Get("trending-sessions")
  @ApiOkResponse({
    type: [Session],
    description: "Successfully retrieved trending sessions",
  })
  async getTrendingSessions(): Promise<Session[]> {
    return this.homeService.getTrendingSessions();
  }

  @Get("challenges")
  @ApiOkResponse({
    type: [Challenge],
    description: "Successfully retrieved challenges",
  })
  async getChallenges(): Promise<PaginationResult<Challenge>> {
    return this.homeService.getChallenges();
  }

  // @Get("nutrition-sessions")
  // @ApiOkResponse({
  //   type: [Session],
  //   description: "Successfully retrieved nutrition sessions",
  // })
  // async getNutritionSessions(): Promise<Session[]> {
  //   return this.homeService.getNutritionSessions();
  // }

  @Get("new-sessions")
  @Roles(UserRole.USER) // Restreindre l'accès aux utilisateurs authentifiés
  @ApiOkResponse({
    type: [Session],
    description: "Successfully retrieved new sessions",
  })
  async getNewSessions(@Req() req: Request): Promise<Session[]> {
    const userId = req.user.id;
    return this.homeService.getNewSessions(userId);
  }

  @Get("featured-trainers")
  @ApiOkResponse({
    type: [User],
    description: "Successfully retrieved featured trainers",
  })
  async getFeaturedTrainers(): Promise<Coach[]> {
    return this.homeService.getFeaturedTrainers();
  }
  @Get("nutrition-sessions")
  @ApiOkResponse({
    type: [NutritionProgram],
    description: "Successfully retrieved nutrition sessions/programs",
  })
  async getNutritionSessions(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("pageSize", new DefaultValuePipe(10), ParseIntPipe)
    pageSize: number = 10,
  ): Promise<PaginationResult<NutritionProgram>> {
    return this.homeService.getNutritionSessions(page, pageSize);
  }

  @Get("nutrition-challenges")
  @ApiOkResponse({
    type: [NutritionProgram],
    description: "Successfully retrieved nutrition challenges/programs",
  })
  async getNutritionChallenges(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("pageSize", new DefaultValuePipe(10), ParseIntPipe)
    pageSize: number = 10,
  ): Promise<PaginationResult<NutritionProgram>> {
    return this.homeService.getNutritionChallenges(page, pageSize);
  }

  @Get("listed-trainers")
  @ApiOkResponse({
    type: [Coach],
    description: "Successfully retrieved nutrition challenges/programs",
  })
  async getListedTrainers(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("pageSize", new DefaultValuePipe(10), ParseIntPipe)
    pageSize: number = 10,
  ): Promise<PaginationResult<Coach>> {
    return this.homeService.getListedTrainers(page, pageSize);
  }
}
