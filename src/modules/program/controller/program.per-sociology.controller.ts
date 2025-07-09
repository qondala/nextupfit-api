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
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";


import { SwaggerType } from "@app/common/types";
import {
  JwtAuthGuard,
  RolesGuard
} from "@app/common/guards";

import { PaginationOptionsDto } from "@app/common/dto";

import { ProgramPerSociologyService } from "../service";
import {
    CreateProgramPerSociologyDto,
    UpdateProgramPerSociologyDto,
    DetailsProgramPerSociologyDto,
    PaginatedDetailsProgramPerSociologyDto,
    ProgramFindCriteriaPerSociologyDto
} from "../dto";


@ApiTags("Program module endpoints")
@ApiBearerAuth()
@Controller("program/per-sociology")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramPerSociologyController {
  constructor(
    private readonly service: ProgramPerSociologyService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program per sociology",
    operationId: "createProgramPerSociology"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program per sociology has been successfully created.",
    type: DetailsProgramPerSociologyDto,
  })
  @ApiBody({
    type: CreateProgramPerSociologyDto,
    required: true,
    description: "Program per sociology data",
  })
  create(@Body() body: CreateProgramPerSociologyDto): Promise<DetailsProgramPerSociologyDto> {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program per sociologies with pagination",
    operationId: "findAllProgramPerSociologies"
  })
  @ApiQuery({
    type: ProgramFindCriteriaPerSociologyDto,
    required: false,
    description: "Program per sociology criteria",
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
    description: "Pagination options",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program per sociologies.",
    type: PaginatedDetailsProgramPerSociologyDto,
  })
  findAll(
    @Query() criteria: ProgramFindCriteriaPerSociologyDto,
    @Query() pagination: PaginationOptionsDto): Promise<PaginatedDetailsProgramPerSociologyDto> {
    return this.service.findAll(criteria, pagination);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get a program per sociology by ID",
    operationId: "findOneProgramPerSociology"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program per sociology.",
    type: DetailsProgramPerSociologyDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsProgramPerSociologyDto> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Update a program per sociology",
    operationId: "updateProgramPerSociology"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program per sociology has been successfully updated.",
    type: DetailsProgramPerSociologyDto,
  })
  @ApiParam({
    name: "id",
    description: "Program per sociology id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateProgramPerSociologyDto,
    required: true,
    description: "Program per sociology data",
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProgramPerSociologyDto
  ): Promise<DetailsProgramPerSociologyDto> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete a program per sociology",
    operationId: "removeProgramPerSociology"
  })
  @ApiParam({
    name: "id",
    description: "Program per sociology id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The program per sociology has been successfully deleted.",
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
