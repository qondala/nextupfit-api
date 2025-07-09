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
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import {
  JwtAuthGuard,
  RolesGuard,
} from "@app/common/guards";

import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateProgramManagerDto,
  UpdateProgramManagerDto,
  DetailsProgramManagerDto,
  PaginatedDetailsProgramManagerDto,
  ProgramFindCriteriaManagerDto
} from "../dto";

import { ProgramManagerService } from "../service";


@ApiTags("Program module endpoints")
@ApiBearerAuth()
@Controller("program/manager")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramManagerController {
  constructor(private readonly service: ProgramManagerService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program manager",
    operationId: "createProgramManager"
  })
  @ApiBody({
    type: CreateProgramManagerDto,
    required: true,
    description: "Program manager data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program manager has been successfully created.",
    type: DetailsProgramManagerDto,
  })
  create(@Body() body: CreateProgramManagerDto): Promise<DetailsProgramManagerDto> {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program managers with pagination",
    operationId: "findAllProgramManagers"
  })
  @ApiQuery({
    type: ProgramFindCriteriaManagerDto,
    required: false,
    description: "Pagination options",
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
    description: "Pagination options",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program managers.",
    type: PaginatedDetailsProgramManagerDto,
  })
  findAll(
    @Query() criteria: ProgramFindCriteriaManagerDto,
    @Query() pagination: PaginationOptionsDto): Promise<PaginatedDetailsProgramManagerDto> {
    return this.service.findAll(criteria, pagination);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get a program manager by ID",
    operationId: "findOneProgramManager"
  })
  @ApiParam({
    name: "id",
    description: "Program manager id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program manager.",
    type: DetailsProgramManagerDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsProgramManagerDto> {
    return this.service.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({
    summary: "Update a program manager",
    operationId: "updateProgramManager"
  })
  @ApiParam({
    name: "id",
    description: "Program manager id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateProgramManagerDto,
    required: true,
    description: "Program manager data",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program manager has been successfully updated.",
    type: DetailsProgramManagerDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProgramManagerDto
  ): Promise<DetailsProgramManagerDto> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete a program manager",
    operationId: "removeProgramManager"
  })
  @ApiParam({
    name: "id",
    description: "Program manager id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The program manager has been successfully deleted.",
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
