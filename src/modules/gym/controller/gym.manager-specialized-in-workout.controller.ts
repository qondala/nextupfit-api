import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymManagerSpecializedInWorkoutDto, UpdateGymManagerSpecializedInWorkoutDto } from '../dto';
import { GymManagerSpecializedInWorkoutService } from '../service';
import { GymManagerSpecializedInWorkoutEntity } from '../entity';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager/specialized-workout')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerSpecializedInWorkoutController {
  constructor(private readonly gymManagerSpecializedInWorkoutService: GymManagerSpecializedInWorkoutService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym manager specialized workout' })
  @ApiResponse({ status: 201, description: 'Gym manager specialized workout created successfully.' })
  create(
    @Body() createDto: CreateGymManagerSpecializedInWorkoutDto,
    @User('id') userId: number
  ) {
    return this.gymManagerSpecializedInWorkoutService.create(createDto, userId);
  }

  @Get('manager/:managerId')
  @ApiOperation({ summary: 'Get all specialized workouts of a manager' })
  async findByManager(
    @Param('managerId') managerId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerSpecializedInWorkoutEntity>> {
    return this.gymManagerSpecializedInWorkoutService.findByManager(+managerId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym manager specialized workout by id' })
  findOne(@Param('id') id: string) {
    return this.gymManagerSpecializedInWorkoutService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym manager specialized workout' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymManagerSpecializedInWorkoutDto,
    @User('id') userId: number
  ) {
    return this.gymManagerSpecializedInWorkoutService.update(+id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym manager specialized workout' })
  remove(@Param('id') id: string, @User('id') userId: number) {
    return this.gymManagerSpecializedInWorkoutService.remove(+id, userId);
  }
}
