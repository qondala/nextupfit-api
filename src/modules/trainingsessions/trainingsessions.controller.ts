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
import { TrainingSessionsService } from "./trainingsessions.service";
import { CreateTrainingSessionDto } from "./dto/create-trainingsession.dto";
import { UpdateTrainingSessionDto } from "./dto/update-trainingsession.dto";
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
import { TrainingSession } from "../../entities/training-session.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("TrainingSessions")
@ApiBearerAuth()
@Controller("training-sessions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TrainingSessionsController {
  constructor(
    private readonly trainingSessionsService: TrainingSessionsService,
  ) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateTrainingSessionDto })
  @ApiCreatedResponse({
    description: "Training session created successfully",
    type: TrainingSession,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create training session",
  })
  create(
    @Body() createTrainingSessionDto: CreateTrainingSessionDto,
    @Req() request: Request,
  ) {
    return this.trainingSessionsService.create(
      createTrainingSessionDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all training sessions",
    type: [TrainingSession],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch training sessions",
  })
  findAll() {
    return this.trainingSessionsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the training session",
    type: "number",
  })
  @ApiOkResponse({
    description: "Training session found successfully",
    type: TrainingSession,
  })
  @ApiNotFoundResponse({ description: "Training session not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch training session",
  })
  findOne(@Param("id") id: string) {
    return this.trainingSessionsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the training session",
    type: "number",
  })
  @ApiBody({ type: UpdateTrainingSessionDto })
  @ApiOkResponse({
    description: "Training session updated successfully",
    type: TrainingSession,
  })
  @ApiNotFoundResponse({ description: "Training session not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update training session",
  })
  update(
    @Param("id") id: string,
    @Body() updateTrainingSessionDto: UpdateTrainingSessionDto,
    @Req() request: Request,
  ) {
    return this.trainingSessionsService.update(
      +id,
      updateTrainingSessionDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the training session",
    type: "number",
  })
  @ApiOkResponse({ description: "Training session deleted successfully" })
  @ApiNotFoundResponse({ description: "Training session not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete training session",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.trainingSessionsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of training sessions matching the search query",
    type: [TrainingSession],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search training sessions",
  })
  searchTrainingSessions(@Query("query") query: string) {
    return this.trainingSessionsService.searchTrainingSessions(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of training sessions for the user",
    type: [TrainingSession],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch training sessions for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.trainingSessionsService.findByUser(+userId);
  }

  @Get("session/:sessionId")
  @ApiParam({
    name: "sessionId",
    description: "ID of the session",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of training sessions for the session",
    type: [TrainingSession],
  })
  @ApiNotFoundResponse({ description: "Session not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch training sessions for the session",
  })
  findBySession(@Param("sessionId") sessionId: string) {
    return this.trainingSessionsService.findBySession(+sessionId);
  }
}
