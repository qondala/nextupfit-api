import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymManagerRequestDto, UpdateGymManagerRequestDto } from '../dto';
import { GymManagerRequestService } from '../service';
import { GymManagerRequestEntity } from '../entity';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager/request')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerRequestController {
  constructor(private readonly gymManagerRequestService: GymManagerRequestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym manager request' })
  @ApiResponse({ status: 201, description: 'Gym manager request created successfully.' })
  create( @Body() createDto: CreateGymManagerRequestDto ) {
    return this.gymManagerRequestService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({ summary: 'Get all manager requests for a gym' })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerRequestEntity>> {
    return this.gymManagerRequestService.findByGym(+gymId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all requests made by a user' })
  async findByUser(
    @Param('userId') userId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerRequestEntity>> {
    return this.gymManagerRequestService.findByUser(+userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym manager request by id' })
  findOne(@Param('id') id: string) {
    return this.gymManagerRequestService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym manager request' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymManagerRequestDto
  ) {
    return this.gymManagerRequestService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym manager request' })
  remove(@Param('id') id: string) {
    return this.gymManagerRequestService.remove(+id);
  }
}
