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
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateProgramStepActivityWorkingsessionPracticeDto,
  UpdateProgramStepActivityWorkingsessionPracticeDto,
  DetailsProgramStepActivityWorkingsessionPracticeDto,
  PaginatedDetailsProgramStepActivityWorkingsessionPracticeDto,
  ProgramFindCriteriaPracticeDto,
} from "../dto";
import { ProgramStepActivityWorkingsessionPracticeService } from "../service";

@ApiTags("Program module endpoints")
@ApiBearerAuth()
@Controller("program/step/activity/workingsession/practice")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepActivityWorkingsessionPracticeController {
  constructor(
    private readonly service: ProgramStepActivityWorkingsessionPracticeService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program step activity workingsession practice",
    operationId: "createProgramStepActivityWorkingsessionPractice",
  })
  @ApiBody({
    type: CreateProgramStepActivityWorkingsessionPracticeDto,
    description: "Practice data to create",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The practice has been successfully created",
    type: DetailsProgramStepActivityWorkingsessionPracticeDto,
  })
  async create(
    @Body() body: CreateProgramStepActivityWorkingsessionPracticeDto,
  ): Promise<DetailsProgramStepActivityWorkingsessionPracticeDto> {
    return await this.service.create(body);
  }

  @Get()
  @ApiOperation({
    summary:
      "Get all program step activity workingsession practices with pagination",
    operationId: "findAllProgramStepActivityWorkingsessionPractices",
  })
  @ApiQuery({
    type: ProgramFindCriteriaPracticeDto,
    description: "Criteria to filter practices",
    required: false,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: "Pagination options",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of practices retrieved successfully",
    type: PaginatedDetailsProgramStepActivityWorkingsessionPracticeDto,
  })
  async findAll(
    @Query() criteria: ProgramFindCriteriaPracticeDto,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramStepActivityWorkingsessionPracticeDto> {
    return await this.service.findAll(criteria, pagination);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program step activity workingsession practice by ID",
    operationId: "findOneProgramStepActivityWorkingsessionPractice",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Practice ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The practice has been successfully retrieved",
    type: DetailsProgramStepActivityWorkingsessionPracticeDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramStepActivityWorkingsessionPracticeDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program step activity workingsession practice",
    operationId: "updateProgramStepActivityWorkingsessionPractice",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Practice ID",
  })
  @ApiBody({
    type: UpdateProgramStepActivityWorkingsessionPracticeDto,
    description: "Practice data to update",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The practice has been successfully updated",
    type: DetailsProgramStepActivityWorkingsessionPracticeDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramStepActivityWorkingsessionPracticeDto,
  ): Promise<DetailsProgramStepActivityWorkingsessionPracticeDto> {
    return await this.service.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program step activity workingsession practice",
    operationId: "removeProgramStepActivityWorkingsessionPractice",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Practice ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The practice has been successfully deleted",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
