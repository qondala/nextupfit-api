import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import { 
  CreateGymFollowerDto, 
  UpdateGymFollowerDto,
  DetailsGymFollowerDto,
  PaginatedDetailsGymFollowerDto
} from '../dto';
import { GymFollowerService } from '../service';


@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/follower')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymFollowerController {
  constructor(private readonly gymFollowerService: GymFollowerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym follower' })
  @ApiResponse({ status: 201, description: 'Gym follower created successfully.', type: DetailsGymFollowerDto })
  async create(
    @Body() createDto: CreateGymFollowerDto,
  ) {
    return await this.gymFollowerService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({ summary: 'Get all followers of a gym' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of gym followers',
    type: PaginatedDetailsGymFollowerDto
  })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymFollowerDto> {
    return this.gymFollowerService.findByGym(+gymId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all gyms followed by a user' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of followed gyms',
    type: PaginatedDetailsGymFollowerDto
  })
  async findByUser(
    @Param('userId') userId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymFollowerDto> {
    return this.gymFollowerService.findByUser(+userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym follower by id' })
  @ApiResponse({ status: 200, description: 'Gym follower details', type: DetailsGymFollowerDto })
  async findOne(@Param('id') id: string): Promise<DetailsGymFollowerDto> {
    return this.gymFollowerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym follower' })
  @ApiResponse({ status: 200, description: 'Updated gym follower details', type: DetailsGymFollowerDto })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymFollowerDto
  ) {
    return await this.gymFollowerService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym follower' })
  @ApiResponse({ status: 204, description: 'Gym follower deleted successfully' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.gymFollowerService.remove(+id);
  }
}
