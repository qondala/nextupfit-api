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
  ParseEnumPipe,
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
  CreateProgramFreetoolInterestDto,
  UpdateProgramFreetoolInterestDto,
  DetailsProgramFreetoolInterestDto,
  PaginatedDetailsProgramFreetoolInterestDto,
  ProgramFindCriteriaFreetoolInterestDto,
  ProgramFindOrderFreetoolEnum,
  PaginatedDetailsProgramFreetoolDto,
} from "../dto";
import { ProgramFreetoolInterestService } from "../service";

@ApiTags("Program module endpoints")
@ApiBearerAuth()
@Controller("program/freetool/interest")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramFreetoolInterestController {
  constructor(private readonly service: ProgramFreetoolInterestService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program freetool interest",
    operationId: "createProgramFreetoolInterest",
  })
  @ApiBody({
    type: CreateProgramFreetoolInterestDto,
    description: "Program freetool interest data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Program interest created successfully",
    type: DetailsProgramFreetoolInterestDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  async create(
    @Body() createDto: CreateProgramFreetoolInterestDto,
  ): Promise<DetailsProgramFreetoolInterestDto> {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program freetool interests",
    operationId: "getAllProgramFreetoolInterests",
  })
  @ApiQuery({
    type: ProgramFindCriteriaFreetoolInterestDto,
    description: "Program freetool interests find criteria",
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
    type: PaginatedDetailsProgramFreetoolInterestDto,
  })
  async findAll(
    @Query() criteria: ProgramFindCriteriaFreetoolInterestDto,
    @Query() pagination?: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramFreetoolInterestDto> {
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
    enum: ProgramFindOrderFreetoolEnum,
    enumName: "ProgramFindOrderFreetoolEnum",
    description: "Order by",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User interested freetools retrieved successfully",
    type: PaginatedDetailsProgramFreetoolDto,
  })
  async getUserInterestedFreetools(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto,
    @Query("order", new ParseEnumPipe(ProgramFindOrderFreetoolEnum))
    order: ProgramFindOrderFreetoolEnum,
  ): Promise<PaginatedDetailsProgramFreetoolDto> {
    return await this.service.getFreetoolsByUserInterests(
      userId,
      pagination,
      order,
    );
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get program freetool interest by ID",
    operationId: "getProgramFreetoolInterestById",
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
    type: DetailsProgramFreetoolInterestDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Program interest not found",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramFreetoolInterestDto> {
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
    type: UpdateProgramFreetoolInterestDto,
    description: "Program interest update data",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Program interest updated successfully",
    type: DetailsProgramFreetoolInterestDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramFreetoolInterestDto,
  ): Promise<DetailsProgramFreetoolInterestDto> {
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
