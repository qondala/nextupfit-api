import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymSpecializedInWorkoutDto, UpdateGymSpecializedInWorkoutDto } from '../dto';
import { GymSpecializedInWorkoutService } from '../service';
import { GymSpecializedInWorkoutEntity } from '../entity';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/specialized-workout')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymSpecializedInWorkoutController {
  constructor(private readonly gymSpecializedInWorkoutService: GymSpecializedInWorkoutService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym specialized workout' })
  @ApiResponse({ status: 201, description: 'Gym specialized workout created successfully.' })
  create( @Body() createDto: CreateGymSpecializedInWorkoutDto ) {
    return this.gymSpecializedInWorkoutService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({ summary: 'Get all specialized workouts of a gym' })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymSpecializedInWorkoutEntity>> {
    return this.gymSpecializedInWorkoutService.findByGym(+gymId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym specialized workout by id' })
  findOne(@Param('id') id: string) {
    return this.gymSpecializedInWorkoutService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym specialized workout' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymSpecializedInWorkoutDto
  ) {
    return this.gymSpecializedInWorkoutService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym specialized workout' })
  remove(@Param('id') id: string) {
    return this.gymSpecializedInWorkoutService.remove(+id);
  }
}
