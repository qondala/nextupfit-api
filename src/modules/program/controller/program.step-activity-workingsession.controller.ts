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
  ProgramStepActivityWorkingsessionService,
  ProgramPerSociologyService
} from "../service";
import {
  CreateProgramStepActivityWorkingsessionDto,
  UpdateProgramStepActivityWorkingsessionDto,
  DetailsProgramStepActivityWorkingsessionDto,
  PaginatedDetailsProgramStepActivityWorkingsessionDto
} from "../dto";
import { ProgramItemTypeEnum } from "../types";

@ApiTags("Programs")
@ApiBearerAuth()
@Controller("programs/step-activity-workingsessions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepActivityWorkingsessionController {
  constructor(
    private readonly programStepActivityWorkingsessionService: ProgramStepActivityWorkingsessionService,
    private readonly programManagerService: ProgramManagerService,
    private readonly programPerSociologyService: ProgramPerSociologyService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program step activity workingsession",
    operationId: "createProgramStepActivityWorkingsession"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program step activity workingsession has been successfully created.",
    type: DetailsProgramStepActivityWorkingsessionDto,
  })
  async create(@Body() createProgramStepActivityWorkingsessionDto: CreateProgramStepActivityWorkingsessionDto): Promise<DetailsProgramStepActivityWorkingsessionDto> {
    const record = await this.programStepActivityWorkingsessionService.create(createProgramStepActivityWorkingsessionDto);

    const details: DetailsProgramStepActivityWorkingsessionDto = {
      ...record,
      managers: await this.programManagerService.fetchProgramItemManagers(record.id, ProgramItemTypeEnum.workingsession),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(record.id, ProgramItemTypeEnum.workingsession),
    };

    return details;
  }

  @Get()
  @ApiOperation({
    summary: "Get all program step activity workingsessions with pagination",
    operationId: "findAllProgramStepActivityWorkingsessions"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program step activity workingsessions.",
    type: PaginatedDetailsProgramStepActivityWorkingsessionDto,
  })
  findAll(@Query() paginationOptions: PaginationOptionsDto): Promise<PaginatedDetailsProgramStepActivityWorkingsessionDto> {
    return this.programStepActivityWorkingsessionService.findAll(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get a program step activity workingsession by ID",
    operationId: "findOneProgramStepActivityWorkingsession"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program step activity workingsession.",
    type: DetailsProgramStepActivityWorkingsessionDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsProgramStepActivityWorkingsessionDto> {
    const record = await this.programStepActivityWorkingsessionService.findOne(id);

    const details: DetailsProgramStepActivityWorkingsessionDto = {
      ...record,
      managers: await this.programManagerService.fetchProgramItemManagers(record.id, ProgramItemTypeEnum.workingsession),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(record.id, ProgramItemTypeEnum.workingsession),
    };

    return details;
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Update a program step activity workingsession",
    operationId: "updateProgramStepActivityWorkingsession"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program step activity workingsession has been successfully updated.",
    type: DetailsProgramStepActivityWorkingsessionDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramStepActivityWorkingsessionDto: UpdateProgramStepActivityWorkingsessionDto
  ): Promise<DetailsProgramStepActivityWorkingsessionDto> {
    const record = await this.programStepActivityWorkingsessionService.update(id, updateProgramStepActivityWorkingsessionDto);

    const details: DetailsProgramStepActivityWorkingsessionDto = {
      ...record,
      managers: await this.programManagerService.fetchProgramItemManagers(record.id, ProgramItemTypeEnum.workingsession),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(record.id, ProgramItemTypeEnum.workingsession),
    };

    return details;
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete a program step activity workingsession",
    operationId: "removeProgramStepActivityWorkingsession"
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The program step activity workingsession has been successfully deleted.",
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.programStepActivityWorkingsessionService.remove(id);
  }
}
