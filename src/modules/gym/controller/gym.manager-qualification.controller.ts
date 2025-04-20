import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';


import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymManagerQualificationDto, UpdateGymManagerQualificationDto } from '../dto';
import { GymManagerQualificationService } from '../service';
import { GymManagerQualificationEntity } from '../entity';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager/qualification')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerQualificationController {
  constructor(private readonly gymManagerQualificationService: GymManagerQualificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym manager qualification' })
  @ApiResponse({ status: 201, description: 'Gym manager qualification created successfully.' })
  create(
    @Body() createDto: CreateGymManagerQualificationDto,
  ) {
    return this.gymManagerQualificationService.create(createDto);
  }

  @Get('manager/:managerId')
  @ApiOperation({ summary: 'Get all qualifications of a manager' })
  async findByManager(
    @Param('managerId') managerId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerQualificationEntity>> {
    return this.gymManagerQualificationService.findByManager(+managerId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym manager qualification by id' })
  findOne(@Param('id') id: string) {
    return this.gymManagerQualificationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym manager qualification' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymManagerQualificationDto,
  ) {
    return this.gymManagerQualificationService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym manager qualification' })
  remove(@Param('id') id: string) {
    return this.gymManagerQualificationService.remove(+id);
  }
}
