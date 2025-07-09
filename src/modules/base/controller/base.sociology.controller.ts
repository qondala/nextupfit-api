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
  BadRequestException,
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

import { BaseSociologyService } from '../service';
import {
  CreateBaseSociologyDto,
  UpdateBaseSociologyDto,
} from '../dto';
import {
  DetailsBaseSociologyDto,
  PaginatedDetailsBaseSociologyDto,
} from '../dto';
import { SwaggerType } from '@app/common/types';

@ApiTags('Base module endpoints')
@ApiBearerAuth()
@Controller('base/sociology')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseSociologyController {
  constructor(private readonly baseSociologyService: BaseSociologyService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new sociology',
    description: 'Create a new sociology',
    operationId: 'createSociology',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The sociology has been successfully created.',
    type: DetailsBaseSociologyDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Code already exists or invalid input.',
  })
  async create(
    @Body() createDto: CreateBaseSociologyDto,
  ): Promise<DetailsBaseSociologyDto> {
    try {
      return await this.baseSociologyService.create(createDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Sociology with this code already exists');
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all sociologies with pagination',
    description: 'Get all sociologies with pagination',
    operationId: 'getAllSociologies',
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: 'userId',
    description: 'Filter by creator user ID',
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of sociologies',
    type: PaginatedDetailsBaseSociologyDto,
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number,
  ): Promise<PaginatedDetailsBaseSociologyDto> {
    return await this.baseSociologyService.findAll(
      { page: +page, limit: +limit },
      userId ? +userId : undefined,
    );
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search sociologies by query string with pagination',
    description: 'Search sociologies by query string with pagination',
    operationId: 'searchSociologies',
  })
  @ApiQuery({
    name: 'q',
    description: 'Search query string',
    required: true,
    type: SwaggerType.STRING,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated search results of sociologies',
    type: PaginatedDetailsBaseSociologyDto,
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedDetailsBaseSociologyDto> {
    return await this.baseSociologyService.search(query, { page: +page, limit: +limit }) as unknown as PaginatedDetailsBaseSociologyDto;
  }

  @Get('code/:code')
  @ApiOperation({
    summary: 'Get sociology by code',
    description: 'Get sociology by code',
    operationId: 'getSociologyByCode',
  })
  @ApiParam({
    name: 'code',
    description: 'Sociology code',
    required: true,
    type: SwaggerType.STRING,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found sociology',
    type: DetailsBaseSociologyDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sociology not found' })
  async findByCode(@Param('code') code: string): Promise<DetailsBaseSociologyDto> {
    const soc = await this.baseSociologyService.findByCode(code);
    if (!soc) {
      throw new NotFoundException(`Sociology with code '${code}' not found`);
    }
    return soc;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific sociology by ID',
    description: 'Get a specific sociology by ID',
    operationId: 'getSociologyById',
  })
  @ApiParam({
    name: 'id',
    description: 'Sociology ID',
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found sociology',
    type: DetailsBaseSociologyDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sociology not found' })
  async findOne(@Param('id') id: string): Promise<DetailsBaseSociologyDto> {
    const soc = await this.baseSociologyService.findOne(+id);
    if (!soc) {
      throw new NotFoundException(`Sociology with ID ${id} not found`);
    }
    return soc;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a sociology by ID',
    description: 'Update a sociology by ID',
    operationId: 'updateSociologyById',
  })
  @ApiParam({
    name: 'id',
    description: 'Sociology ID',
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated sociology',
    type: DetailsBaseSociologyDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sociology not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Code already exists or invalid input.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateBaseSociologyDto,
  ): Promise<DetailsBaseSociologyDto> {
    try {
      const soc = await this.baseSociologyService.update(+id, updateDto);
      if (!soc) {
        throw new NotFoundException(`Sociology with ID ${id} not found`);
      }
      return soc;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Sociology with this code already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a sociology by ID',
    description: 'Delete a sociology by ID',
    operationId: 'deleteSociologyById',
  })
  @ApiParam({
    name: 'id',
    description: 'Sociology ID',
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Sociology deleted successfully.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    const success = await this.baseSociologyService.remove(+id);
    if (!success) {
      throw new NotFoundException(`Sociology with ID ${id} not found`);
    }
  }
}
