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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { ProgramStepService } from "../service";
import { ProgramStepEntity } from "../entity";
import {
  CreateProgramStepDto,
  UpdateProgramStepDto,
  PaginatedDetailsProgramStepDto,
  DetailsProgramStepDto
} from "../dto";

@ApiTags("Programs")
@ApiBearerAuth()
@Controller("program/step")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepController {
  constructor(private readonly programStepService: ProgramStepService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program step",
    operationId: "createProgramStep"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program step has been successfully created.",
    type: DetailsProgramStepDto,
  })
  create(@Body() createProgramStepDto: CreateProgramStepDto): Promise<DetailsProgramStepDto> {
    return this.programStepService.create(createProgramStepDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program steps with pagination",
    operationId: "findAllProgramSteps"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all program steps with pagination.",
    type: PaginatedDetailsProgramStepDto,
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsProgramStepDto> {
    return this.programStepService.findAll(options);
  }

  @Get("search")
  @ApiOperation({
    summary: "Search program steps by name",
    operationId: "searchProgramSteps"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return program steps matching the search query.",
    type: PaginatedDetailsProgramStepDto,
  })
  search(
    @Query("query") query: string,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsProgramStepDto> {
    return this.programStepService.search(query, options);
  }

  @Get("program/:programId")
  @ApiOperation({
    summary: "Get all program steps for a specific program",
    operationId: "findByProgramIdProgramSteps"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all program steps for the specified program.",
    type: PaginatedDetailsProgramStepDto,
  })
  findByProgramId(
    @Param("programId", ParseIntPipe) programId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsProgramStepDto> {
    return this.programStepService.findByProgramId(programId, options);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program step by id",
    operationId: "findOneProgramStep"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the program step.",
    type: DetailsProgramStepDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsProgramStepDto> {
    return this.programStepService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program step",
    operationId: "updateProgramStep"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program step has been successfully updated.",
    type: DetailsProgramStepDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProgramStepDto: UpdateProgramStepDto
  ): Promise<ProgramStepEntity> {
    return this.programStepService.update(id, updateProgramStepDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program step",
    operationId: "removeProgramStep"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program step has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.programStepService.remove(id);
  }
}
