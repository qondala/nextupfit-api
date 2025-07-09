import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
  ParseArrayPipe,
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
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateGymManagerSpecializedInNutritionDto,
  UpdateGymManagerSpecializedInNutritionDto,
  DetailsGymManagerSpecializedInNutritionDto,
  PaginatedDetailsGymManagerSpecializedInNutritionDto,
} from "../dto";
import { GymManagerSpecializedInNutritionService } from "../service";
import { SwaggerType } from "@app/common/types";

@ApiTags("Gym module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("gym/manager/specialized-nutrition")
export class GymManagerSpecializedInNutritionController {
  constructor(private readonly service: GymManagerSpecializedInNutritionService) {}

  @Post()
  @ApiOperation({
    summary: "Create manager specialized nutrition",
    operationId: "createGymManagerSpecializedInNutrition",
  })
  @ApiBody({
    required: true,
    type: CreateGymManagerSpecializedInNutritionDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Created manager specialized nutrition",
    type: DetailsGymManagerSpecializedInNutritionDto
  })
  async create(
    @Body() dto: CreateGymManagerSpecializedInNutritionDto,
  ): Promise<DetailsGymManagerSpecializedInNutritionDto> {
    return await this.service.create(dto);
  }

  @Get("manager/:managerId")
  @ApiOperation({
    summary: "List manager nutrition specializations",
    operationId: "listGymManagerSpecializedInNutritionByManagerId",
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of manager nutrition specializations",
    type: PaginatedDetailsGymManagerSpecializedInNutritionDto
  })
  async listByManager(
    @Param("managerId", ParseIntPipe) managerId: number,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymManagerSpecializedInNutritionDto> {
    return await this.service.findByManager(managerId, pagination);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get details of a manager nutrition specialization",
    operationId: "getGymManagerSpecializedInNutrition",
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Details of a manager nutrition specialization",
    type: DetailsGymManagerSpecializedInNutritionDto
  })
  async get(@Param("id", ParseIntPipe) id: number): Promise<DetailsGymManagerSpecializedInNutritionDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update manager nutrition specialization",
    operationId: "updateGymManagerSpecializedInNutrition",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated manager nutrition specialization details",
    type: DetailsGymManagerSpecializedInNutritionDto
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateGymManagerSpecializedInNutritionDto,
  ): Promise<DetailsGymManagerSpecializedInNutritionDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete manager nutrition specialization",
    operationId: "deleteGymManagerSpecializedInNutrition",
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Deleted manager nutrition specialization"
  })
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.service.remove(id);
  }

  @Get("nutritions")
  @ApiOperation({
    summary: "Find managers specialized in nutrition",
    operationId: "findManagersSpecializedInNutrition",
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
  })
  @ApiQuery({
    name: 'nutritionIds',
    required: true,
    type: SwaggerType.INTEGER,
    isArray: true
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Found managers specialized in nutrition",
    type: PaginatedDetailsGymManagerSpecializedInNutritionDto
  })
  async findManagersSpecializedInNutritions(
    @Query('nutritionIds', new ParseArrayPipe({ items: Number })) nutritionIds: number[],
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymManagerSpecializedInNutritionDto> {
    return this.service.findManagersSpecializedInNutritions(nutritionIds, pagination);
  }
}
