import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  Query,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import {
  CreateBaseWorkoutMuscleDto,
  UpdateBaseWorkoutMuscleDto,
  DetailsBaseWorkoutMuscleDto,
  PaginatedDetailsBaseWorkoutMuscleDto,
} from "../dto";

import { BaseWorkoutMuscleService } from "../service";
import { SwaggerType } from "@app/common/types";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/workout-muscle")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseWorkoutMuscleController {
  constructor(private readonly baseWorkoutMuscleService: BaseWorkoutMuscleService) {}

  @Post()
  @ApiOperation({
    operationId: "createBaseWorkoutMuscle",
    summary: "Create a new workout muscle association",
  })
  @ApiBody({
    type: CreateBaseWorkoutMuscleDto,
    description: "Workout muscle data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The workout muscle association has been successfully created.",
    type: DetailsBaseWorkoutMuscleDto,
  })
  async create(
    @Body() createBaseWorkoutMuscleDto: CreateBaseWorkoutMuscleDto,
  ): Promise<DetailsBaseWorkoutMuscleDto> {
    return await this.baseWorkoutMuscleService.create(createBaseWorkoutMuscleDto);
  }

  @Get()
  @ApiOperation({
    operationId: "findAllBaseWorkoutMuscles",
    summary: "Get all workout muscle associations with pagination",
  })
  @ApiQuery({
    name: "page",
    description: "Page number",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "limit",
    description: "Number of items per page",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "workoutId",
    description: "Filter by workout ID",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "muscleId",
    description: "Filter by muscle ID",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of workout muscle associations",
    type: PaginatedDetailsBaseWorkoutMuscleDto,
  })
  async findAll(
    @Query("page") page = 1,
    @Query("limit") limit = 10,
    @Query("workoutId") workoutId?: number,
    @Query("muscleId") muscleId?: number,
  ): Promise<PaginatedDetailsBaseWorkoutMuscleDto> {
    return this.baseWorkoutMuscleService.findAll(
      {
        page: +page,
        limit: +limit,
      },
      workoutId ? +workoutId : undefined,
      muscleId ? +muscleId : undefined,
    );
  }

  @Get(":id")
  @ApiOperation({
    operationId: "getBaseWorkoutMuscleById",
    summary: "Get a specific workout muscle association by ID",
  })
  @ApiParam({
    name: "id",
    description: "Workout muscle association ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The found workout muscle association",
    type: DetailsBaseWorkoutMuscleDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsBaseWorkoutMuscleDto> {
    return await this.baseWorkoutMuscleService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({
    operationId: "updateBaseWorkoutMuscle",
    summary: "Update a workout muscle association by ID",
  })
  @ApiParam({
    name: "id",
    description: "Workout muscle association ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateBaseWorkoutMuscleDto,
    description: "Updated workout muscle data",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The updated workout muscle association",
    type: DetailsBaseWorkoutMuscleDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBaseWorkoutMuscleDto: UpdateBaseWorkoutMuscleDto,
  ): Promise<DetailsBaseWorkoutMuscleDto> {
    return await this.baseWorkoutMuscleService.update(
      id,
      updateBaseWorkoutMuscleDto,
    );
  }



  @Delete(":id")
  @ApiOperation({
    operationId: "deleteBaseWorkoutMuscle",
    summary: "Delete a workout muscle association by ID",
  })
  @ApiParam({
    name: "id",
    description: "Workout muscle association ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The workout muscle association has been successfully deleted",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.baseWorkoutMuscleService.remove(id);
  }
}
