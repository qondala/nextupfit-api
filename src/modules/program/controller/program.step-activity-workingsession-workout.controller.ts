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
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { ProgramItemTypeEnum } from "../types";
import { ProgramStepActivityWorkingsessionWorkoutEntity } from "../entity";
import {
  CreateProgramStepActivityWorkingsessionWorkoutDto,
  UpdateProgramStepActivityWorkingsessionWorkoutDto,
  DetailsProgramStepActivityWorkingsessionWorkoutDto,
  PaginatedDetailsProgramStepActivityWorkingsessionWorkoutDto,
  ProgramFindCriteriaWorkoutDto,
} from "../dto";
import {
  ProgramManagerService,
  ProgramStepActivityWorkingsessionWorkoutService,
  ProgramPerSociologyService,
} from "../service";

@ApiTags("Program module endpoints")
@ApiBearerAuth()
@Controller("program/step/activity/workingsession/workouts")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepActivityWorkingsessionWorkoutController {
  constructor(
    private readonly service: ProgramStepActivityWorkingsessionWorkoutService,
    private readonly programManagerService: ProgramManagerService,
    private readonly programPerSociologyService: ProgramPerSociologyService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program step activity workingsession workout",
    operationId: "createProgramStepActivityWorkingsessionWorkout",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      "The program step activity workingsession workout has been successfully created.",
    type: DetailsProgramStepActivityWorkingsessionWorkoutDto,
  })
  async create(
    @Body() body: CreateProgramStepActivityWorkingsessionWorkoutDto,
  ): Promise<DetailsProgramStepActivityWorkingsessionWorkoutDto> {
    const record = await this.service.create(body);

    return {
      ...record,
      managers: [],
      audience: [],
    };
  }

  @Get()
  @ApiOperation({
    summary:
      "Get all program step activity workingsession workouts with pagination",
    operationId: "findAllProgramStepActivityWorkingsessionWorkouts",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "Successfully retrieved program step activity workingsession workouts.",
    type: PaginatedDetailsProgramStepActivityWorkingsessionWorkoutDto,
  })
  async findAll(
    @Query() criteria: ProgramFindCriteriaWorkoutDto,
    @Query() pagination?: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramStepActivityWorkingsessionWorkoutDto> {
    const result = await this.service.findAll(criteria, pagination);

    const details = await Promise.all(
      result.items.map(
        async (workout) => await this.extractWorkoutDetails(workout),
      ),
    );

    return {
      meta: result.meta,
      items: details,
    };
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program step activity workingsession workout by ID",
    operationId: "findOneProgramStepActivityWorkingsessionWorkout",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "Successfully retrieved program step activity workingsession workout.",
    type: DetailsProgramStepActivityWorkingsessionWorkoutDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramStepActivityWorkingsessionWorkoutDto> {
    const record = await this.service.findOne(id);
    const details = await this.extractWorkoutDetails(record);
    return details;
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program step activity workingsession workout",
    operationId: "updateProgramStepActivityWorkingsessionWorkout",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "The program step activity workingsession workout has been successfully updated.",
    type: DetailsProgramStepActivityWorkingsessionWorkoutDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramStepActivityWorkingsessionWorkoutDto,
  ): Promise<DetailsProgramStepActivityWorkingsessionWorkoutDto> {
    const workout = await this.service.update(id, body);
    const details = await this.extractWorkoutDetails(workout);
    return details;
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program step activity workingsession workout",
    operationId: "removeProgramStepActivityWorkingsessionWorkout",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description:
      "The program step activity workingsession workout has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }

  /**
   * Extracts workout details including managers and audience.
   * @param workout - The workout entity to extract details from.
   * @returns A Promise that resolves to a DetailsProgramStepActivityWorkingsessionWorkoutDto object containing the workout details.
   */
  private async extractWorkoutDetails(
    workout: ProgramStepActivityWorkingsessionWorkoutEntity,
  ): Promise<DetailsProgramStepActivityWorkingsessionWorkoutDto> {
    const programCriteria = {
      itemId: workout.id,
      itemType: ProgramItemTypeEnum.workout,
    };

    const managersFound =
      await this.programManagerService.findAll(programCriteria);
    const audienceFound =
      await this.programPerSociologyService.findAll(programCriteria);

    return {
      ...workout,
      managers: managersFound.items.map(
        (programManager) => programManager.manager,
      ),
      audience: audienceFound.items.map(
        (programPerSociology) => programPerSociology.sociology,
      ),
    };
  }
}
