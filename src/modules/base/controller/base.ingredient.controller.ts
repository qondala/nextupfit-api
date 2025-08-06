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
  CreateBaseIngredientDto,
  UpdateBaseIngredientDto,
  DetailsBaseIngredientDto,
  PaginatedDetailsBaseIngredientDto,
} from "../dto";

import { BaseIngredientService } from "../service";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/ingredient")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseIngredientController {
  constructor(private readonly service: BaseIngredientService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new base ingredient",
    operationId: "createBaseIngredient",
  })
  @ApiBody({
    type: CreateBaseIngredientDto,
    description: "Ingredient data to create",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The ingredient has been successfully created",
    type: DetailsBaseIngredientDto,
  })
  async create(
    @Body() body: CreateBaseIngredientDto,
  ): Promise<DetailsBaseIngredientDto> {
    return await this.service.create(body);
  }

  @Get()
  @ApiOperation({
    summary: "Get all base ingredients with pagination",
    operationId: "findAllBaseIngredients",
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
    description: "List of ingredients retrieved successfully",
    type: PaginatedDetailsBaseIngredientDto,
  })
  async findAll(
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<PaginatedDetailsBaseIngredientDto> {
    return await this.service.findAll(page, limit);
  }

  @Get("by-type/:type")
  @ApiOperation({
    summary: "Get ingredients by type",
    operationId: "findIngredientsByType",
  })
  @ApiParam({
    name: "type",
    type: SwaggerType.STRING,
    description: "Ingredient type",
    example: "ingredient",
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
    description: "List of ingredients for the type retrieved successfully",
    type: PaginatedDetailsBaseIngredientDto,
  })
  async findByType(
    @Param("type") type: string,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<PaginatedDetailsBaseIngredientDto> {
    return await this.service.findByType(type, page, limit);
  }

  @Get("by-brand/:brand")
  @ApiOperation({
    summary: "Get ingredients by brand",
    operationId: "findIngredientsByBrand",
  })
  @ApiParam({
    name: "brand",
    type: SwaggerType.STRING,
    description: "Brand name",
    example: "Green Valley Farms",
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
    description: "List of ingredients for the brand retrieved successfully",
    type: PaginatedDetailsBaseIngredientDto,
  })
  async findByBrand(
    @Param("brand") brand: string,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<PaginatedDetailsBaseIngredientDto> {
    return await this.service.findByBrand(brand, page, limit);
  }

  @Get("search/:name")
  @ApiOperation({
    summary: "Search ingredients by name",
    operationId: "searchIngredientsByName",
  })
  @ApiParam({
    name: "name",
    type: SwaggerType.STRING,
    description: "Ingredient name to search",
    example: "tomato",
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
      "List of ingredients matching the search retrieved successfully",
    type: PaginatedDetailsBaseIngredientDto,
  })
  async searchByName(
    @Param("name") name: string,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<PaginatedDetailsBaseIngredientDto> {
    return await this.service.searchByName(name, page, limit);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a base ingredient by ID",
    operationId: "findOneBaseIngredient",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Ingredient ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The ingredient has been successfully retrieved",
    type: DetailsBaseIngredientDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsBaseIngredientDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a base ingredient",
    operationId: "updateBaseIngredient",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Ingredient ID",
  })
  @ApiBody({
    type: UpdateBaseIngredientDto,
    description: "Ingredient data to update",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The ingredient has been successfully updated",
    type: DetailsBaseIngredientDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateBaseIngredientDto,
  ): Promise<DetailsBaseIngredientDto> {
    return await this.service.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a base ingredient",
    operationId: "removeBaseIngredient",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Ingredient ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The ingredient has been successfully deleted",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
