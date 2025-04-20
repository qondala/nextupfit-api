import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymManagerFollowerDto, UpdateGymManagerFollowerDto } from '../dto';
import { GymManagerFollowerService } from '../service';
import { GymManagerFollowerEntity } from '../entity';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager/follower')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerFollowerController {
  constructor(private readonly gymManagerFollowerService: GymManagerFollowerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym manager follower' })
  @ApiResponse({ status: 201, description: 'Gym manager follower created successfully.' })
  create(
    @Body() createDto: CreateGymManagerFollowerDto,
    @User('id') userId: number
  ) {
    return this.gymManagerFollowerService.create(createDto, userId);
  }

  @Get('manager/:managerId')
  @ApiOperation({ summary: 'Get all followers of a manager' })
  async findByManager(
    @Param('managerId') managerId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerFollowerEntity>> {
    return this.gymManagerFollowerService.findByManager(+managerId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all managers followed by a user' })
  async findByUser(
    @Param('userId') userId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerFollowerEntity>> {
    return this.gymManagerFollowerService.findByUser(+userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym manager follower by id' })
  findOne(@Param('id') id: string) {
    return this.gymManagerFollowerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym manager follower' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymManagerFollowerDto,
    @User('id') userId: number
  ) {
    return this.gymManagerFollowerService.update(+id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym manager follower' })
  remove(@Param('id') id: string, @User('id') userId: number) {
    return this.gymManagerFollowerService.remove(+id, userId);
  }
}
