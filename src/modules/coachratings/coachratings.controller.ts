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
import { CreateCoachRatingDto } from "./dto/create-coachrating.dto";
import { UpdateCoachRatingDto } from "./dto/update-coachrating.dto";

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
import { CoachRating } from "../../entities/coach-rating.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CoachRatingsService } from "./caochratings.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("CoachRatings")
@ApiBearerAuth()
@Controller("coach-ratings")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoachRatingsController {
  constructor(private readonly coachRatingsService: CoachRatingsService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateCoachRatingDto })
  @ApiCreatedResponse({
    description: "Coach rating created successfully",
    type: CoachRating,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create coach rating",
  })
  create(
    @Body() createCoachRatingDto: CreateCoachRatingDto,
    @Req() request: Request,
  ) {
    return this.coachRatingsService.create(
      createCoachRatingDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all coach ratings",
    type: [CoachRating],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach ratings",
  })
  findAll() {
    return this.coachRatingsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the coach rating",
    type: "number",
  })
  @ApiOkResponse({
    description: "Coach rating found successfully",
    type: CoachRating,
  })
  @ApiNotFoundResponse({ description: "Coach rating not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach rating",
  })
  findOne(@Param("id") id: string) {
    return this.coachRatingsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the coach rating",
    type: "number",
  })
  @ApiBody({ type: UpdateCoachRatingDto })
  @ApiOkResponse({
    description: "Coach rating updated successfully",
    type: CoachRating,
  })
  @ApiNotFoundResponse({ description: "Coach rating not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update coach rating",
  })
  update(
    @Param("id") id: string,
    @Body() updateCoachRatingDto: UpdateCoachRatingDto,
    @Req() request: Request,
  ) {
    return this.coachRatingsService.update(
      +id,
      updateCoachRatingDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the coach rating",
    type: "number",
  })
  @ApiOkResponse({ description: "Coach rating deleted successfully" })
  @ApiNotFoundResponse({ description: "Coach rating not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete coach rating",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.coachRatingsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of coach ratings matching the search query",
    type: [CoachRating],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search coach ratings",
  })
  searchCoachRatings(@Query("query") query: string) {
    return this.coachRatingsService.searchCoachRatings(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of coach ratings for the user",
    type: [CoachRating],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach ratings for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.coachRatingsService.findByUser(+userId);
  }

  @Get("coach/:coachId")
  @ApiParam({ name: "coachId", description: "ID of the coach", type: "number" })
  @ApiOkResponse({
    description: "List of coach ratings for the coach",
    type: [CoachRating],
  })
  @ApiNotFoundResponse({ description: "Coach not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach ratings for the coach",
  })
  findByCoach(@Param("coachId") coachId: string) {
    return this.coachRatingsService.findByCoach(+coachId);
  }
}
