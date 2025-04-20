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
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { ProgramWorkoutNutrientBurnService } from "../service";
import { ProgramWorkoutNutrientBurnEntity } from "../entity";
import { CreateProgramWorkoutNutrientBurnDto, UpdateProgramWorkoutNutrientBurnDto } from "../dto";


@ApiTags("Programs")
@ApiBearerAuth()
@Controller("program/workout-nutrient-burn")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramWorkoutNutrientBurnController {
  constructor(private readonly programWorkoutNutrientBurnService: ProgramWorkoutNutrientBurnService) {}

  @Post()
  @ApiOperation({ summary: "Create a new program workout nutrient burn" })
  @ApiResponse({
    status: 201,
    description: "The program workout nutrient burn has been successfully created.",
    type: ProgramWorkoutNutrientBurnEntity,
  })
  create(@Body() createProgramWorkoutNutrientBurnDto: CreateProgramWorkoutNutrientBurnDto): Promise<ProgramWorkoutNutrientBurnEntity> {
    return this.programWorkoutNutrientBurnService.create(createProgramWorkoutNutrientBurnDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all program workout nutrient burns with pagination" })
  @ApiResponse({
    status: 200,
    description: "Return all program workout nutrient burns with pagination.",
    type: [ProgramWorkoutNutrientBurnEntity],
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<[ProgramWorkoutNutrientBurnEntity[], number]> {
    return this.programWorkoutNutrientBurnService.findAll(options);
  }

  @Get("program-step-activity/:programStepActivityId")
  @ApiOperation({ summary: "Get all program workout nutrient burns for a specific program step activity" })
  @ApiResponse({
    status: 200,
    description: "Return all program workout nutrient burns for the specified program step activity.",
    type: [ProgramWorkoutNutrientBurnEntity],
  })
  findByProgramStepActivityId(
    @Param("programStepActivityId", ParseIntPipe) programStepActivityId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<[ProgramWorkoutNutrientBurnEntity[], number]> {
    return this.programWorkoutNutrientBurnService.findByProgramStepActivityId(programStepActivityId, options);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a program workout nutrient burn by id" })
  @ApiResponse({
    status: 200,
    description: "Return the program workout nutrient burn.",
    type: ProgramWorkoutNutrientBurnEntity,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<ProgramWorkoutNutrientBurnEntity> {
    return this.programWorkoutNutrientBurnService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a program workout nutrient burn" })
  @ApiResponse({
    status: 200,
    description: "The program workout nutrient burn has been successfully updated.",
    type: ProgramWorkoutNutrientBurnEntity,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProgramWorkoutNutrientBurnDto: UpdateProgramWorkoutNutrientBurnDto
  ): Promise<ProgramWorkoutNutrientBurnEntity> {
    return this.programWorkoutNutrientBurnService.update(id, updateProgramWorkoutNutrientBurnDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a program workout nutrient burn" })
  @ApiResponse({
    status: 200,
    description: "The program workout nutrient burn has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.programWorkoutNutrientBurnService.remove(id);
  }
}
