import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymMembershipPlanFeaturesDto, UpdateGymMembershipPlanFeaturesDto } from '../dto';
import { GymMembershipPlanFeaturesService } from '../service';
import { GymMembershipPlanFeaturesEntity } from '../entity';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/membership-plan/features')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymMembershipPlanFeaturesController {
  constructor(private readonly gymMembershipPlanFeaturesService: GymMembershipPlanFeaturesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym membership plan feature' })
  @ApiResponse({ status: 201, description: 'Gym membership plan feature created successfully.' })
  create(
    @Body() createDto: CreateGymMembershipPlanFeaturesDto,
    @User('id') userId: number
  ) {
    return this.gymMembershipPlanFeaturesService.create(createDto, userId);
  }

  @Get('plan/:planId')
  @ApiOperation({ summary: 'Get all features of a membership plan' })
  async findByPlan(
    @Param('planId') planId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymMembershipPlanFeaturesEntity>> {
    return this.gymMembershipPlanFeaturesService.findByPlan(+planId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym membership plan feature by id' })
  findOne(@Param('id') id: string) {
    return this.gymMembershipPlanFeaturesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym membership plan feature' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymMembershipPlanFeaturesDto,
  ) {
    return this.gymMembershipPlanFeaturesService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym membership plan feature' })
  remove(@Param('id') id: string) {
    return this.gymMembershipPlanFeaturesService.remove(+id);
  }
}
