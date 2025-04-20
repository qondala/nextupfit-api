import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymManagerOverviewDto, UpdateGymManagerOverviewDto } from '../dto';
import { GymManagerOverviewService } from '../service';
import { GymManagerOverviewEntity } from '../entity';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager/overview')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerOverviewController {
  constructor(private readonly gymManagerOverviewService: GymManagerOverviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym manager overview' })
  @ApiResponse({ status: 201, description: 'Gym manager overview created successfully.' })
  create(
    @Body() createDto: CreateGymManagerOverviewDto,
    @User('id') userId: number
  ) {
    return this.gymManagerOverviewService.create(createDto, userId);
  }

  @Get('manager/:managerId')
  @ApiOperation({ summary: 'Get overview by manager id' })
  async findByManager(
    @Param('managerId') managerId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerOverviewEntity>> {
    return this.gymManagerOverviewService.findByManager(+managerId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym manager overview by id' })
  findOne(@Param('id') id: string) {
    return this.gymManagerOverviewService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym manager overview' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymManagerOverviewDto,
    @User('id') userId: number
  ) {
    return this.gymManagerOverviewService.update(+id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym manager overview' })
  remove(@Param('id') id: string, @User('id') userId: number) {
    return this.gymManagerOverviewService.remove(+id, userId);
  }
}
