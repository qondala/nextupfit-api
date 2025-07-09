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
  Query,
  ParseIntPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse
} from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';

import {
  DetailsBaseAppUpdateDto,
  PaginatedDetailsBaseAppUpdateDto
} from '../dto';

import { BaseAppUpdateService } from '../service';
import {
  CreateBaseAppUpdateDto,
  UpdateBaseAppUpdateDto
} from '../dto';
import { SwaggerType } from '@app/common/types';


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/app-update")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseAppUpdateController {
  constructor(private readonly baseAppUpdateService: BaseAppUpdateService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new app update',
    description: 'Create a new app update',
    operationId: 'createAppUpdate'
  })
  @ApiCreatedResponse({ 
    description: 'The app update has been successfully created.',
    type: DetailsBaseAppUpdateDto 
  })
  async create(@Body() createBaseAppUpdateDto: CreateBaseAppUpdateDto): Promise<DetailsBaseAppUpdateDto> {
    return this.baseAppUpdateService.create(createBaseAppUpdateDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all app updates with pagination',
    description: 'Get all app updates with pagination',
    operationId: 'findAllAppUpdates'
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
  @ApiOkResponse({
    description: 'Paginated list of app updates',
    type: PaginatedDetailsBaseAppUpdateDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseAppUpdateDto> {
    return this.baseAppUpdateService.findAll({
      page: +page,
      limit: +limit
    });
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search app updates by query string with pagination',
    description: 'Search app updates by query string with pagination',
    operationId: 'searchAppUpdates'
  })
  @ApiQuery({
    name: 'q',
    description: 'Search query string',
    required: true
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
  @ApiOkResponse({
    description: 'Paginated search results of app updates',
    type: PaginatedDetailsBaseAppUpdateDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseAppUpdateDto> {
    return this.baseAppUpdateService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific app update by ID',
    description: 'Get a specific app update by ID',
    operationId: 'findAppUpdateById'
  })
  @ApiParam({
    type: SwaggerType.INTEGER,
    name: 'id',
    required: true,
    description: 'App update ID'
  })
  @ApiOkResponse({
    description: 'The found app update',
    type: DetailsBaseAppUpdateDto
  })
  @ApiNotFoundResponse({
    description: 'App update not found'
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsBaseAppUpdateDto> {
    const update = await this.baseAppUpdateService.findOne(id);
    if (!update) {
      throw new NotFoundException(`App update with ID ${id} not found`);
    }
    return update;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an app update by ID',
    description: 'Update an app update by ID',
    operationId: 'updateAppUpdateById'
  })
  @ApiParam({
    type: SwaggerType.INTEGER,
    name: 'id',
    required: true,
    description: 'App update ID'
  })
  @ApiOkResponse({
    description: 'The updated app update',
    type: DetailsBaseAppUpdateDto
  })
  @ApiNotFoundResponse({
    description: 'App update not found'
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBaseAppUpdateDto: UpdateBaseAppUpdateDto,
  ): Promise<DetailsBaseAppUpdateDto> {
    const update = await this.baseAppUpdateService.update(id, updateBaseAppUpdateDto);
    if (!update) {
      throw new NotFoundException(`App update with ID ${id} not found`);
    }
    return update;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an app update by ID',
    description: 'Delete an app update by ID',
    operationId: 'deleteAppUpdateById'
  })
  @ApiParam({
    type: SwaggerType.INTEGER,
    name: 'id',
    required: true,
    description: 'App update ID'
  })
  @ApiNoContentResponse({
    description: 'The app update has been successfully deleted'
  })
  @ApiNotFoundResponse({
    description: 'App update not found'
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.baseAppUpdateService.remove(id);
    if (!result) {
      throw new NotFoundException(`App update with ID ${id} not found`);
    }
  }

  @Get('version/:version')
  @ApiOperation({
    summary: 'Get app update by version number',
    description: 'Get app update by version number',
    operationId: 'findByVersion'
  })
  @ApiParam({
    type: SwaggerType.STRING,
    name: 'version',
    required: true,
    description: 'App update version'
  })
  @ApiOkResponse({
    description: 'The found app update',
    type: DetailsBaseAppUpdateDto
  })
  @ApiNotFoundResponse({
    description: 'App update not found'
  })
  async findByVersion(@Param('version') version: string): Promise<DetailsBaseAppUpdateDto> {
    const update = await this.baseAppUpdateService.findByVersion(version);
    if (!update) {
      throw new NotFoundException(`App update with version ${version} not found`);
    }
    return update;
  }
}
