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
import { GoalsService } from "./goals.service";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { UpdateGoalDto } from "./dto/update-goal.dto";
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
import { FitnessGoal } from "../../entities/fitness-goal.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("Goals")
@ApiBearerAuth()
@Controller("goals")
@UseGuards(JwtAuthGuard, RolesGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateGoalDto })
  @ApiCreatedResponse({
    description: "Goal created successfully",
    type: FitnessGoal,
  })
  @ApiInternalServerErrorResponse({ description: "Failed to create goal" })
  create(@Body() createGoalDto: CreateGoalDto, @Req() request: Request) {
    return this.goalsService.create(createGoalDto, request.user.id);
  }

  @Get()
  @ApiOkResponse({ description: "List of all goals", type: [FitnessGoal] })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch goals" })
  findAll() {
    return this.goalsService.findAll();
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "ID of the goal", type: "number" })
  @ApiOkResponse({ description: "Goal found successfully", type: FitnessGoal })
  @ApiNotFoundResponse({ description: "Goal not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch goal" })
  findOne(@Param("id") id: string) {
    return this.goalsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({ name: "id", description: "ID of the goal", type: "number" })
  @ApiBody({ type: UpdateGoalDto })
  @ApiOkResponse({
    description: "Goal updated successfully",
    type: FitnessGoal,
  })
  @ApiNotFoundResponse({ description: "Goal not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to update goal" })
  update(
    @Param("id") id: string,
    @Body() updateGoalDto: UpdateGoalDto,
    @Req() request: Request,
  ) {
    return this.goalsService.update(+id, updateGoalDto, request.user.id);
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({ name: "id", description: "ID of the goal", type: "number" })
  @ApiOkResponse({ description: "Goal deleted successfully" })
  @ApiNotFoundResponse({ description: "Goal not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to delete goal" })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.goalsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of goals matching the search query",
    type: [FitnessGoal],
  })
  @ApiInternalServerErrorResponse({ description: "Failed to search goals" })
  searchGoals(@Query("query") query: string) {
    return this.goalsService.searchGoals(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of goals for the user",
    type: [FitnessGoal],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch goals for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.goalsService.findByUser(+userId);
  }
}
