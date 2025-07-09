import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";

import {
  CreateGymSpecializedInNutritionDto,
  UpdateGymSpecializedInNutritionDto,
  PaginatedDetailsGymSpecializedInNutritionDto,
  DetailsGymSpecializedInNutritionDto,
} from "../dto";
import { GymSpecializedInNutritionService } from "../service";

@ApiTags("Gym module endpoints")
@ApiBearerAuth()
@Controller("gym/specialized-nutrition")
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymSpecializedInNutritionController {
  constructor(private readonly service: GymSpecializedInNutritionService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new gym specialized nutrition",
    description: "Create a new gym specialized nutrition",
    operationId: "createGymSpecializedInNutrition",
  })
  @ApiBody({
    required: true,
    type: CreateGymSpecializedInNutritionDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Gym specialized nutrition created successfully.",
    type: DetailsGymSpecializedInNutritionDto,
  })
  async create(@Body() dto: CreateGymSpecializedInNutritionDto): Promise<DetailsGymSpecializedInNutritionDto> {
    return this.service.create(dto);
  }

  @Get("gym/:gymId")
  @ApiOperation({
    summary: "Get all specialized nutritions of a gym",
    description: "Get all specialized nutritions of a gym",
    operationId: "getGymSpecializedInNutrition",
  })
  @ApiParam({
    name: "gymId",
    type: SwaggerType.INTEGER,
    required: true,
    description: "Gym id",
    example: 235,
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Limit number",
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym specialized nutritions found successfully.",
    type: PaginatedDetailsGymSpecializedInNutritionDto,
  })
  async findByGym(
    @Param("gymId", ParseIntPipe) gymId: number,
    @Query("page", ParseIntPipe) page = 1,
    @Query("limit", ParseIntPipe) limit = 10,
  ): Promise<PaginatedDetailsGymSpecializedInNutritionDto> {
    return this.service.findByGym(gymId, { page, limit });
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get gym specialized nutrition by id",
    description: "Get gym specialized nutrition by id",
    operationId: "getGymSpecializedInNutritionById",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
    description: "Gym specialized nutrition id",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym specialized nutrition found successfully.",
    type: DetailsGymSpecializedInNutritionDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsGymSpecializedInNutritionDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update gym specialized nutrition",
    description: "Update gym specialized nutrition",
    operationId: "updateGymSpecializedInNutrition",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
    description: "Gym specialized nutrition id",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym specialized nutrition updated successfully.",
    type: DetailsGymSpecializedInNutritionDto,
  })
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateGymSpecializedInNutritionDto): Promise<DetailsGymSpecializedInNutritionDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete gym specialized nutrition",
    description: "Delete gym specialized nutrition",
    operationId: "deleteGymSpecializedInNutrition",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
    description: "Gym specialized nutrition id",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Gym specialized nutrition deleted successfully.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
