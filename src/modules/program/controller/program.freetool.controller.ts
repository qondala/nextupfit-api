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

import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateProgramFreetoolDto,
  DetailsProgramFreetoolDto,
  UpdateProgramFreetoolDto,
  PaginatedDetailsProgramFreetoolDto,
  ProgramFindCriteriaFreetoolDto,
} from "../dto";
import { ProgramFreetoolService } from "../service";

@ApiTags("Program module endpoints")
@Controller("program/freetool")
export class ProgramFreetoolController {
  constructor(private readonly service: ProgramFreetoolService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program freetool record",
    operationId: "createProgramFreetool",
  })
  @ApiBody({
    type: CreateProgramFreetoolDto,
    description: "Program freetool data to create",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Program freetool record created successfully",
    type: DetailsProgramFreetoolDto,
  })
  create(
    @Body() body: CreateProgramFreetoolDto,
  ): Promise<DetailsProgramFreetoolDto> {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program freetool records with pagination",
    operationId: "findAllProgramFreetool",
  })
  @ApiQuery({
    type: ProgramFindCriteriaFreetoolDto,
    description: "Program freetool find criteria",
    required: true,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: "Pagination options",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Program freetool records retrieved successfully",
    type: PaginatedDetailsProgramFreetoolDto,
  })
  findAll(
    @Query() criteria: ProgramFindCriteriaFreetoolDto,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramFreetoolDto> {
    return this.service.findAll(criteria, pagination);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program freetool record by ID",
    operationId: "findOneProgramFreetool",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program freetool record ID",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Program freetool record retrieved successfully",
    type: DetailsProgramFreetoolDto,
  })
  findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramFreetoolDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program freetool record by ID",
    operationId: "updateProgramFreetool",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program freetool record ID",
  })
  @ApiBody({
    type: UpdateProgramFreetoolDto,
    description: "Program freetool data to update",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Program freetool record updated successfully",
    type: DetailsProgramFreetoolDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramFreetoolDto,
  ): Promise<DetailsProgramFreetoolDto> {
    return this.service.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program freetool record by ID",
    operationId: "removeProgramFreetool",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program freetool record ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Program freetool record deleted successfully",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
