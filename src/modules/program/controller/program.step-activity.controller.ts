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

import { ProgramStepActivityService } from "../service";
import {
  CreateProgramStepActivityDto,
  UpdateProgramStepActivityDto,
  PaginatedDetailsProgramStepActivityDto,
  DetailsProgramStepActivityDto
} from "../dto";

@ApiTags("Programs")
@ApiBearerAuth()
@Controller("programs/activities")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepActivityController {
  constructor(private readonly programStepActivityService: ProgramStepActivityService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program step activity",
    operationId: "createProgramStepActivity"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program step activity has been successfully created.",
    type: DetailsProgramStepActivityDto,
  })
  create(@Body() createProgramStepActivityDto: CreateProgramStepActivityDto): Promise<DetailsProgramStepActivityDto> {
    return this.programStepActivityService.create(createProgramStepActivityDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program step activities with pagination",
    operationId: "findAllProgramStepActivities"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all program step activities with pagination.",
    type: PaginatedDetailsProgramStepActivityDto,
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsProgramStepActivityDto> {
    return this.programStepActivityService.findAll(options);
  }

  @Get("search")
  @ApiOperation({
    summary: "Search program step activities by name",
    operationId: "searchProgramStepActivities"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return program step activities matching the search query.",
    type: PaginatedDetailsProgramStepActivityDto,
  })
  search(
    @Query("query") query: string,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsProgramStepActivityDto> {
    return this.programStepActivityService.search(query, options);
  }

  @Get("program-step/:programStepId")
  @ApiOperation({
    summary: "Get all program step activities for a specific program step",
    operationId: "findByProgramStepId"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all program step activities for the specified program step.",
    type: PaginatedDetailsProgramStepActivityDto,
  })
  findByProgramStepId(
    @Param("programStepId", ParseIntPipe) programStepId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsProgramStepActivityDto> {
    return this.programStepActivityService.findByStepId(programStepId, options);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program step activity by id",
    operationId: "findOneProgramStepActivity"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the program step activity.",
    type: DetailsProgramStepActivityDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsProgramStepActivityDto> {
    return this.programStepActivityService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program step activity",
    operationId: "updateProgramStepActivity"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program step activity has been successfully updated.",
    type: DetailsProgramStepActivityDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProgramStepActivityDto: UpdateProgramStepActivityDto
  ): Promise<DetailsProgramStepActivityDto> {
    return this.programStepActivityService.update(id, updateProgramStepActivityDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program step activity",
    operationId: "deleteProgramStepActivity"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program step activity has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.programStepActivityService.remove(id);
  }
}
