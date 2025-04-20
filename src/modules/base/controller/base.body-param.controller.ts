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

import { BaseBodyParamService } from '../service';
import { BaseBodyParamEntity } from '../entity';
import { CreateBaseBodyParamDto, UpdateBaseBodyParamDto } from '../dto';


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/body-param")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseBodyParamController {
  constructor(private readonly baseBodyParamService: BaseBodyParamService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new body parameter' })
  @ApiResponse({ 
    status: 201, 
    description: 'The body parameter has been successfully created.',
    type: BaseBodyParamEntity 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseBodyParamDto: CreateBaseBodyParamDto): Promise<BaseBodyParamEntity> {
    return this.baseBodyParamService.create(createBaseBodyParamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all body parameters with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of body parameters',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseBodyParamEntity>> {
    return this.baseBodyParamService.findAll({
      page: +page,
      limit: +limit
    });
  }

  @Get('search')
  @ApiOperation({ summary: 'Search body parameters by query string with pagination' })
  @ApiQuery({ name: 'q', description: 'Search query string', required: true })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated search results of body parameters',
    type: PaginatedResponseDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseBodyParamEntity>> {
    return this.baseBodyParamService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific body parameter by ID' })
  @ApiParam({ name: 'id', description: 'Body parameter ID' })
  @ApiResponse({
    status: 200,
    description: 'The found body parameter',
    type: BaseBodyParamEntity
  })
  @ApiResponse({ status: 404, description: 'Body parameter not found' })
  async findOne(@Param('id') id: string): Promise<BaseBodyParamEntity> {
    const param = await this.baseBodyParamService.findOne(+id);
    if (!param) {
      throw new NotFoundException(`Body parameter with ID ${id} not found`);
    }
    return param;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a body parameter by ID' })
  @ApiParam({ name: 'id', description: 'Body parameter ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated body parameter',
    type: BaseBodyParamEntity
  })
  @ApiResponse({ status: 404, description: 'Body parameter not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseBodyParamDto: UpdateBaseBodyParamDto,
  ): Promise<BaseBodyParamEntity> {
    const param = await this.baseBodyParamService.update(+id, updateBaseBodyParamDto);
    if (!param) {
      throw new NotFoundException(`Body parameter with ID ${id} not found`);
    }
    return param;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a body parameter by ID' })
  @ApiParam({ name: 'id', description: 'Body parameter ID' })
  @ApiResponse({ status: 204, description: 'The body parameter has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Body parameter not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseBodyParamService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Body parameter with ID ${id} not found`);
    }
  }

  @Get('unit/:unitId')
  @ApiOperation({ summary: 'Get body parameters by unit ID' })
  @ApiParam({ name: 'unitId', description: 'Unit ID' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of body parameters for the specified unit',
    type: PaginatedResponseDto
  })
  async findByUnitId(
    @Param('unitId') unitId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseBodyParamEntity>> {
    return this.baseBodyParamService.findByUnitId(+unitId, {
      page: +page,
      limit: +limit
    });
  }
}
