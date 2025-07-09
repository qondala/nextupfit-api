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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';

import {
  CreateBaseSociologyGroupDto,
  UpdateBaseSociologyGroupDto,
  DetailsBaseSociologyGroupDto,
  PaginatedDetailsBaseSociologyGroupDto,
} from '../dto';
import { SwaggerType } from '@app/common/types';
import { BaseSociologyGroupService } from '../service';
import {
  ErrorResponseException,
  ErrorResponseExceptionType,
  SystemStatusCode,
} from '@app/common/exceptions';

@ApiTags('Base module endpoints')
@ApiBearerAuth()
@Controller('base/sociology-group')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseSociologyGroupController {
  constructor(private readonly service: BaseSociologyGroupService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new sociology group',
    operationId: 'createSociologyGroup'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created sociology group',
    type: DetailsBaseSociologyGroupDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request: Code already exists',
    type: ErrorResponseException,
  })
  async create(@Body() dto: CreateBaseSociologyGroupDto): Promise<DetailsBaseSociologyGroupDto> {
    try {
      return await this.service.create(dto);
    } catch (e) {
      if (e.code === '23505') throw new ErrorResponseException(
        ErrorResponseExceptionType.DATABASE,
        'Code already exists',
        HttpStatus.BAD_REQUEST,
        SystemStatusCode.DUPLICATE
      );
      throw e;
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all sociology groups',
    operationId: 'getAllSociologyGroups'
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list',
    type: PaginatedDetailsBaseSociologyGroupDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedDetailsBaseSociologyGroupDto> {
    return await this.service.findAll({ page: +page, limit: +limit });
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search sociology groups',
    operationId: 'searchSociologyGroups'
  })
  @ApiQuery({
    name: 'q',
    required: true,
    type: SwaggerType.STRING
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated search',
    type: PaginatedDetailsBaseSociologyGroupDto
  })
  async search(
    @Query('q') q: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedDetailsBaseSociologyGroupDto> {
    return await this.service.search(q, { page: +page, limit: +limit });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get sociology group by id',
    operationId: 'getSociologyGroupById'
  })
  @ApiParam({
    name: 'id',
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sociology group found',
    type: DetailsBaseSociologyGroupDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Sociology group not found'
  })
  async findOne(@Param('id') id: string): Promise<DetailsBaseSociologyGroupDto> {
    const entity = await this.service.findOne(+id);
    if (!entity) throw new NotFoundException();
    return entity;
  }


  @Put(':id')
  @ApiOperation({
    summary: 'Update sociology group',
    operationId: 'updateSociologyGroup'
  })
  @ApiParam({
    name: 'id',
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated sociology group',
    type: DetailsBaseSociologyGroupDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Sociology group not found'
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBaseSociologyGroupDto,
  ): Promise<DetailsBaseSociologyGroupDto> {
    const updated = await this.service.update(+id, dto);
    if (!updated) throw new NotFoundException();
    return updated;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete sociology group',
    operationId: 'deleteSociologyGroup'
  })
  @ApiParam({
    name: 'id',
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Sociology group deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Sociology group not found'
  })
  async remove(@Param('id') id: string): Promise<void> {
    const ok = await this.service.remove(+id);
    if (!ok) throw new NotFoundException();
  }
}
