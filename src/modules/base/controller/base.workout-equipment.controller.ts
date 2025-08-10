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
  ParseBoolPipe,
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
  CreateBaseWorkoutEquipmentDto,
  UpdateBaseWorkoutEquipmentDto,
  DetailsBaseWorkoutEquipmentDto,
  PaginatedDetailsBaseWorkoutEquipmentDto,
} from "../dto";

import { BaseWorkoutEquipmentService } from "../service";
import { SwaggerType } from "@app/common/types";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/workout-equipment")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseWorkoutEquipmentController {
  constructor(private readonly baseWorkoutEquipmentService: BaseWorkoutEquipmentService) {}

  @Post()
  @ApiOperation({
    operationId: "createBaseWorkoutEquipment",
    summary: "Create a new workout equipment association",
  })
  @ApiBody({
    type: CreateBaseWorkoutEquipmentDto,
    description: "Workout equipment data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The workout equipment association has been successfully created.",
    type: DetailsBaseWorkoutEquipmentDto,
  })
  async create(
    @Body() createBaseWorkoutEquipmentDto: CreateBaseWorkoutEquipmentDto,
  ): Promise<DetailsBaseWorkoutEquipmentDto> {
    return await this.baseWorkoutEquipmentService.create(createBaseWorkoutEquipmentDto);
  }

  @Get()
  @ApiOperation({
    operationId: "findAllBaseWorkoutEquipment",
    summary: "Get all workout equipment associations with pagination",
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
    name: "equipmentId",
    description: "Filter by equipment ID",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "mandatory",
    description: "Filter by mandatory status",
    required: false,
    type: SwaggerType.BOOLEAN,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of workout equipment associations",
    type: PaginatedDetailsBaseWorkoutEquipmentDto,
  })
  async findAll(
    @Query("page") page = 1,
    @Query("limit") limit = 10,
    @Query("workoutId") workoutId?: number,
    @Query("equipmentId") equipmentId?: number,
    @Query("mandatory") mandatory?: boolean,
  ): Promise<PaginatedDetailsBaseWorkoutEquipmentDto> {
    return this.baseWorkoutEquipmentService.findAll(
      {
        page: +page,
        limit: +limit,
      },
      workoutId ? +workoutId : undefined,
      equipmentId ? +equipmentId : undefined,
      mandatory,
    );
  }

  @Get(":id")
  @ApiOperation({
    operationId: "getBaseWorkoutEquipmentById",
    summary: "Get a specific workout equipment association by ID",
  })
  @ApiParam({
    name: "id",
    description: "Workout equipment association ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The found workout equipment association",
    type: DetailsBaseWorkoutEquipmentDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsBaseWorkoutEquipmentDto> {
    return await this.baseWorkoutEquipmentService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({
    operationId: "updateBaseWorkoutEquipment",
    summary: "Update a workout equipment association by ID",
  })
  @ApiParam({
    name: "id",
    description: "Workout equipment association ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateBaseWorkoutEquipmentDto,
    description: "Updated workout equipment data",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The updated workout equipment association",
    type: DetailsBaseWorkoutEquipmentDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBaseWorkoutEquipmentDto: UpdateBaseWorkoutEquipmentDto,
  ): Promise<DetailsBaseWorkoutEquipmentDto> {
    return await this.baseWorkoutEquipmentService.update(
      id,
      updateBaseWorkoutEquipmentDto,
    );
  }

  @Delete(":id")
  @ApiOperation({
    operationId: "deleteBaseWorkoutEquipment",
    summary: "Delete a workout equipment association by ID",
  })
  @ApiParam({
    name: "id",
    description: "Workout equipment association ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The workout equipment association has been successfully deleted",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.baseWorkoutEquipmentService.remove(id);
  }
}
