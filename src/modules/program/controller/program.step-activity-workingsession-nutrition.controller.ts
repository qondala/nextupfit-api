import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { UseGuards } from "@nestjs/common";
import {
  CreateProgramStepActivityWorkingsessionNutritionDto,
  UpdateProgramStepActivityWorkingsessionNutritionDto,
  DetailsProgramStepActivityWorkingsessionNutritionDto,
  PaginatedDetailsProgramStepActivityWorkingsessionNutritionDto,
  ProgramFindCriteriaNutritionDto,
} from "../dto";
import { ProgramStepActivityWorkingsessionNutritionService } from "../service";
import { PaginationOptionsDto } from "@app/common/dto";

@ApiTags("Program module endpoints")
@ApiBearerAuth()
@Controller("program/step/activity/workingsession/nutrition")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepActivityWorkingsessionNutritionController {
  constructor(
    private readonly service: ProgramStepActivityWorkingsessionNutritionService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program nutrition",
    operationId: "createProgramNutrition",
  })
  @ApiBody({
    type: CreateProgramStepActivityWorkingsessionNutritionDto,
    description: "Nutrition data to create",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The nutrition has been successfully created",
    type: DetailsProgramStepActivityWorkingsessionNutritionDto,
  })
  create(
    @Body() createDto: CreateProgramStepActivityWorkingsessionNutritionDto,
  ): Promise<DetailsProgramStepActivityWorkingsessionNutritionDto> {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program nutritions with pagination",
    operationId: "findAllProgramNutritions",
  })
  @ApiQuery({
    type: ProgramFindCriteriaNutritionDto,
    description: "Nutrition find criteria",
    required: true,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: "Pagination options",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of nutritions retrieved successfully",
    type: PaginatedDetailsProgramStepActivityWorkingsessionNutritionDto,
  })
  findAll(
    @Query() criteria: ProgramFindCriteriaNutritionDto,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramStepActivityWorkingsessionNutritionDto> {
    return this.service.findAll(criteria, pagination);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program nutrition by ID",
    operationId: "findOneProgramNutrition",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program Nutrition ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program nutrition has been successfully retrieved",
    type: DetailsProgramStepActivityWorkingsessionNutritionDto,
  })
  findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramStepActivityWorkingsessionNutritionDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program nutrition",
    operationId: "updateProgramNutrition",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program Nutrition ID",
  })
  @ApiBody({
    type: UpdateProgramStepActivityWorkingsessionNutritionDto,
    description: "Program nutrition data to update",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program nutrition has been successfully updated",
    type: DetailsProgramStepActivityWorkingsessionNutritionDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateProgramStepActivityWorkingsessionNutritionDto,
  ): Promise<DetailsProgramStepActivityWorkingsessionNutritionDto> {
    return this.service.update(id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program nutrition",
    operationId: "removeProgramNutrition",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program Nutrition ID",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }

  @Patch(":id/increment-views")
  @ApiOperation({
    summary: "Increment views count for a program nutrition",
    operationId: "incrementProgramNutritionViewsCount",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program Nutrition ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Views count incremented successfully",
  })
  incrementViewsCount(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.incrementViewsCount(id);
  }

  @Patch(":id/increment-attendees")
  @ApiOperation({
    summary: "Increment attendees count for a program nutrition",
    operationId: "incrementProgramNutritionAttendeesCount",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Program Nutrition ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Attendees count incremented successfully",
  })
  incrementAttendeesCount(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<void> {
    return this.service.incrementAttendeesCount(id);
  }
}
