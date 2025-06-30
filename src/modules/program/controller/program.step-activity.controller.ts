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

import {
  ProgramManagerService,
  ProgramStepActivityService,
  ProgramPerSociologyService
} from "../service";
import {
  CreateProgramStepActivityDto,
  UpdateProgramStepActivityDto,
  PaginatedDetailsProgramStepActivityDto,
  DetailsProgramStepActivityDto
} from "../dto";
import { ProgramItemTypeEnum } from "../types";

@ApiTags("Programs")
@ApiBearerAuth()
@Controller("programs/activities")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepActivityController {
  constructor(
    private readonly programStepActivityService: ProgramStepActivityService,
    private readonly programManagerService: ProgramManagerService,
    private readonly programPerSociologyService: ProgramPerSociologyService,
  ) {}

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
  async create(@Body() createProgramStepActivityDto: CreateProgramStepActivityDto): Promise<DetailsProgramStepActivityDto> {
    const record = await this.programStepActivityService.create(createProgramStepActivityDto);

    const details: DetailsProgramStepActivityDto = {
      ...record,
      managers: await this.programManagerService.fetchProgramItemManagers(record.id, ProgramItemTypeEnum.activity),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(record.id, ProgramItemTypeEnum.activity),
    };

    return details;
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
  async findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsProgramStepActivityDto> {
    const result = await this.programStepActivityService.findAll(options);

    const details: DetailsProgramStepActivityDto[] = await Promise.all(result.items.map(async (programStepActivity) => ({
      ...programStepActivity,
      managers: await this.programManagerService.fetchProgramItemManagers(programStepActivity.id, ProgramItemTypeEnum.activity),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(programStepActivity.id, ProgramItemTypeEnum.activity),
    })));

    return {
      ...result,
      items: details
    };
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
  async search(
    @Query("query") query: string,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsProgramStepActivityDto> {
    const result = await this.programStepActivityService.search(query, options);

    const details: DetailsProgramStepActivityDto[] = await Promise.all(result.items.map(async (programStepActivity) => ({
      ...programStepActivity,
      managers: await this.programManagerService.fetchProgramItemManagers(programStepActivity.id, ProgramItemTypeEnum.activity),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(programStepActivity.id, ProgramItemTypeEnum.activity),
    })));

    return {
      ...result,
      items: details
    };
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
  async findByProgramStepId(
    @Param("programStepId", ParseIntPipe) programStepId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsProgramStepActivityDto> {
    const result = await this.programStepActivityService.findByStepId(programStepId, options);

    const details: DetailsProgramStepActivityDto[] = await Promise.all(result.items.map(async (programStepActivity) => ({
      ...programStepActivity,
      managers: await this.programManagerService.fetchProgramItemManagers(programStepActivity.id, ProgramItemTypeEnum.activity),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(programStepActivity.id, ProgramItemTypeEnum.activity),
    })));

    return {
      ...result,
      items: details
    };
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
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsProgramStepActivityDto> {
    const result = await this.programStepActivityService.findOne(id);

    const details: DetailsProgramStepActivityDto = {
      ...result,
      managers: await this.programManagerService.fetchProgramItemManagers(result.id, ProgramItemTypeEnum.activity),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(result.id, ProgramItemTypeEnum.activity),
    };

    return details;
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
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProgramStepActivityDto: UpdateProgramStepActivityDto
  ): Promise<DetailsProgramStepActivityDto> {
    const result = await this.programStepActivityService.update(id, updateProgramStepActivityDto);

    const details: DetailsProgramStepActivityDto = {
      ...result,
      managers: await this.programManagerService.fetchProgramItemManagers(result.id, ProgramItemTypeEnum.activity),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(result.id, ProgramItemTypeEnum.activity),
    };

    return details;
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
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.programStepActivityService.remove(id);
  }
}
