import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymManagerDto, UpdateGymManagerDto } from '../dto';
import { GymManagerService } from '../service';
import { GymManagerEntity } from '../entity';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerController {
  constructor(private readonly gymManagerService: GymManagerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym manager' })
  @ApiResponse({ status: 201, description: 'Gym manager created successfully.' })
  create(
    @Body() createDto: CreateGymManagerDto,
  ) {
    return this.gymManagerService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({ summary: 'Get all managers of a gym' })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    return this.gymManagerService.findByGym(+gymId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all gyms managed by a user' })
  async findByUser(
    @Param('userId') userId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    return this.gymManagerService.findByUser(+userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym manager by id' })
  findOne(@Param('id') id: string) {
    return this.gymManagerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym manager' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymManagerDto,
    @User('id') userId: number
  ) {
    return this.gymManagerService.update(+id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym manager' })
  remove(@Param('id') id: string, @User('id') userId: number) {
    return this.gymManagerService.remove(+id, userId);
  }
}
