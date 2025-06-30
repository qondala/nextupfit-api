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

import { ProgramStepActivityWorkingsessionWorkoutService } from "../service";

import {
  CreateProgramStepActivityWorkingsessionWorkoutDto,
  UpdateProgramStepActivityWorkingsessionWorkoutDto,
  DetailsProgramStepActivityWorkingsessionWorkoutDto,
  PaginatedDetailsProgramStepActivityWorkingsessionWorkoutDto
} from "../dto";


@ApiTags("Programs")
@ApiBearerAuth()
@Controller("programs/step-activity-workingsession-workouts")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepActivityWorkingsessionWorkoutController {
  constructor(private readonly programStepActivityWorkingsessionWorkoutService: ProgramStepActivityWorkingsessionWorkoutService) {}

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
  create(@Body() createProgramStepActivityWorkingsessionWorkoutDto: CreateProgramStepActivityWorkingsessionWorkoutDto): Promise<DetailsProgramStepActivityWorkingsessionWorkoutDto> {
    return this.programStepActivityWorkingsessionWorkoutService.create(createProgramStepActivityWorkingsessionWorkoutDto);
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
  findAll(@Query() paginationOptions: PaginationOptionsDto): Promise<PaginatedDetailsProgramStepActivityWorkingsessionWorkoutDto> {
    return this.programStepActivityWorkingsessionWorkoutService.findAll(paginationOptions);
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
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsProgramStepActivityWorkingsessionWorkoutDto> {
    return this.programStepActivityWorkingsessionWorkoutService.findOne(id);
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramStepActivityWorkingsessionWorkoutDto: UpdateProgramStepActivityWorkingsessionWorkoutDto
  ): Promise<DetailsProgramStepActivityWorkingsessionWorkoutDto> {
    return this.programStepActivityWorkingsessionWorkoutService.update(id, updateProgramStepActivityWorkingsessionWorkoutDto);
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
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.programStepActivityWorkingsessionWorkoutService.remove(id);
  }
}
