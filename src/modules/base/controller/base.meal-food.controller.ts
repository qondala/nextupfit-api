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
  HttpCode,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto } from '@app/common/dto';

import { BaseMealFoodService } from '../service';
import { BaseMealFoodEntity } from '../entity';
import { CreateBaseMealFoodDto, UpdateBaseMealFoodDto } from '../dto';

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/meal-food")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseMealFoodController {
  constructor(private readonly baseMealFoodService: BaseMealFoodService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new meal food' })
  @ApiResponse({ 
    status: 201, 
    description: 'The meal food has been successfully created.',
    type: BaseMealFoodEntity 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseMealFoodDto: CreateBaseMealFoodDto): Promise<BaseMealFoodEntity> {
    return await this.baseMealFoodService.create(createBaseMealFoodDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all meal foods with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiQuery({ name: 'mealId', description: 'Filter by meal ID', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of meal foods',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('mealId') mealId?: number
  ): Promise<PaginatedResponseDto<BaseMealFoodEntity>> {
    return this.baseMealFoodService.findAll({
      page: +page,
      limit: +limit
    }, mealId ? +mealId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific meal food by ID' })
  @ApiParam({ name: 'id', description: 'Meal food ID' })
  @ApiResponse({
    status: 200,
    description: 'The found meal food',
    type: BaseMealFoodEntity
  })
  @ApiResponse({ status: 404, description: 'Meal food not found' })
  async findOne(@Param('id') id: string): Promise<BaseMealFoodEntity> {
    const mealFood = await this.baseMealFoodService.findOne(+id);
    if (!mealFood) {
      throw new NotFoundException(`Meal food with ID ${id} not found`);
    }
    return mealFood;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a meal food by ID' })
  @ApiParam({ name: 'id', description: 'Meal food ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated meal food',
    type: BaseMealFoodEntity
  })
  @ApiResponse({ status: 404, description: 'Meal food not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseMealFoodDto: UpdateBaseMealFoodDto,
  ): Promise<BaseMealFoodEntity> {
    const mealFood = await this.baseMealFoodService.update(+id, updateBaseMealFoodDto);
    if (!mealFood) {
      throw new NotFoundException(`Meal food with ID ${id} not found`);
    }
    return mealFood;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a meal food by ID' })
  @ApiParam({ name: 'id', description: 'Meal food ID' })
  @ApiResponse({ status: 204, description: 'The meal food has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Meal food not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseMealFoodService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Meal food with ID ${id} not found`);
    }
  }
}
