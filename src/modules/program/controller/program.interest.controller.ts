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
  ParseEnumPipe,
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
import { ProgramInterestService } from "../service";

import {
  CreateProgramInterestDto,
  UpdateProgramInterestDto,
  DetailsProgramInterestDto,
  PaginatedDetailsProgramInterestDto,
  ProgramFindCriteriaInterestDto,
  PaginatedDetailsProgramDto,
  ProgramFindOrderInterestEnum,
} from "../dto";
import { PaginationOptionsDto } from "@app/common/dto";

@ApiTags("Program module endpoints")
@Controller("program/interest")
export class ProgramInterestController {
  constructor(private readonly service: ProgramInterestService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program interest",
    operationId: "createProgramInterest",
  })
  @ApiBody({
    type: CreateProgramInterestDto,
    description: "Program interest data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Program interest created successfully",
    type: DetailsProgramInterestDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  async create(
    @Body() createDto: CreateProgramInterestDto,
  ): Promise<DetailsProgramInterestDto> {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program interests",
    operationId: "getAllProgramInterests",
  })
  @ApiQuery({
    type: ProgramFindCriteriaInterestDto,
    description: "Program interests find criteria",
    required: true,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: "Pagination options",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Program interests retrieved successfully",
    type: PaginatedDetailsProgramInterestDto,
  })
  async findAll(
    @Query() criteria: ProgramFindCriteriaInterestDto,
    @Query() pagination?: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramInterestDto> {
    return this.service.findAll(criteria, pagination);
  }

  @Get("/user/:userId")
  @ApiOperation({
    summary: "Get user programs by interests",
    operationId: "getUserProgramsByInterests",
  })
  @ApiParam({
    name: "userId",
    type: SwaggerType.INTEGER,
    description: "User ID",
    required: true,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: "Pagination options",
    required: true,
  })
  @ApiQuery({
    name: "order",
    enum: ProgramFindOrderInterestEnum,
    enumName: "ProgramFindOrderInterestEnum",
    description: "Order by",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User interested programs retrieved successfully",
    type: PaginatedDetailsProgramDto,
  })
  async getUserInterests(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto,
    @Query("order", new ParseEnumPipe(ProgramFindOrderInterestEnum))
    order: ProgramFindOrderInterestEnum,
  ): Promise<PaginatedDetailsProgramDto> {
    return await this.service.getUserInterestedPrograms(
      userId,
      pagination,
      order,
    );
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get program interest by ID",
    operationId: "getProgramInterestById",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program interest ID",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Program interest retrieved successfully",
    type: DetailsProgramInterestDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Program interest not found",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramInterestDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update program interest",
    operationId: "updateProgramInterest",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program interest ID",
  })
  @ApiBody({
    type: UpdateProgramInterestDto,
    description: "Program interest update data",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Program interest updated successfully",
    type: DetailsProgramInterestDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramInterestDto,
  ): Promise<DetailsProgramInterestDto> {
    return this.service.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete program interest",
    operationId: "deleteProgramInterest",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program interest ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Program interest deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
