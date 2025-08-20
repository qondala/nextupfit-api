import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { ProgramChallengeInterestService } from "../service";

import {
  CreateProgramChallengeInterestDto,
  UpdateProgramChallengeInterestDto,
  DetailsProgramChallengeInterestDto,
  PaginatedDetailsProgramChallengeInterestDto,
  ProgramFindCriteriaChallengeInterestDto,
  PaginatedDetailsProgramStepActivityWorkingsessionPracticeDto,
} from "../dto";
import { PaginationOptionsDto } from "@app/common/dto";

@ApiTags("Program module endpoints")
@Controller("program/challenge/interest")
export class ProgramChallengeInterestController {
  constructor(private readonly service: ProgramChallengeInterestService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program challenge interest",
    operationId: "createProgramChallengeInterest",
  })
  @ApiBody({
    type: CreateProgramChallengeInterestDto,
    description: "Program challenge interest data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Program challenge interest created successfully",
    type: DetailsProgramChallengeInterestDto,
  })
  async create(
    @Body() createDto: CreateProgramChallengeInterestDto,
  ): Promise<DetailsProgramChallengeInterestDto> {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program challenge interests",
    operationId: "getAllProgramChallengeInterests",
  })
  @ApiQuery({
    type: ProgramFindCriteriaChallengeInterestDto,
    description: "Program challenge interests find criteria",
    required: true,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: "Pagination options",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Program challenge interests retrieved successfully",
    type: PaginatedDetailsProgramChallengeInterestDto,
  })
  async findAll(
    @Query() criteria: ProgramFindCriteriaChallengeInterestDto,
    @Query() pagination?: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramChallengeInterestDto> {
    return this.service.findAll(criteria, pagination);
  }

  @Get("/user/:userId")
  @ApiOperation({
    summary: "Get program challenge interests by user ID",
    operationId: "getProgramChallengeInterestsByUserId",
  })
  @ApiParam({
    name: "userId",
    type: SwaggerType.INTEGER,
    description: "User ID",
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: true,
    description: "Pagination"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Program challenge interests retrieved successfully",
    type: PaginatedDetailsProgramStepActivityWorkingsessionPracticeDto,
  })
  async getChallengesByUserInterests(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramStepActivityWorkingsessionPracticeDto> {
    return await this.service.getChallengesByUserInterests(userId, pagination);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get program challenge interest by ID",
    operationId: "getProgramChallengeInterestById",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program challenge interest ID",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Program challenge interest retrieved successfully",
    type: DetailsProgramChallengeInterestDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Program challenge interest not found",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramChallengeInterestDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update program challenge interest",
    operationId: "updateProgramChallengeInterest",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program challenge interest ID",
  })
  @ApiBody({
    type: UpdateProgramChallengeInterestDto,
    description: "Program challenge interest update data",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Program challenge interest updated successfully",
    type: DetailsProgramChallengeInterestDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramChallengeInterestDto,
  ): Promise<DetailsProgramChallengeInterestDto> {
    return this.service.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete program challenge interest",
    operationId: "deleteProgramChallengeInterest",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program challenge interest ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Program challenge interest deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
