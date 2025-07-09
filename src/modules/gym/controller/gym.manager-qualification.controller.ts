import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';


import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import {
  CreateGymManagerQualificationDto,
  UpdateGymManagerQualificationDto,
  DetailsGymManagerQualificationDto,
  PaginatedDetailsGymManagerQualificationDto
} from '../dto';
import { GymManagerQualificationService } from '../service';
import { SwaggerType } from '@app/common/types';


@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager/qualification')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerQualificationController {
  constructor(private readonly gymManagerQualificationService: GymManagerQualificationService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym manager qualification',
    description: 'Create a new gym manager qualification',
    operationId: 'createGymManagerQualification',
  })
  @ApiBody({
    required: true,
    type: CreateGymManagerQualificationDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym manager qualification created successfully.',
    type: DetailsGymManagerQualificationDto
  })
  create(
    @Body() createDto: CreateGymManagerQualificationDto,
  ): Promise<DetailsGymManagerQualificationDto> {
    return this.gymManagerQualificationService.create(createDto);
  }

  @Get('manager/:managerId')
  @ApiOperation({
    summary: 'Get all qualifications of a manager',
    description: 'Get all qualifications of a manager',
    operationId: 'getGymManagerQualificationByManagerId',
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER
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
    description: 'Paginated list of manager qualifications',
    type: PaginatedDetailsGymManagerQualificationDto
  })
  async findByManager(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerQualificationDto> {
    return this.gymManagerQualificationService.findByManager(managerId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym manager qualification by id',
    description: 'Get gym manager qualification by id',
    operationId: 'getGymManagerQualificationById',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager qualification details',
    type: DetailsGymManagerQualificationDto
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsGymManagerQualificationDto> {
    return this.gymManagerQualificationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym manager qualification',
    description: 'Update gym manager qualification',
    operationId: 'updateGymManagerQualification',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiBody({
    required: true,
    type: UpdateGymManagerQualificationDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated gym manager qualification details',
    type: DetailsGymManagerQualificationDto
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymManagerQualificationDto,
  ): Promise<DetailsGymManagerQualificationDto> {
    return await this.gymManagerQualificationService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym manager qualification',
    description: 'Delete gym manager qualification',
    operationId: 'deleteGymManagerQualification',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym manager qualification deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gymManagerQualificationService.remove(id);
  }
}
