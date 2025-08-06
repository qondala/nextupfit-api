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
  UseGuards,
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

import {
  CreateBaseIngredientNutrientDto,
  UpdateBaseIngredientNutrientDto,
  DetailsBaseIngredientNutrientDto,
  PaginatedDetailsBaseIngredientNutrientDto,
} from "../dto";

import { BaseIngredientNutrientService } from "../service";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/ingredient/nutrient")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseIngredientNutrientController {
  constructor(private readonly service: BaseIngredientNutrientService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new base ingredient nutrient",
    operationId: "createBaseIngredientNutrient",
  })
  @ApiBody({
    type: CreateBaseIngredientNutrientDto,
    description: "Ingredient nutrient data to create",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The ingredient nutrient has been successfully created",
    type: DetailsBaseIngredientNutrientDto,
  })
  async create(
    @Body() body: CreateBaseIngredientNutrientDto,
  ): Promise<DetailsBaseIngredientNutrientDto> {
    return await this.service.create(body);
  }

  @Get()
  @ApiOperation({
    summary: "Get all base ingredient nutrients with pagination",
    operationId: "findAllBaseIngredientNutrients",
  })
  @ApiQuery({
    name: "page",
    type: SwaggerType.INTEGER,
    description: "Page number",
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of ingredient nutrients retrieved successfully",
    type: PaginatedDetailsBaseIngredientNutrientDto,
  })
  async findAll(
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<PaginatedDetailsBaseIngredientNutrientDto> {
    return await this.service.findAll(page, limit);
  }

  @Get("by-ingredient/:ingredientId")
  @ApiOperation({
    summary: "Get ingredient nutrients by ingredient ID",
    operationId: "findIngredientNutrientsByIngredientId",
  })
  @ApiParam({
    name: "ingredientId",
    type: SwaggerType.INTEGER,
    description: "Ingredient ID",
    example: 1,
  })
  @ApiQuery({
    name: "page",
    type: SwaggerType.INTEGER,
    description: "Page number",
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "List of ingredient nutrients for the ingredient retrieved successfully",
    type: PaginatedDetailsBaseIngredientNutrientDto,
  })
  async findByIngredientId(
    @Param("ingredientId", ParseIntPipe) ingredientId: number,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<PaginatedDetailsBaseIngredientNutrientDto> {
    return await this.service.findByIngredientId(ingredientId, page, limit);
  }

  @Get("by-nutrient/:nutrientId")
  @ApiOperation({
    summary: "Get ingredient nutrients by nutrient ID",
    operationId: "findIngredientNutrientsByNutrientId",
  })
  @ApiParam({
    name: "nutrientId",
    type: SwaggerType.INTEGER,
    description: "Nutrient ID",
    example: 1,
  })
  @ApiQuery({
    name: "page",
    type: SwaggerType.INTEGER,
    description: "Page number",
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "List of ingredient nutrients for the nutrient retrieved successfully",
    type: PaginatedDetailsBaseIngredientNutrientDto,
  })
  async findByNutrientId(
    @Param("nutrientId", ParseIntPipe) nutrientId: number,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<PaginatedDetailsBaseIngredientNutrientDto> {
    return await this.service.findByNutrientId(nutrientId, page, limit);
  }

  @Get("by-user/:userId")
  @ApiOperation({
    summary: "Get ingredient nutrients by created user ID",
    operationId: "findIngredientNutrientsByUserId",
  })
  @ApiParam({
    name: "userId",
    type: SwaggerType.INTEGER,
    description: "User ID",
    example: 1368464,
  })
  @ApiQuery({
    name: "page",
    type: SwaggerType.INTEGER,
    description: "Page number",
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "List of ingredient nutrients for the user retrieved successfully",
    type: PaginatedDetailsBaseIngredientNutrientDto,
  })
  async findByCreatedByUserId(
    @Param("userId", ParseIntPipe) userId: number,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<PaginatedDetailsBaseIngredientNutrientDto> {
    return await this.service.findByCreatedByUserId(userId, page, limit);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a base ingredient nutrient by ID",
    operationId: "findOneBaseIngredientNutrient",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Ingredient nutrient ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The ingredient nutrient has been successfully retrieved",
    type: DetailsBaseIngredientNutrientDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsBaseIngredientNutrientDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a base ingredient nutrient",
    operationId: "updateBaseIngredientNutrient",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Ingredient nutrient ID",
  })
  @ApiBody({
    type: UpdateBaseIngredientNutrientDto,
    description: "Ingredient nutrient data to update",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The ingredient nutrient has been successfully updated",
    type: DetailsBaseIngredientNutrientDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateBaseIngredientNutrientDto,
  ): Promise<DetailsBaseIngredientNutrientDto> {
    return await this.service.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a base ingredient nutrient",
    operationId: "removeBaseIngredientNutrient",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Ingredient nutrient ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The ingredient nutrient has been successfully deleted",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
