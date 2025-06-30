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

import { ProgramWorkoutNutrientBurnService } from "../service";
import {
    CreateProgramWorkoutNutrientBurnDto,
    UpdateProgramWorkoutNutrientBurnDto,
    DetailsProgramWorkoutNutrientBurnDto,
    PaginatedDetailsProgramWorkoutNutrientBurnDto
} from "../dto";


@ApiTags("Programs")
@ApiBearerAuth()
@Controller("program/workout-nutrient-burn")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramWorkoutNutrientBurnController {
  constructor(private readonly programWorkoutNutrientBurnService: ProgramWorkoutNutrientBurnService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program workout nutrient burn",
    operationId: "createProgramWorkoutNutrientBurn"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program workout nutrient burn has been successfully created.",
    type: DetailsProgramWorkoutNutrientBurnDto,
  })
  create(@Body() createProgramWorkoutNutrientBurnDto: CreateProgramWorkoutNutrientBurnDto): Promise<DetailsProgramWorkoutNutrientBurnDto> {
    return this.programWorkoutNutrientBurnService.create(createProgramWorkoutNutrientBurnDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program workout nutrient burns with pagination",
    operationId: "findAllProgramWorkoutNutrientBurns"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all program workout nutrient burns with pagination.",
    type: PaginatedDetailsProgramWorkoutNutrientBurnDto,
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsProgramWorkoutNutrientBurnDto> {
    return this.programWorkoutNutrientBurnService.findAll(options);
  }

  @Get("program-step-activity/:programStepActivityId")
  @ApiOperation({
    summary: "Get all program workout nutrient burns for a specific program step activity",
    operationId: "findByProgramStepActivityIdProgramWorkoutNutrientBurns"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all program workout nutrient burns for the specified program step activity.",
    type: PaginatedDetailsProgramWorkoutNutrientBurnDto,
  })
  findByProgramStepActivityId(
    @Param("programStepActivityId", ParseIntPipe) programStepActivityId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsProgramWorkoutNutrientBurnDto> {
    return this.programWorkoutNutrientBurnService.findByProgramStepActivityId(programStepActivityId, options);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program workout nutrient burn by id",
    operationId: "findOneProgramWorkoutNutrientBurn"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the program workout nutrient burn.",
    type: DetailsProgramWorkoutNutrientBurnDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsProgramWorkoutNutrientBurnDto> {
    return this.programWorkoutNutrientBurnService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program workout nutrient burn",
    operationId: "updateProgramWorkoutNutrientBurn"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program workout nutrient burn has been successfully updated.",
    type: DetailsProgramWorkoutNutrientBurnDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProgramWorkoutNutrientBurnDto: UpdateProgramWorkoutNutrientBurnDto
  ): Promise<DetailsProgramWorkoutNutrientBurnDto> {
    return this.programWorkoutNutrientBurnService.update(id, updateProgramWorkoutNutrientBurnDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program workout nutrient burn",
    operationId: "removeProgramWorkoutNutrientBurn"
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The program workout nutrient burn has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.programWorkoutNutrientBurnService.remove(id);
  }
}
