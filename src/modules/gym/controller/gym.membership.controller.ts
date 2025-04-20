import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymMembershipDto, UpdateGymMembershipDto } from '../dto';
import { GymMembershipService } from '../service';
import { GymMembershipEntity } from '../entity';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/membership')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymMembershipController {
  constructor(private readonly gymMembershipService: GymMembershipService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym membership' })
  @ApiResponse({ status: 201, description: 'Gym membership created successfully.' })
  create(
    @Body() createDto: CreateGymMembershipDto,
  ) {
    return this.gymMembershipService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({ summary: 'Get all memberships of a gym' })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymMembershipEntity>> {
    return this.gymMembershipService.findByGym(+gymId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all memberships of a user' })
  async findByUser(
    @Param('userId') userId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymMembershipEntity>> {
    return this.gymMembershipService.findByUser(+userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym membership by id' })
  findOne(@Param('id') id: string) {
    return this.gymMembershipService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym membership' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymMembershipDto,
    @User('id') userId: number
  ) {
    return this.gymMembershipService.update(+id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym membership' })
  remove(@Param('id') id: string) {
    return this.gymMembershipService.remove(+id);
  }
}
