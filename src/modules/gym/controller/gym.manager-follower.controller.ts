import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import { 
  CreateGymManagerFollowerDto, 
  UpdateGymManagerFollowerDto, 
  DetailsGymManagerFollowerDto,
  PaginatedDetailsGymManagerFollowerDto
} from '../dto';
import { GymManagerFollowerService } from '../service';


@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager/follower')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerFollowerController {
  constructor(private readonly gymManagerFollowerService: GymManagerFollowerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym manager follower' })
  @ApiResponse({ status: 201, description: 'Gym manager follower created successfully.', type: DetailsGymManagerFollowerDto })
  async create(
    @Body() createDto: CreateGymManagerFollowerDto,
    @User('id') userId: number
  ) {
    return await this.gymManagerFollowerService.create(createDto, userId);
  }

  @Get('manager/:managerId')
  @ApiOperation({ summary: 'Get all followers of a manager' })
  @ApiResponse({ status: 200, description: 'Paginated list of manager followers', type: PaginatedDetailsGymManagerFollowerDto })
  async findByManager(
    @Param('managerId') managerId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerFollowerDto> {
    return this.gymManagerFollowerService.findByManager(+managerId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all managers followed by a user' })
  @ApiResponse({ status: 200, description: 'Paginated list of followed managers', type: PaginatedDetailsGymManagerFollowerDto })
  async findByUser(
    @Param('userId') userId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerFollowerDto> {
    return this.gymManagerFollowerService.findByUser(+userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym manager follower by id' })
  @ApiResponse({ status: 200, description: 'Gym manager follower details', type: DetailsGymManagerFollowerDto })
  async findOne(@Param('id') id: string): Promise<DetailsGymManagerFollowerDto> {
    return this.gymManagerFollowerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym manager follower' })
  @ApiResponse({ status: 200, description: 'Updated gym manager follower details', type: DetailsGymManagerFollowerDto })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymManagerFollowerDto,
    @User('id') userId: number
  ) {
    return await this.gymManagerFollowerService.update(+id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym manager follower' })
  @ApiResponse({ status: 204, description: 'Gym manager follower deleted successfully' })
  async remove(@Param('id') id: string, @User('id') userId: number): Promise<void> {
    return this.gymManagerFollowerService.remove(+id, userId);
  }
}
