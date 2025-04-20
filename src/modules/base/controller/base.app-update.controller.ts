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
  UseGuards,
  Query
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiQuery, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiNoContentResponse } from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto } from '@app/common/dto';

import { BaseAppUpdateService } from '../service';
import { BaseAppUpdateEntity } from '../entity';
import { CreateBaseAppUpdateDto, UpdateBaseAppUpdateDto } from '../dto';


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/app-update")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseAppUpdateController {
  constructor(private readonly baseAppUpdateService: BaseAppUpdateService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new app update' })
  @ApiCreatedResponse({ 
    description: 'The app update has been successfully created.',
    type: BaseAppUpdateEntity 
  })
  async create(@Body() createBaseAppUpdateDto: CreateBaseAppUpdateDto): Promise<BaseAppUpdateEntity> {
    return this.baseAppUpdateService.create(createBaseAppUpdateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all app updates with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiOkResponse({
    description: 'Paginated list of app updates',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseAppUpdateEntity>> {
    return this.baseAppUpdateService.findAll({
      page: +page,
      limit: +limit
    });
  }

  @Get('search')
  @ApiOperation({ summary: 'Search app updates by query string with pagination' })
  @ApiQuery({ name: 'q', description: 'Search query string', required: true })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiOkResponse({
    description: 'Paginated search results of app updates',
    type: PaginatedResponseDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseAppUpdateEntity>> {
    return this.baseAppUpdateService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific app update by ID' })
  @ApiParam({ name: 'id', description: 'App update ID' })
  @ApiOkResponse({
    description: 'The found app update',
    type: BaseAppUpdateEntity
  })
  @ApiNotFoundResponse({ description: 'App update not found' })
  async findOne(@Param('id') id: string): Promise<BaseAppUpdateEntity> {
    const update = await this.baseAppUpdateService.findOne(+id);
    if (!update) {
      throw new NotFoundException(`App update with ID ${id} not found`);
    }
    return update;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an app update by ID' })
  @ApiParam({ name: 'id', description: 'App update ID' })
  @ApiOkResponse({
    description: 'The updated app update',
    type: BaseAppUpdateEntity
  })
  @ApiNotFoundResponse({ description: 'App update not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseAppUpdateDto: UpdateBaseAppUpdateDto,
  ): Promise<BaseAppUpdateEntity> {
    const update = await this.baseAppUpdateService.update(+id, updateBaseAppUpdateDto);
    if (!update) {
      throw new NotFoundException(`App update with ID ${id} not found`);
    }
    return update;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an app update by ID' })
  @ApiParam({ name: 'id', description: 'App update ID' })
  @ApiNoContentResponse({ description: 'The app update has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'App update not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseAppUpdateService.remove(+id);
    if (!result) {
      throw new NotFoundException(`App update with ID ${id} not found`);
    }
  }

  @Get('version/:version')
  @ApiOperation({ summary: 'Get app update by version number' })
  @ApiParam({ name: 'version', description: 'App update version' })
  @ApiOkResponse({
    description: 'The found app update',
    type: BaseAppUpdateEntity
  })
  @ApiNotFoundResponse({ description: 'App update not found' })
  async findByVersion(@Param('version') version: string): Promise<BaseAppUpdateEntity> {
    const update = await this.baseAppUpdateService.findByVersion(version);
    if (!update) {
      throw new NotFoundException(`App update with version ${version} not found`);
    }
    return update;
  }
}
