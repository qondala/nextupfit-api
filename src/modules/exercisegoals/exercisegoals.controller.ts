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
import { ExerciseGoal } from "../../entities/exercise-goal.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreateExerciseGoalDto } from "./dto/create-exercisegoal.dto";
import { UpdateExerciseGoalDto } from "./dto/update-exercisegoal.dto";
import { ExerciseGoalsService } from "./exercisegoals.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("ExerciseGoals")
@ApiBearerAuth()
@Controller("exercise-goals")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExerciseGoalsController {
  constructor(private readonly exerciseGoalsService: ExerciseGoalsService) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateExerciseGoalDto })
  @ApiCreatedResponse({
    description: "Exercise goal created successfully",
    type: ExerciseGoal,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create exercise goal",
  })
  create(
    @Body() createExerciseGoalDto: CreateExerciseGoalDto,
    @Req() request: Request,
  ) {
    return this.exerciseGoalsService.create(
      createExerciseGoalDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all exercise goals",
    type: [ExerciseGoal],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch exercise goals",
  })
  findAll() {
    return this.exerciseGoalsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the exercise goal",
    type: "number",
  })
  @ApiOkResponse({
    description: "Exercise goal found successfully",
    type: ExerciseGoal,
  })
  @ApiNotFoundResponse({ description: "Exercise goal not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch exercise goal",
  })
  findOne(@Param("id") id: string) {
    return this.exerciseGoalsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the exercise goal",
    type: "number",
  })
  @ApiBody({ type: UpdateExerciseGoalDto })
  @ApiOkResponse({
    description: "Exercise goal updated successfully",
    type: ExerciseGoal,
  })
  @ApiNotFoundResponse({ description: "Exercise goal not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update exercise goal",
  })
  update(
    @Param("id") id: string,
    @Body() updateExerciseGoalDto: UpdateExerciseGoalDto,
    @Req() request: Request,
  ) {
    return this.exerciseGoalsService.update(
      +id,
      updateExerciseGoalDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the exercise goal",
    type: "number",
  })
  @ApiOkResponse({ description: "Exercise goal deleted successfully" })
  @ApiNotFoundResponse({ description: "Exercise goal not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete exercise goal",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.exerciseGoalsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of exercise goals matching the search query",
    type: [ExerciseGoal],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search exercise goals",
  })
  searchExerciseGoals(@Query("query") query: string) {
    return this.exerciseGoalsService.searchExerciseGoals(query);
  }

  @Get("exercise/:exerciseId")
  @ApiParam({
    name: "exerciseId",
    description: "ID of the exercise",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of exercise goals for the exercise",
    type: [ExerciseGoal],
  })
  @ApiNotFoundResponse({ description: "Exercise not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch exercise goals for the exercise",
  })
  findByExercise(@Param("exerciseId") exerciseId: string) {
    return this.exerciseGoalsService.findByExercise(+exerciseId);
  }

  @Get("goal/:goalId")
  @ApiParam({ name: "goalId", description: "ID of the goal", type: "number" })
  @ApiOkResponse({
    description: "List of exercise goals for the goal",
    type: [ExerciseGoal],
  })
  @ApiNotFoundResponse({ description: "Goal not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch exercise goals for the goal",
  })
  findByGoal(@Param("goalId") goalId: string) {
    return this.exerciseGoalsService.findByGoal(+goalId);
  }
}
