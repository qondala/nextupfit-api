import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  NotFoundException,
  HttpStatus,
  Query,
  UseGuards,
  ParseIntPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth
} from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import {
  CreateBaseMealFoodDto,
  UpdateBaseMealFoodDto,
  DetailsBaseMealFoodDto,
  PaginatedDetailsBaseMealFoodDto
} from '../dto';

import { BaseMealFoodService } from '../service';
import { SwaggerType } from '@app/common/types';

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/meal-food")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseMealFoodController {
  constructor(private readonly baseMealFoodService: BaseMealFoodService) {}

  @Post()
  @ApiOperation({
    operationId: 'createBaseMealFood',
    summary: 'Create a new meal food'
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The meal food has been successfully created.',
    type: DetailsBaseMealFoodDto 
  })
  async create(@Body() createBaseMealFoodDto: CreateBaseMealFoodDto): Promise<DetailsBaseMealFoodDto> {
    return await this.baseMealFoodService.create(createBaseMealFoodDto);
  }

  @Get()
  @ApiOperation({
    operationId: 'findAllBaseMealFoods',
    summary: 'Get all meal foods with pagination'
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'mealId',
    description: 'Filter by meal ID',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of meal foods',
    type: PaginatedDetailsBaseMealFoodDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('mealId') mealId?: number
  ): Promise<PaginatedDetailsBaseMealFoodDto> {
    return this.baseMealFoodService.findAll({
      page: +page,
      limit: +limit
    }, mealId ? +mealId : undefined);
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getBaseMealFoodById',
    summary: 'Get a specific meal food by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Meal food ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found meal food',
    type: DetailsBaseMealFoodDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Meal food not found'
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsBaseMealFoodDto> {
    const mealFood = await this.baseMealFoodService.findOne(id);
    if (!mealFood) {
      throw new NotFoundException(`Meal food with ID ${id} not found`);
    }
    return mealFood;
  }

  @Put(':id')
  @ApiOperation({
    operationId: 'updateBaseMealFood',
    summary: 'Update a meal food by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Meal food ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated meal food',
    type: DetailsBaseMealFoodDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Meal food not found'
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBaseMealFoodDto: UpdateBaseMealFoodDto,
  ): Promise<DetailsBaseMealFoodDto> {
    const mealFood = await this.baseMealFoodService.update(id, updateBaseMealFoodDto);
    if (!mealFood) {
      throw new NotFoundException(`Meal food with ID ${id} not found`);
    }
    return mealFood;
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'deleteBaseMealFood',
    summary: 'Delete a meal food by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Meal food ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The meal food has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Meal food not found'
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.baseMealFoodService.remove(id);
    if (!result) {
      throw new NotFoundException(`Meal food with ID ${id} not found`);
    }
  }
}
