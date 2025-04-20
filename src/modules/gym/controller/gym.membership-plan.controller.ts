import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymMembershipPlanDto, UpdateGymMembershipPlanDto } from '../dto';
import { GymMembershipPlanService } from '../service';
import { GymMembershipPlanEntity } from '../entity';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/membership-plan')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymMembershipPlanController {
  constructor(private readonly gymMembershipPlanService: GymMembershipPlanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym membership plan' })
  @ApiResponse({ status: 201, description: 'Gym membership plan created successfully.' })
  create(
    @Body() createDto: CreateGymMembershipPlanDto,
    @User('id') userId: number
  ) {
    return this.gymMembershipPlanService.create(createDto, userId);
  }

  @Get('gym/:gymId')
  @ApiOperation({ summary: 'Get all membership plans of a gym' })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymMembershipPlanEntity>> {
    return this.gymMembershipPlanService.findByGym(+gymId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym membership plan by id' })
  findOne(@Param('id') id: string) {
    return this.gymMembershipPlanService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym membership plan' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymMembershipPlanDto,
    @User('id') userId: number
  ) {
    return this.gymMembershipPlanService.update(+id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym membership plan' })
  remove(@Param('id') id: string, @User('id') userId: number) {
    return this.gymMembershipPlanService.remove(+id, userId);
  }
}
