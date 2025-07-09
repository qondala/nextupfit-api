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
  ApiParam
} from "@nestjs/swagger";


import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { UserProgramEvolutionService } from "../service";
import {
  CreateUserProgramEvolutionEventDto,
  UpdateUserProgramEvolutionDto,
  DetailsUserProgramEvolutionEventDto,
  PaginatedDetailsUserProgramEvolutionEventDto
} from "../dto";
import {
  ProgramEvolutionEventTypeEnum,
  ProgramItemTypeEnum
} from "@app/module/program/types";


@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/program-evolution")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserProgramEvolutionController {
  constructor(private readonly userProgramEvolutionService: UserProgramEvolutionService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new user program evolution",
    operationId: "createUserProgramEvolution"
  })
  @ApiBody({
    required: true,
    type: CreateUserProgramEvolutionEventDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User program evolution created successfully",
    type: DetailsUserProgramEvolutionEventDto
  })
  async create(@Body() createUserProgramEvolutionDto: CreateUserProgramEvolutionEventDto): Promise<DetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.create(createUserProgramEvolutionDto);
  }

  @Get("user/:userId/all")
  @ApiOperation({
    summary: "Get all user program evolutions with pagination",
    operationId: "findAllUserProgramEvolutions"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 12345
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user program evolutions with pagination.",
    type: PaginatedDetailsUserProgramEvolutionEventDto,
  })
  async findAll(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto): Promise<PaginatedDetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.findAll(userId, pagination);
  }


  @Get("user/:userId/type/:eventType")
  @ApiOperation({
    summary: "Get all user program evolutions for a specific user",
    operationId: "findByUserIdUserProgramEvolutions"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 12345
  })
  @ApiParam({
    name: "eventType",
    required: true,
    description: "Event type",
    example: ProgramItemTypeEnum.activity,
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user program evolutions for the specified user.",
    type: PaginatedDetailsUserProgramEvolutionEventDto,
  })
  async findByType(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("eventType", new ParseEnumPipe(ProgramItemTypeEnum)) eventType: ProgramItemTypeEnum,
    @Query() pagination: PaginationOptionsDto
  ): Promise<PaginatedDetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.findByType(userId, eventType, pagination);
  }

  @Get("user/:userId/item/:itemId/type/:eventType")
  @ApiOperation({
    summary: "Get all user program evolutions on a specific program item",
    operationId: "findByItemIdAndTypeUserProgramEvolutions"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 12345
  })
  @ApiParam({
    name: "itemId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Item id",
    example: 12345
  })
  @ApiParam({
    name: "eventType",
    required: true,
    description: "Event type",
    example: ProgramItemTypeEnum.activity,
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user program evolutions for the specified user.",
    type: PaginatedDetailsUserProgramEvolutionEventDto,
  })
  async findByItemIdAndType(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("itemId", ParseIntPipe) itemId: number,
    @Param("eventType", new ParseEnumPipe(ProgramItemTypeEnum)) eventType: ProgramItemTypeEnum,
    @Query() pagination: PaginationOptionsDto
  ): Promise<PaginatedDetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.findByItemIdAndType(userId, itemId, eventType, pagination);
  }


  @Get("user/:userId/type/:eventType/status/:eventStatus")
  @ApiOperation({
    summary: "Get all user program evolutions for a specific user",
    operationId: "findByUserIdUserProgramEvolutions"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 12345
  })
  @ApiParam({
    name: "eventType",
    required: true,
    description: "Event type",
    example: ProgramItemTypeEnum.activity,
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
  })
  @ApiParam({
    name: "eventStatus",
    required: true,
    description: "Event status",
    example: ProgramEvolutionEventTypeEnum.started,
    enum: ProgramEvolutionEventTypeEnum,
    enumName: "ProgramEvolutionEventTypeEnum",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user program evolutions for the specified user.",
    type: PaginatedDetailsUserProgramEvolutionEventDto,
  })
  async findByTypeAndStatus(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("eventType", new ParseEnumPipe(ProgramItemTypeEnum)) eventType: ProgramItemTypeEnum,
    @Param("eventStatus", new ParseEnumPipe(ProgramEvolutionEventTypeEnum)) eventStatus: ProgramEvolutionEventTypeEnum,
    @Query() pagination: PaginationOptionsDto
  ): Promise<PaginatedDetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.findByTypeAndStatus(userId, eventType, eventStatus, pagination);
  }

  @Get("user/:userId/status/:eventStatus")
  @ApiOperation({
    summary: "Get all user program evolutions for a specific user",
    operationId: "findByUserIdUserProgramEvolutions"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 12345
  })
  @ApiParam({
    name: "eventStatus",
    required: true,
    description: "Event status",
    example: ProgramEvolutionEventTypeEnum.started,
    enum: ProgramEvolutionEventTypeEnum,
    enumName: "ProgramEvolutionEventTypeEnum",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user program evolutions for the specified user.",
    type: PaginatedDetailsUserProgramEvolutionEventDto,
  })
  async findByStatus(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("eventStatus", new ParseEnumPipe(ProgramEvolutionEventTypeEnum)) eventStatus: ProgramEvolutionEventTypeEnum,
    @Query() pagination: PaginationOptionsDto
  ): Promise<PaginatedDetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.findByStatus(userId, eventStatus, pagination);
  }


  @Get(":id")
  @ApiOperation({
    summary: "Get a user program evolution by id",
    operationId: "findOneUserProgramEvolution"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User program evolution id",
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the user program evolution.",
    type: DetailsUserProgramEvolutionEventDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a user program evolution",
    operationId: "updateUserProgramEvolution"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User program evolution id",
    example: 1
  })
  @ApiBody({
    required: true,
    type: UpdateUserProgramEvolutionDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The user program evolution has been successfully updated.",
    type: DetailsUserProgramEvolutionEventDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserProgramEvolutionDto: UpdateUserProgramEvolutionDto
  ): Promise<DetailsUserProgramEvolutionEventDto> {
    return await this.userProgramEvolutionService.update(id, updateUserProgramEvolutionDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a user program evolution",
    operationId: "removeUserProgramEvolution"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User program evolution id",
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The user program evolution has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.userProgramEvolutionService.remove(id);
  }
}
