import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';


import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import {
  CreateGymManagerQualificationDto,
  UpdateGymManagerQualificationDto,
  DetailsGymManagerQualificationDto,
  PaginatedDetailsGymManagerQualificationDto
} from '../dto';
import { GymManagerQualificationService } from '../service';


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
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym manager qualification created successfully.',
    type: DetailsGymManagerQualificationDto
  })
  create(
    @Body() createDto: CreateGymManagerQualificationDto,
  ) {
    return this.gymManagerQualificationService.create(createDto);
  }

  @Get('manager/:managerId')
  @ApiOperation({
    summary: 'Get all qualifications of a manager',
    description: 'Get all qualifications of a manager',
    operationId: 'getGymManagerQualificationByManagerId',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of manager qualifications',
    type: PaginatedDetailsGymManagerQualificationDto
  })
  async findByManager(
    @Param('managerId') managerId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerQualificationDto> {
    return this.gymManagerQualificationService.findByManager(+managerId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym manager qualification by id',
    description: 'Get gym manager qualification by id',
    operationId: 'getGymManagerQualificationById',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager qualification details',
    type: DetailsGymManagerQualificationDto
  })
  async findOne(@Param('id') id: string): Promise<DetailsGymManagerQualificationDto> {
    return this.gymManagerQualificationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym manager qualification',
    description: 'Update gym manager qualification',
    operationId: 'updateGymManagerQualification',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated gym manager qualification details',
    type: DetailsGymManagerQualificationDto
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymManagerQualificationDto,
  ) {
    return await this.gymManagerQualificationService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym manager qualification',
    description: 'Delete gym manager qualification',
    operationId: 'deleteGymManagerQualification',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym manager qualification deleted successfully',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.gymManagerQualificationService.remove(+id);
  }
}
