import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
  HttpStatus,
  HttpCode,
  UseGuards
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { SwaggerType } from '@app/common/types';

import { BaseFoodNutrientService } from '../service';

import {
  CreateBaseFoodNutrientDto,
  UpdateBaseFoodNutrientDto,
  DetailsBaseFoodNutrientDto,
  PaginatedDetailsBaseFoodNutrientDto
} from '../dto';
import {
  ErrorResponseException,
  ErrorResponseExceptionType,
  SystemStatusCode
} from '@app/common/exceptions';

@ApiTags('Base module endpoints')
@ApiBearerAuth()
@Controller('base/food-nutrient')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseFoodNutrientController {
  constructor(private readonly baseFoodNutrientService: BaseFoodNutrientService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new food nutrient record',
    description: 'Create a new food nutrient record',
    operationId: 'createFoodNutrient'
  })
  @ApiCreatedResponse({
    description: 'The food nutrient record has been successfully created.',
    type: DetailsBaseFoodNutrientDto
  })
  @ApiBadRequestResponse({
    description: 'Duplicate code or invalid input.',
    type: ErrorResponseException
  })
  async create(
    @Body() createDto: CreateBaseFoodNutrientDto
  ): Promise<DetailsBaseFoodNutrientDto> {
    try {
      return await this.baseFoodNutrientService.create(createDto);
    } catch (error: any) {
      if (error.code === '23505') {
        // unique violation
        throw new ErrorResponseException(
          ErrorResponseExceptionType.DATABASE,
          'Food nutrient with this code already exists',
          HttpStatus.BAD_REQUEST,
          SystemStatusCode.DUPLICATE
        );
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all food nutrient records with pagination',
    description: 'Get all food nutrient records with pagination',
    operationId: 'findAllFoodNutrients'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Items per page'
  })
  @ApiOkResponse({
    description: 'Paginated list of food nutrients',
    type: PaginatedDetailsBaseFoodNutrientDto
  })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10): Promise<PaginatedDetailsBaseFoodNutrientDto> {
    return this.baseFoodNutrientService.findAll({ page: +page, limit: +limit });
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search food nutrients by code with pagination',
    description: 'Search food nutrients by code with pagination',
    operationId: 'searchFoodNutrients'
  })
  @ApiQuery({
    name: 'q',
    required: true,
    type: SwaggerType.STRING,
    description: 'Search query string'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Items per page'
  })
  @ApiOkResponse({
    description: 'Paginated search results',
    type: PaginatedDetailsBaseFoodNutrientDto
  })
  async search(
    @Query('q') q: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseFoodNutrientDto> {
    return this.baseFoodNutrientService.search(q, { page: +page, limit: +limit });
  }

  @Get('food/:foodId')
  @ApiOperation({
    summary: 'Filter by food ID',
    description: 'Filter records by food ID',
    operationId: 'findByFoodId'
  })
  @ApiParam({
    name: 'foodId',
    description: 'Food ID'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiOkResponse({ description: 'Paginated list', type: PaginatedDetailsBaseFoodNutrientDto })
  async findByFoodId(
    @Param('foodId') foodId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseFoodNutrientDto> {
    return this.baseFoodNutrientService.findByFoodId(+foodId, { page: +page, limit: +limit });
  }

  @Get('nutrient/:nutrientId')
  @ApiOperation({
    summary: 'Filter by nutrient ID',
    description: 'Filter records by nutrient ID',
    operationId: 'findByNutrientId'
  })
  @ApiParam({
    name: 'nutrientId',
    description: 'Nutrient ID'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiOkResponse({ description: 'Paginated list', type: PaginatedDetailsBaseFoodNutrientDto })
  async findByNutrientId(
    @Param('nutrientId') nutrientId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseFoodNutrientDto> {
    return this.baseFoodNutrientService.findByNutrientId(+nutrientId, { page: +page, limit: +limit });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get by ID',
    description: 'Get a food nutrient by ID',
    operationId: 'findFoodNutrientById'
  })
  @ApiParam({
    name: 'id',
    description: 'Record ID'
  })
  @ApiOkResponse({
    description: 'Found record',
    type: DetailsBaseFoodNutrientDto
  })
  @ApiNotFoundResponse({
    description: 'Record not found'
  })
  async findOne(@Param('id') id: string): Promise<DetailsBaseFoodNutrientDto> {
    const record = await this.baseFoodNutrientService.findOne(+id);
    if (!record) {
      throw new NotFoundException(`Food nutrient with ID ${id} not found`);
    }
    return record;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update by ID',
    description: 'Update a food nutrient record',
    operationId: 'updateFoodNutrientById'
  })
  @ApiParam({
    name: 'id',
    description: 'Record ID'
  })
  @ApiOkResponse({
    description: 'Updated record',
    type: DetailsBaseFoodNutrientDto
  })
  @ApiNotFoundResponse({
    description: 'Record not found'
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateBaseFoodNutrientDto
  ): Promise<DetailsBaseFoodNutrientDto> {
    const record = await this.baseFoodNutrientService.update(+id, updateDto);
    if (!record) {
      throw new NotFoundException(`Food nutrient with ID ${id} not found`);
    }
    return record;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete by ID',
    description: 'Delete a food nutrient record',
    operationId: 'deleteFoodNutrientById'
  })
  @ApiParam({
    name: 'id',
    description: 'Record ID'
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted'
  })
  @ApiNotFoundResponse({
    description: 'Record not found'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const ok = await this.baseFoodNutrientService.remove(+id);
    if (!ok) {
      throw new NotFoundException(`Food nutrient with ID ${id} not found`);
    }
  }
}
