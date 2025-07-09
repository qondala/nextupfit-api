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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedDetailsBaseBodyParamDto, DetailsBaseBodyParamDto } from '../dto';

import { BaseBodyParamService } from '../service';
import { BaseBodyParamEntity } from '../entity';
import { CreateBaseBodyParamDto, UpdateBaseBodyParamDto } from '../dto';
import { SwaggerType } from '@app/common/types';


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/body-param")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseBodyParamController {
  constructor(private readonly baseBodyParamService: BaseBodyParamService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new body parameter',
    description: 'Create a new body parameter',
    operationId: 'createBodyParam'
  })
  @ApiCreatedResponse({
    description: 'The body parameter has been successfully created.',
    type: BaseBodyParamEntity
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseBodyParamDto: CreateBaseBodyParamDto): Promise<BaseBodyParamEntity> {
    return this.baseBodyParamService.create(createBaseBodyParamDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all body parameters with pagination',
    description: 'Get all body parameters with pagination',
    operationId: 'findAllBodyParams'
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
    description: 'Paginated list of body parameters',
    type: PaginatedDetailsBaseBodyParamDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseBodyParamDto> {
    return this.baseBodyParamService.findAll({
      page: +page,
      limit: +limit
    }) as unknown as PaginatedDetailsBaseBodyParamDto;
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search body parameters by query string with pagination',
    description: 'Search body parameters by query string with pagination',
    operationId: 'searchBodyParams'
  })
  @ApiQuery({
    name: 'q',
    description: 'Search query string',
    required: true,
    type: SwaggerType.STRING
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
    description: 'Paginated search results of body parameters',
    type: PaginatedDetailsBaseBodyParamDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseBodyParamDto> {
    return this.baseBodyParamService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific body parameter by ID',
    description: 'Get a specific body parameter by ID',
    operationId: 'findBodyParamById'
  })
  @ApiParam({
    name: 'id',
    description: 'Body parameter ID',
    type: SwaggerType.INTEGER
  })
  @ApiOkResponse({
    description: 'The found body parameter',
    type: BaseBodyParamEntity
  })
  @ApiNotFoundResponse({
    description: 'Body parameter not found'
  })
  async findOne(@Param('id') id: string): Promise<BaseBodyParamEntity> {
    const param = await this.baseBodyParamService.findOne(+id);
    if (!param) {
      throw new NotFoundException(`Body parameter with ID ${id} not found`);
    }
    return param;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a body parameter by ID',
    description: 'Update a body parameter by ID',
    operationId: 'updateBodyParamById'
  })
  @ApiParam({
    name: 'id',
    description: 'Body parameter ID',
    type: SwaggerType.INTEGER
  })
  @ApiOkResponse({
    description: 'The updated body parameter',
    type: BaseBodyParamEntity
  })
  @ApiNotFoundResponse({
    description: 'Body parameter not found'
  })
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
  @ApiOperation({
    summary: 'Delete a body parameter by ID',
    description: 'Delete a body parameter by ID',
    operationId: 'deleteBodyParamById'
  })
  @ApiParam({
    name: 'id',
    description: 'Body parameter ID',
    type: SwaggerType.INTEGER
  })
  @ApiNoContentResponse({
    description: 'The body parameter has been successfully deleted'
  })
  @ApiNotFoundResponse({
    description: 'Body parameter not found'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseBodyParamService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Body parameter with ID ${id} not found`);
    }
  }

  @Get('unit/:unitId')
  @ApiOperation({
    summary: 'Get body parameters by unit ID',
    description: 'Get body parameters by unit ID',
    operationId: 'findBodyParamsByUnitId'
  })
  @ApiParam({
    name: 'unitId',
    description: 'Unit ID',
    type: SwaggerType.INTEGER
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
    description: 'Paginated list of body parameters for the specified unit',
    type: PaginatedDetailsBaseBodyParamDto
  })
  async findByUnitId(
    @Param('unitId') unitId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseBodyParamDto> {
    return this.baseBodyParamService.findByUnitId(+unitId, {
      page: +page,
      limit: +limit
    });
  }
}
