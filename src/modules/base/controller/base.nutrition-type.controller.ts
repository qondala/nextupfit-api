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
  HttpCode,
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

import { BaseNutritionTypeService } from "../service";
import {
  CreateBaseNutritionTypeDto,
  UpdateBaseNutritionTypeDto,
  PaginatedDetailsBaseNutritionTypeDto,
  DetailsBaseNutritionTypeDto
} from "../dto";
import { SwaggerType } from "@app/common/types";


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/nutrition-type")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseNutritionTypeController {
  constructor(private readonly nutritionTypeService: BaseNutritionTypeService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new nutrition type",
    description: "Create a new nutrition type",
    operationId: "createBaseNutritionType"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Nutrition type created successfully",
    type: DetailsBaseNutritionTypeDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Nutrition type with this code already exists"
  })
  async create(@Body() dto: CreateBaseNutritionTypeDto): Promise<DetailsBaseNutritionTypeDto> {
    try {
      return await this.nutritionTypeService.create(dto);
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestException("Nutrition type with this code already exists");
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({
    summary: "Get all nutrition types",
    description: "Get all nutrition types",
    operationId: "findAllBaseNutritionTypes"
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
  ): Promise<PaginatedDetailsBaseNutritionTypeDto> {
    return this.nutritionTypeService.findAll({ page: +page, limit: +limit });
  }

  @Get("search")
  @ApiOperation({
    summary: "Search nutrition types",
    description: "Search nutrition types",
    operationId: "searchBaseNutritionTypes"
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
  ): Promise<PaginatedDetailsBaseNutritionTypeDto> {
    return this.nutritionTypeService.search(q, { page: +page, limit: +limit });
  }

  @Get("code/:code")
  @ApiOperation({
    summary: "Get nutrition type by code",
    description: "Get nutrition type by code",
    operationId: "findByCodeBaseNutritionType"
  })
  @ApiParam({
    name: "code",
    required: true,
    type: SwaggerType.STRING
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Nutrition type found successfully",
    type: DetailsBaseNutritionTypeDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Nutrition type not found"
  })
  async findByCode(@Param("code") code: string): Promise<DetailsBaseNutritionTypeDto> {
    const nt = await this.nutritionTypeService.findByCode(code);
    if (!nt) {
      throw new NotFoundException(`Nutrition type with code '${code}' not found`);
    }
    return nt;
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get nutrition type by id",
    description: "Get nutrition type by id",
    operationId: "findOneBaseNutritionType"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsBaseNutritionTypeDto> {
    const nt = await this.nutritionTypeService.findOne(+id);
    if (!nt) {
      throw new NotFoundException(`Nutrition type with id ${id} not found`);
    }
    return nt;
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update nutrition type",
    description: "Update nutrition type",
    operationId: "updateBaseNutritionType"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Nutrition type updated successfully",
    type: DetailsBaseNutritionTypeDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Nutrition type not found"
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateBaseNutritionTypeDto
  ): Promise<DetailsBaseNutritionTypeDto> {
    try {
      const nt = await this.nutritionTypeService.update(id, dto);
      if (!nt) {
        throw new NotFoundException(`Nutrition type with id ${id} not found`);
      }
      return nt;
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestException("Nutrition type with this code already exists");
      }
      throw error;
    }
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete nutrition type",
    description: "Delete nutrition type",
    operationId: "removeBaseNutritionType"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Nutrition type deleted successfully"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Nutrition type not found"
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.nutritionTypeService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Nutrition type with id ${id} not found`);
    }
  }
}
