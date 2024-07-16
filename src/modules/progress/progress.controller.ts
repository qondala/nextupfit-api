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
import { ProgressService } from "./progress.service";

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
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreateProgressDto } from "./dto/create-progress.dto";
import { UpdateProgressDto } from "./dto/update-progress.dto";
import { Progress } from "../../entities/progress.entity";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("Progress")
@ApiBearerAuth()
@Controller("progress")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateProgressDto })
  @ApiCreatedResponse({
    description: "Progress created successfully",
    type: Progress,
  })
  @ApiInternalServerErrorResponse({ description: "Failed to create progress" })
  create(
    @Body() createProgressDto: CreateProgressDto,
    @Req() request: Request,
  ) {
    return this.progressService.create(createProgressDto, request.user.id);
  }

  @Get()
  @ApiOkResponse({ description: "List of all progress", type: [Progress] })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch progress" })
  findAll() {
    return this.progressService.findAll();
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "ID of the progress", type: "number" })
  @ApiOkResponse({ description: "Progress found successfully", type: Progress })
  @ApiNotFoundResponse({ description: "Progress not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch progress" })
  findOne(@Param("id") id: string) {
    return this.progressService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({ name: "id", description: "ID of the progress", type: "number" })
  @ApiBody({ type: UpdateProgressDto })
  @ApiOkResponse({
    description: "Progress updated successfully",
    type: Progress,
  })
  @ApiNotFoundResponse({ description: "Progress not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to update progress" })
  update(
    @Param("id") id: string,
    @Body() updateProgressDto: UpdateProgressDto,
    @Req() request: Request,
  ) {
    return this.progressService.update(+id, updateProgressDto, request.user.id);
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({ name: "id", description: "ID of the progress", type: "number" })
  @ApiOkResponse({ description: "Progress deleted successfully" })
  @ApiNotFoundResponse({ description: "Progress not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to delete progress" })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.progressService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of progress matching the search query",
    type: [Progress],
  })
  @ApiInternalServerErrorResponse({ description: "Failed to search progress" })
  searchProgress(@Query("query") query: string) {
    return this.progressService.searchProgress(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of progress for the user",
    type: [Progress],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch progress for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.progressService.findByUser(+userId);
  }

  @Get("exercise/:exerciseId")
  @ApiParam({
    name: "exerciseId",
    description: "ID of the exercise",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of progress for the exercise",
    type: [Progress],
  })
  @ApiNotFoundResponse({ description: "Exercise not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch progress for the exercise",
  })
  findByExercise(@Param("exerciseId") exerciseId: string) {
    return this.progressService.findByExercise(+exerciseId);
  }
}
