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

import { ProgramManagerService, ProgramStepService, ProgramPerSociologyService } from "../service";

import {
  CreateProgramStepDto,
  UpdateProgramStepDto,
  PaginatedDetailsProgramStepDto,
  DetailsProgramStepDto
} from "../dto";
import { ProgramItemTypeEnum } from "../types";

@ApiTags("Programs")
@ApiBearerAuth()
@Controller("program/step")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepController {
  constructor(
    private readonly programStepService: ProgramStepService,
    private readonly programManagerService: ProgramManagerService,
    private readonly programPerSociologyService: ProgramPerSociologyService,
  ) {}

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
  async create(@Body() createProgramStepDto: CreateProgramStepDto): Promise<DetailsProgramStepDto> {
    const record = await this.programStepService.create(createProgramStepDto);

    const details: DetailsProgramStepDto = {
      ...record,
      managers: await this.programManagerService.fetchProgramItemManagers(record.id, ProgramItemTypeEnum.step),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(record.id, ProgramItemTypeEnum.step),
    };

    return details;
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
  async findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsProgramStepDto> {
    const result = await this.programStepService.findAll(options);

    const details: DetailsProgramStepDto[] = await Promise.all(result.items.map(async (programStep) => ({
      ...programStep,
      managers: await this.programManagerService.fetchProgramItemManagers(programStep.id, ProgramItemTypeEnum.step),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(programStep.id, ProgramItemTypeEnum.step),
    })));

    return {
      ...result,
      items: details
    };  
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
  async search(
    @Query("query") query: string,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsProgramStepDto> {
    const result = await this.programStepService.search(query, options);

    const details: DetailsProgramStepDto[] = await Promise.all(result.items.map(async (programStep) => ({
      ...programStep,
      managers: await this.programManagerService.fetchProgramItemManagers(programStep.id, ProgramItemTypeEnum.step),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(programStep.id, ProgramItemTypeEnum.step),
    })));

    return {
      ...result,
      items: details
    };
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
  async findByProgramId(
    @Param("programId", ParseIntPipe) programId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsProgramStepDto> {
    const result = await this.programStepService.findByProgramId(programId, options);

    const details: DetailsProgramStepDto[] = await Promise.all(result.items.map(async (programStep) => ({
      ...programStep,
      managers: await this.programManagerService.fetchProgramItemManagers(programStep.id, ProgramItemTypeEnum.step),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(programStep.id, ProgramItemTypeEnum.step),
    })));

    return {
      ...result,
      items: details
    };
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
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsProgramStepDto> {
    const result = await this.programStepService.findOne(id);

    const details: DetailsProgramStepDto = {
      ...result,
      managers: await this.programManagerService.fetchProgramItemManagers(result.id, ProgramItemTypeEnum.step),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(result.id, ProgramItemTypeEnum.step),
    };

    return details;
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
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProgramStepDto: UpdateProgramStepDto
  ): Promise<DetailsProgramStepDto> {
    const result = await this.programStepService.update(id, updateProgramStepDto);

    const details: DetailsProgramStepDto = {
      ...result,
      managers: await this.programManagerService.fetchProgramItemManagers(result.id, ProgramItemTypeEnum.step),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(result.id, ProgramItemTypeEnum.step),
    };

    return details;
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
