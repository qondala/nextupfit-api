import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
  ParseEnumPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiParam,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";

import {
  ProgramEvolutionEventTypeEnum,
  ProgramItemTypeEnum,
} from "@app/module/program/types";

import { UserProgramEvolutionService } from "../service";
import {
  CreateUserProgramEvolutionEventDto,
  UpdateUserProgramEvolutionDto,
  DetailsUserProgramEvolutionEventDto,
  PaginatedDetailsUserProgramEvolutionEventDto,
} from "../dto";

@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/program-evolution")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserProgramEvolutionController {
  constructor(
    private readonly userProgramEvolutionService: UserProgramEvolutionService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new user program evolution",
    operationId: "createUserProgramEvolution",
  })
  @ApiBody({
    required: true,
    type: CreateUserProgramEvolutionEventDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User program evolution created successfully",
    type: DetailsUserProgramEvolutionEventDto,
  })
  async create(
    @Body() createUserProgramEvolutionDto: CreateUserProgramEvolutionEventDto,
  ): Promise<DetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.create(
      createUserProgramEvolutionDto,
    );
  }

  @Get("user/:userId/progression/:programItemId/:programItem")
  @ApiOperation({
    summary: "Get user progression",
    operationId: "getUserProgression",
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 12345,
  })
  @ApiParam({
    name: "programItemId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Program item id",
    example: 12345,
  })
  @ApiParam({
    name: "programItem",
    required: true,
    description: "Program item type",
    example: ProgramItemTypeEnum.activity,
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the user progression.",
    type: DetailsUserProgramEvolutionEventDto,
  })
  async getUserProgression(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("programItemId", ParseIntPipe) programItemId: number,
    @Param("programItem", new ParseEnumPipe(ProgramItemTypeEnum))
    programItem: ProgramItemTypeEnum,
  ): Promise<DetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.getUserProgression(
      userId,
      programItemId,
      programItem,
    );
  }

  @Get("events/user/:userId/program/:programId/steps")
  @ApiOperation({
    summary: "Get user program steps events",
    operationId: "findUserProgramStepsEvents",
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 12345,
  })
  @ApiParam({
    name: "programId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Program id",
    example: 12345,
  })
  @ApiParam({
    name: "type",
    required: true,
    description: "Event type",
    example: ProgramEvolutionEventTypeEnum.done,
    enum: ProgramEvolutionEventTypeEnum,
    enumName: "ProgramEvolutionEventTypeEnum",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Limit number",
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the user program steps events.",
    type: PaginatedDetailsUserProgramEvolutionEventDto,
  })
  async findUserProgramStepsEvents(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("programId", ParseIntPipe) programId: number,
    @Param("type", new ParseEnumPipe(ProgramEvolutionEventTypeEnum))
    type: ProgramEvolutionEventTypeEnum,
    @Query("page", ParseIntPipe) page?: number,
    @Query("limit", ParseIntPipe) limit?: number,
  ): Promise<PaginatedDetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.findUserProgramStepsEvents(
      userId,
      programId,
      type,
      { page, limit },
    );
  }

  @Get("events/user/:userId/step/:programStepId/activities")
  @ApiOperation({
    summary: "Get user program step activities events",
    operationId: "findUserProgramStepActivitiesEvents",
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 12345,
  })
  @ApiParam({
    name: "programStepId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Program step id",
    example: 12345,
  })
  @ApiParam({
    name: "type",
    required: true,
    description: "Event type",
    example: ProgramEvolutionEventTypeEnum.done,
    enum: ProgramEvolutionEventTypeEnum,
    enumName: "ProgramEvolutionEventTypeEnum",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Limit number",
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the user program step activities.",
    type: PaginatedDetailsUserProgramEvolutionEventDto,
  })
  async findUserProgramStepActivitiesEvents(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("programStepId", ParseIntPipe) programStepId: number,
    @Param("type", new ParseEnumPipe(ProgramEvolutionEventTypeEnum))
    type: ProgramEvolutionEventTypeEnum,
    @Query("page", ParseIntPipe) page?: number,
    @Query("limit", ParseIntPipe) limit?: number,
  ): Promise<PaginatedDetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.findUserProgramStepActivitiesEvents(
      userId,
      programStepId,
      type,
      { page, limit },
    );
  }

  @Get("events/user/:userId/activity/:programStepActivityId/workingsessions")
  @ApiOperation({
    summary: "Get user program step activity workingsessions events",
    operationId: "findUserProgramStepActivityWorkingsessionsEvents",
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 12345,
  })
  @ApiParam({
    name: "programStepActivityId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Program step activity id",
    example: 12345,
  })
  @ApiParam({
    name: "type",
    required: true,
    description: "Event type",
    example: ProgramEvolutionEventTypeEnum.done,
    enum: ProgramEvolutionEventTypeEnum,
    enumName: "ProgramEvolutionEventTypeEnum",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Limit number",
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "Return the user program step activity workingsessions events.",
    type: PaginatedDetailsUserProgramEvolutionEventDto,
  })
  async findUserProgramStepActivityWorkingsessionsEvents(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("programStepActivityId", ParseIntPipe) programStepActivityId: number,
    @Param("type", new ParseEnumPipe(ProgramEvolutionEventTypeEnum))
    type: ProgramEvolutionEventTypeEnum,
    @Query("page", ParseIntPipe) page?: number,
    @Query("limit", ParseIntPipe) limit?: number,
  ): Promise<PaginatedDetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.findUserProgramStepActivityWorkingsessionsEvents(
      userId,
      programStepActivityId,
      type,
      { page, limit },
    );
  }

  @Get("events/user/:userId/workingsession/:workingSessionId/practices")
  @ApiOperation({
    summary: "Get user program step activity workingsessions practices events",
    operationId: "findUserProgramStepActivityWorkingsessionPracticesEvents",
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
  })
  @ApiParam({
    name: "workingSessionId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Working session id",
  })
  @ApiParam({
    name: "type",
    required: true,
    description: "Event type",
    example: ProgramEvolutionEventTypeEnum.done,
    enum: ProgramEvolutionEventTypeEnum,
    enumName: "ProgramEvolutionEventTypeEnum",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Limit number",
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "Return the user program step activity workingsessions practices.",
    type: PaginatedDetailsUserProgramEvolutionEventDto,
  })
  async findUserProgramStepActivityWorkingsessionPracticesEvents(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("workingSessionId", ParseIntPipe) workingSessionId: number,
    @Param("type", new ParseEnumPipe(ProgramEvolutionEventTypeEnum))
    type: ProgramEvolutionEventTypeEnum,
    @Query("page", ParseIntPipe) page?: number,
    @Query("limit", ParseIntPipe) limit?: number,
  ): Promise<PaginatedDetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.findUserProgramStepActivityWorkingsessionPracticesEvents(
      userId,
      workingSessionId,
      type,
      { page, limit },
    );
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a user program evolution by id",
    operationId: "findOneUserProgramEvolution",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User program evolution id",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the user program evolution.",
    type: DetailsUserProgramEvolutionEventDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a user program evolution",
    operationId: "updateUserProgramEvolution",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User program evolution id",
    example: 1,
  })
  @ApiBody({
    required: true,
    type: UpdateUserProgramEvolutionDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The user program evolution has been successfully updated.",
    type: DetailsUserProgramEvolutionEventDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserProgramEvolutionDto: UpdateUserProgramEvolutionDto,
  ): Promise<DetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.update(
      id,
      updateUserProgramEvolutionDto,
    );
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a user program evolution",
    operationId: "removeUserProgramEvolution",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User program evolution id",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The user program evolution has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.userProgramEvolutionService.remove(id);
  }
}
