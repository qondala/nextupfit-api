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
import { NutritionProgramReviewsService } from "./nutritionprogramreviews.service";
import { CreateNutritionProgramReviewDto } from "./dto/create-nutritionprogramreview.dto";

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
import { NutritionProgramReview } from "../../entities/nutrition-program-review.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { UpdateNutritionProgramReviewDto } from "./dto/update.nutritionprogramreview.dto";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("NutritionProgramReviews")
@ApiBearerAuth()
@Controller("nutrition-program-reviews")
@UseGuards(JwtAuthGuard, RolesGuard)
export class NutritionProgramReviewsController {
  constructor(
    private readonly nutritionProgramReviewsService: NutritionProgramReviewsService,
  ) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateNutritionProgramReviewDto })
  @ApiCreatedResponse({
    description: "Nutrition program review created successfully",
    type: NutritionProgramReview,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create nutrition program review",
  })
  create(
    @Body() createNutritionProgramReviewDto: CreateNutritionProgramReviewDto,
    @Req() request: Request,
  ) {
    return this.nutritionProgramReviewsService.create(
      createNutritionProgramReviewDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all nutrition program reviews",
    type: [NutritionProgramReview],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch nutrition program reviews",
  })
  findAll() {
    return this.nutritionProgramReviewsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the nutrition program review",
    type: "number",
  })
  @ApiOkResponse({
    description: "Nutrition program review found successfully",
    type: NutritionProgramReview,
  })
  @ApiNotFoundResponse({ description: "Nutrition program review not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch nutrition program review",
  })
  findOne(@Param("id") id: string) {
    return this.nutritionProgramReviewsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the nutrition program review",
    type: "number",
  })
  @ApiBody({ type: UpdateNutritionProgramReviewDto })
  @ApiOkResponse({
    description: "Nutrition program review updated successfully",
    type: NutritionProgramReview,
  })
  @ApiNotFoundResponse({ description: "Nutrition program review not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update nutrition program review",
  })
  update(
    @Param("id") id: string,
    @Body() updateNutritionProgramReviewDto: UpdateNutritionProgramReviewDto,
    @Req() request: Request,
  ) {
    return this.nutritionProgramReviewsService.update(
      +id,
      updateNutritionProgramReviewDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the nutrition program review",
    type: "number",
  })
  @ApiOkResponse({
    description: "Nutrition program review deleted successfully",
  })
  @ApiNotFoundResponse({ description: "Nutrition program review not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete nutrition program review",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.nutritionProgramReviewsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of nutrition program reviews matching the search query",
    type: [NutritionProgramReview],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search nutrition program reviews",
  })
  searchNutritionProgramReviews(@Query("query") query: string) {
    return this.nutritionProgramReviewsService.searchNutritionProgramReviews(
      query,
    );
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of nutrition program reviews for the user",
    type: [NutritionProgramReview],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch nutrition program reviews for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.nutritionProgramReviewsService.findByUser(+userId);
  }

  @Get("program/:programId")
  @ApiParam({
    name: "programId",
    description: "ID of the nutrition program",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of nutrition program reviews for the program",
    type: [NutritionProgramReview],
  })
  @ApiNotFoundResponse({ description: "Nutrition program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch nutrition program reviews for the program",
  })
  findByProgram(@Param("programId") programId: string) {
    return this.nutritionProgramReviewsService.findByProgram(+programId);
  }
}
