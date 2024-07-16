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
import { ExerciseNutritionService } from "./exercisenutrition.service";
import { CreateExerciseNutritionDto } from "./dto/create-exercisenutrition.dto";
import { UpdateExerciseNutritionDto } from "./dto/update-exercisenutrition.dto";
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
import { ExerciseNutrition } from "../../entities/exercise-nutrition.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("ExerciseNutrition")
@ApiBearerAuth()
@Controller("exercise-nutrition")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExerciseNutritionController {
  constructor(
    private readonly exerciseNutritionService: ExerciseNutritionService,
  ) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateExerciseNutritionDto })
  @ApiCreatedResponse({
    description: "Exercise nutrition created successfully",
    type: ExerciseNutrition,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create exercise nutrition",
  })
  create(
    @Body() createExerciseNutritionDto: CreateExerciseNutritionDto,
    @Req() request: Request,
  ) {
    return this.exerciseNutritionService.create(
      createExerciseNutritionDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all exercise nutrition",
    type: [ExerciseNutrition],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch exercise nutrition",
  })
  findAll() {
    return this.exerciseNutritionService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the exercise nutrition",
    type: "number",
  })
  @ApiOkResponse({
    description: "Exercise nutrition found successfully",
    type: ExerciseNutrition,
  })
  @ApiNotFoundResponse({ description: "Exercise nutrition not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch exercise nutrition",
  })
  findOne(@Param("id") id: string) {
    return this.exerciseNutritionService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the exercise nutrition",
    type: "number",
  })
  @ApiBody({ type: UpdateExerciseNutritionDto })
  @ApiOkResponse({
    description: "Exercise nutrition updated successfully",
    type: ExerciseNutrition,
  })
  @ApiNotFoundResponse({ description: "Exercise nutrition not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update exercise nutrition",
  })
  update(
    @Param("id") id: string,
    @Body() updateExerciseNutritionDto: UpdateExerciseNutritionDto,
    @Req() request: Request,
  ) {
    return this.exerciseNutritionService.update(
      +id,
      updateExerciseNutritionDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the exercise nutrition",
    type: "number",
  })
  @ApiOkResponse({ description: "Exercise nutrition deleted successfully" })
  @ApiNotFoundResponse({ description: "Exercise nutrition not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete exercise nutrition",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.exerciseNutritionService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of exercise nutrition matching the search query",
    type: [ExerciseNutrition],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search exercise nutrition",
  })
  searchExerciseNutrition(@Query("query") query: string) {
    return this.exerciseNutritionService.searchExerciseNutrition(query);
  }

  @Get("exercise/:exerciseId")
  @ApiParam({
    name: "exerciseId",
    description: "ID of the exercise",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of exercise nutrition for the exercise",
    type: [ExerciseNutrition],
  })
  @ApiNotFoundResponse({ description: "Exercise not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch exercise nutrition for the exercise",
  })
  findByExercise(@Param("exerciseId") exerciseId: string) {
    return this.exerciseNutritionService.findByExercise(+exerciseId);
  }

  @Get("program/:programId")
  @ApiParam({
    name: "programId",
    description: "ID of the nutrition program",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of exercise nutrition for the program",
    type: [ExerciseNutrition],
  })
  @ApiNotFoundResponse({ description: "Nutrition program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch exercise nutrition for the program",
  })
  findByProgram(@Param("programId") programId: string) {
    return this.exerciseNutritionService.findByProgram(+programId);
  }
}
