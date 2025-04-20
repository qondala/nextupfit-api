import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymFollowerDto, UpdateGymFollowerDto } from '../dto';
import { GymFollowerService } from '../service';
import { GymFollowerEntity } from '../entity';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/follower')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymFollowerController {
  constructor(private readonly gymFollowerService: GymFollowerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym follower' })
  @ApiResponse({ status: 201, description: 'Gym follower created successfully.' })
  create(
    @Body() createDto: CreateGymFollowerDto,
  ) {
    return this.gymFollowerService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({ summary: 'Get all followers of a gym' })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymFollowerEntity>> {
    return this.gymFollowerService.findByGym(+gymId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all gyms followed by a user' })
  async findByUser(
    @Param('userId') userId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymFollowerEntity>> {
    return this.gymFollowerService.findByUser(+userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym follower by id' })
  findOne(@Param('id') id: string) {
    return this.gymFollowerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym follower' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymFollowerDto
  ) {
    return this.gymFollowerService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym follower' })
  remove(@Param('id') id: string) {
    return this.gymFollowerService.remove(+id);
  }
}
