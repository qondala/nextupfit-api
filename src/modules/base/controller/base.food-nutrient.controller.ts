import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";

import { BaseFoodNutrientService } from "../service";

import {
  CreateBaseFoodNutrientDto,
  UpdateBaseFoodNutrientDto,
  DetailsBaseFoodNutrientDto,
  PaginatedDetailsBaseFoodNutrientDto,
} from "../dto";
import {
  ErrorResponseException
} from "@app/common/exceptions";


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/food-nutrient")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseFoodNutrientController {
  constructor(
    private readonly service: BaseFoodNutrientService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new food nutrient record",
    description: "Create a new food nutrient record",
    operationId: "createFoodNutrient",
  })
  @ApiCreatedResponse({
    description: "The food nutrient record has been successfully created.",
    type: DetailsBaseFoodNutrientDto,
  })
  @ApiBadRequestResponse({
    description: "Duplicate code or invalid input.",
    type: ErrorResponseException,
  })
  async create(
    @Body() createDto: CreateBaseFoodNutrientDto,
  ): Promise<DetailsBaseFoodNutrientDto> {
    return await this.service.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all food nutrient records with pagination",
    description: "Get all food nutrient records with pagination",
    operationId: "findAllFoodNutrients",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Items per page",
  })
  @ApiOkResponse({
    description: "Paginated list of food nutrients",
    type: PaginatedDetailsBaseFoodNutrientDto,
  })
  async findAll(
    @Query("page") page = 1,
    @Query("limit") limit = 10,
  ): Promise<PaginatedDetailsBaseFoodNutrientDto> {
    return this.service.findAll({ page: +page, limit: +limit });
  }

  @Get("food/:foodId")
  @ApiOperation({
    summary: "Filter by food ID",
    description: "Filter records by food ID",
    operationId: "findByFoodId",
  })
  @ApiParam({
    type: SwaggerType.INTEGER,
    name: "foodId",
    description: "Food ID",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiOkResponse({
    description: "Paginated list",
    type: PaginatedDetailsBaseFoodNutrientDto,
  })
  async findByFoodId(
    @Param("foodId", ParseIntPipe) foodId: number,
    @Query("page") page = 1,
    @Query("limit") limit = 10,
  ): Promise<PaginatedDetailsBaseFoodNutrientDto> {
    return this.service.findByFoodId(foodId, {
      page: +page,
      limit: +limit,
    });
  }

  @Get("nutrient/:nutrientId")
  @ApiOperation({
    summary: "Filter by nutrient ID",
    description: "Filter records by nutrient ID",
    operationId: "findByNutrientId",
  })
  @ApiParam({
    type: SwaggerType.INTEGER,
    name: "nutrientId",
    description: "Nutrient ID",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiOkResponse({
    description: "Paginated list",
    type: PaginatedDetailsBaseFoodNutrientDto,
  })
  async findByNutrientId(
    @Param("nutrientId", ParseIntPipe) nutrientId: number,
    @Query("page") page = 1,
    @Query("limit") limit = 10,
  ): Promise<PaginatedDetailsBaseFoodNutrientDto> {
    return this.service.findByNutrientId(nutrientId, {
      page: +page,
      limit: +limit,
    });
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get by ID",
    description: "Get a food nutrient by ID",
    operationId: "findFoodNutrientById",
  })
  @ApiParam({
    type: SwaggerType.INTEGER,
    name: "id",
    description: "Record ID",
  })
  @ApiOkResponse({
    description: "Found record",
    type: DetailsBaseFoodNutrientDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsBaseFoodNutrientDto> {
    return this.service.findOne(id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update by ID",
    description: "Update a food nutrient record",
    operationId: "updateFoodNutrientById",
  })
  @ApiParam({
    type: SwaggerType.INTEGER,
    name: "id",
    description: "Record ID",
  })
  @ApiOkResponse({
    description: "Updated record",
    type: DetailsBaseFoodNutrientDto,
  })
  async update(
    @Param("id") id: string,
    @Body() updateDto: UpdateBaseFoodNutrientDto,
  ): Promise<DetailsBaseFoodNutrientDto> {
    return await this.service.update(+id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete by ID",
    description: "Delete a food nutrient record",
    operationId: "deleteFoodNutrientById",
  })
  @ApiParam({
    type: SwaggerType.INTEGER,
    name: "id",
    description: "Record ID",
  })
  @ApiNoContentResponse({
    description: "Successfully deleted",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
