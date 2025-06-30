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
  ProgramStepActivityWorkingsessionWorkoutService,
  ProgramPerSociologyService
} from "../service";

import {
  CreateProgramStepActivityWorkingsessionWorkoutDto,
  UpdateProgramStepActivityWorkingsessionWorkoutDto,
  DetailsProgramStepActivityWorkingsessionWorkoutDto,
  PaginatedDetailsProgramStepActivityWorkingsessionWorkoutDto
} from "../dto";
import { ProgramItemTypeEnum } from "../types";


@ApiTags("Programs")
@ApiBearerAuth()
@Controller("programs/step-activity-workingsession-workouts")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepActivityWorkingsessionWorkoutController {
  constructor(
    private readonly programStepActivityWorkingsessionWorkoutService: ProgramStepActivityWorkingsessionWorkoutService,
    private readonly programManagerService: ProgramManagerService,
    private readonly programPerSociologyService: ProgramPerSociologyService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program step activity workingsession workout",
    operationId: "createProgramStepActivityWorkingsessionWorkout"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program step activity workingsession workout has been successfully created.",
    type: DetailsProgramStepActivityWorkingsessionWorkoutDto,
  })
  async create(@Body() createProgramStepActivityWorkingsessionWorkoutDto: CreateProgramStepActivityWorkingsessionWorkoutDto): Promise<DetailsProgramStepActivityWorkingsessionWorkoutDto> {
    const record = await this.programStepActivityWorkingsessionWorkoutService.create(createProgramStepActivityWorkingsessionWorkoutDto);

    const details: DetailsProgramStepActivityWorkingsessionWorkoutDto = {
      ...record,
      managers: await this.programManagerService.fetchProgramItemManagers(record.id, ProgramItemTypeEnum.workout),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(record.id, ProgramItemTypeEnum.workout),
    };

    return details;
  }

  @Get()
  @ApiOperation({
    summary: "Get all program step activity workingsession workouts with pagination",
    operationId: "findAllProgramStepActivityWorkingsessionWorkouts"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program step activity workingsession workouts.",
    type: PaginatedDetailsProgramStepActivityWorkingsessionWorkoutDto,
  })
  async findAll(@Query() paginationOptions: PaginationOptionsDto): Promise<PaginatedDetailsProgramStepActivityWorkingsessionWorkoutDto> {
    const result = await this.programStepActivityWorkingsessionWorkoutService.findAll(paginationOptions);

    const details: DetailsProgramStepActivityWorkingsessionWorkoutDto[] = await Promise.all(result.items.map(async (programStepActivityWorkingsessionWorkout) => ({
      ...programStepActivityWorkingsessionWorkout,
      managers: await this.programManagerService.fetchProgramItemManagers(programStepActivityWorkingsessionWorkout.id, ProgramItemTypeEnum.workout),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(programStepActivityWorkingsessionWorkout.id, ProgramItemTypeEnum.workout),
    })));

    return {
      ...result,
      items: details
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get a program step activity workingsession workout by ID",
    operationId: "findOneProgramStepActivityWorkingsessionWorkout"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program step activity workingsession workout.",
    type: DetailsProgramStepActivityWorkingsessionWorkoutDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsProgramStepActivityWorkingsessionWorkoutDto> {
    const record = await this.programStepActivityWorkingsessionWorkoutService.findOne(id);

    const details: DetailsProgramStepActivityWorkingsessionWorkoutDto = {
      ...record,
      managers: await this.programManagerService.fetchProgramItemManagers(record.id, ProgramItemTypeEnum.workout),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(record.id, ProgramItemTypeEnum.workout),
    };

    return details;
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Update a program step activity workingsession workout",
    operationId: "updateProgramStepActivityWorkingsessionWorkout"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program step activity workingsession workout has been successfully updated.",
    type: DetailsProgramStepActivityWorkingsessionWorkoutDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramStepActivityWorkingsessionWorkoutDto: UpdateProgramStepActivityWorkingsessionWorkoutDto
  ): Promise<DetailsProgramStepActivityWorkingsessionWorkoutDto> {
    const record = await this.programStepActivityWorkingsessionWorkoutService.update(id, updateProgramStepActivityWorkingsessionWorkoutDto);

    const details: DetailsProgramStepActivityWorkingsessionWorkoutDto = {
      ...record,
      managers: await this.programManagerService.fetchProgramItemManagers(record.id, ProgramItemTypeEnum.workout),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(record.id, ProgramItemTypeEnum.workout),
    };

    return details;
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete a program step activity workingsession workout",
    operationId: "removeProgramStepActivityWorkingsessionWorkout"
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The program step activity workingsession workout has been successfully deleted.",
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.programStepActivityWorkingsessionWorkoutService.remove(id);
  }
}
