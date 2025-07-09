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
  NotFoundException,
  BadRequestException,
  UseGuards,
  ParseIntPipe
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";

import { SwaggerType } from "@app/common/types";
import { BaseNutritionService } from "../service";
import {
  CreateBaseNutritionDto,
  UpdateBaseNutritionDto,
  PaginatedDetailsBaseNutritionDto,
  DetailsBaseNutritionDto
} from "../dto";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/nutrition")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseNutritionController {
  constructor(private readonly nutritionService: BaseNutritionService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new nutrition",
    operationId: "createBaseNutrition"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsBaseNutritionDto,
    description: "Nutrition created successfully"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Nutrition with this code already exists"
  })
  async create(@Body() dto: CreateBaseNutritionDto): Promise<DetailsBaseNutritionDto> {
    try {
      return await this.nutritionService.create(dto);
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestException("Nutrition with this code already exists");
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({
    summary: "Get all nutritions",
    operationId: "findAllBaseNutritions"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsBaseNutritionDto,
    description: "Nutritions found successfully"
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER
  })
  async findAll(
    @Query("page") page = 1,
    @Query("limit") limit = 10
  ): Promise<PaginatedDetailsBaseNutritionDto> {
    return this.nutritionService.findAll({ page: +page, limit: +limit });
  }

  @Get("search")
  @ApiOperation({
    summary: "Search nutritions",
    operationId: "searchBaseNutritions"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsBaseNutritionDto,
    description: "Nutritions found successfully"
  })
  @ApiQuery({
    name: "q",
    required: true,
    type: SwaggerType.STRING
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER
  })
  async search(
    @Query("q") q: string,
    @Query("page") page = 1,
    @Query("limit") limit = 10
  ): Promise<PaginatedDetailsBaseNutritionDto> {
    return this.nutritionService.search(q, { page: +page, limit: +limit });
  }

  @Get("code/:code")
  @ApiOperation({
    summary: "Get nutrition by code",
    operationId: "findByCodeBaseNutrition"
  })
  @ApiParam({
    name: "code",
    required: true,
    type: SwaggerType.STRING
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsBaseNutritionDto,
    description: "Nutrition found successfully"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Nutrition not found"
  })
  async findByCode(@Param("code") code: string): Promise<DetailsBaseNutritionDto> {
    const item = await this.nutritionService.findByCode(code);
    if (!item) throw new NotFoundException(`Nutrition with code '${code}' not found`);
    return item;
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get nutrition by id",
    operationId: "findOneBaseNutrition"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsBaseNutritionDto,
    description: "Nutrition found successfully"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Nutrition not found"
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsBaseNutritionDto> {
    const item = await this.nutritionService.findOne(id);
    if (!item) throw new NotFoundException(`Nutrition with id ${id} not found`);
    return item;
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update nutrition",
    operationId: "updateBaseNutrition"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsBaseNutritionDto,
    description: "Nutrition updated successfully"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Nutrition not found"
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateBaseNutritionDto
  ): Promise<DetailsBaseNutritionDto> {
    try {
      const item = await this.nutritionService.update(id, dto);
      if (!item) throw new NotFoundException(`Nutrition with id ${id} not found`);
      return item;
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestException("Nutrition with this code already exists");
      }
      throw error;
    }
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete nutrition",
    operationId: "removeBaseNutrition"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Nutrition deleted successfully"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Nutrition not found"
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.nutritionService.remove(id);
    if (!deleted) throw new NotFoundException(`Nutrition with id ${id} not found`);
  }
}
