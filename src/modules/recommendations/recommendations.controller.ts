import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from "@nestjs/common";

import { Request } from "express";
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { Recommendation } from "../../entities/recommendation.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreateRecommendationDto } from "./dto/create-recommendation.dto";
import { UpdateRecommendationDto } from "./dto/update-recommendation.dto";
import { RecommendationsService } from "./recommendations.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("Recommendations")
@ApiBearerAuth()
@Controller("recommendations")
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateRecommendationDto })
  @ApiCreatedResponse({
    description: "Recommendation created successfully",
    type: Recommendation,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create recommendation",
  })
  create(
    @Body() createRecommendationDto: CreateRecommendationDto,
    @Req() request: Request,
  ) {
    return this.recommendationsService.create(
      createRecommendationDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all recommendations",
    type: [Recommendation],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch recommendations",
  })
  findAll() {
    return this.recommendationsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the recommendation",
    type: "number",
  })
  @ApiOkResponse({
    description: "Recommendation found successfully",
    type: Recommendation,
  })
  @ApiNotFoundResponse({ description: "Recommendation not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch recommendation",
  })
  findOne(@Param("id") id: string) {
    return this.recommendationsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the recommendation",
    type: "number",
  })
  @ApiBody({ type: UpdateRecommendationDto })
  @ApiOkResponse({
    description: "Recommendation updated successfully",
    type: Recommendation,
  })
  @ApiNotFoundResponse({ description: "Recommendation not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update recommendation",
  })
  update(
    @Param("id") id: string,
    @Body() updateRecommendationDto: UpdateRecommendationDto,
    @Req() request: Request,
  ) {
    return this.recommendationsService.update(
      +id,
      updateRecommendationDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the recommendation",
    type: "number",
  })
  @ApiOkResponse({ description: "Recommendation deleted successfully" })
  @ApiNotFoundResponse({ description: "Recommendation not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete recommendation",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.recommendationsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of recommendations matching the search query",
    type: [Recommendation],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search recommendations",
  })
  searchRecommendations(@Query("query") query: string) {
    return this.recommendationsService.searchRecommendations(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of recommendations for the user",
    type: [Recommendation],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch recommendations for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.recommendationsService.findByUser(+userId);
  }

  @Get("coach/:coachId")
  @ApiParam({ name: "coachId", description: "ID of the coach", type: "number" })
  @ApiOkResponse({
    description: "List of recommendations for the coach",
    type: [Recommendation],
  })
  @ApiNotFoundResponse({ description: "Coach not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch recommendations for the coach",
  })
  findByCoach(@Param("coachId") coachId: string) {
    return this.recommendationsService.findByCoach(+coachId);
  }

  @Get("recommended-to/:recommendedUserId")
  @ApiParam({
    name: "recommendedUserId",
    description: "ID of the recommended user",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of recommendations for the recommended user",
    type: [Recommendation],
  })
  @ApiNotFoundResponse({ description: "Recommended user not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch recommendations for the recommended user",
  })
  findByRecommendedToUser(
    @Param("recommendedUserId") recommendedUserId: string,
  ) {
    return this.recommendationsService.findByRecommendedToUser(
      +recommendedUserId,
    );
  }
}
