import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';

import { CreateGymOpenDayDto, UpdateGymOpenDayDto } from '../dto';
import { GymOpenDayService } from '../service';
import { GymOpenDayEntity } from '../entity';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/opening-day')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymOpenDayController {
  constructor(private readonly gymOpenDayService: GymOpenDayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gym open day' })
  @ApiResponse({ status: 201, description: 'Gym open day created successfully.' })
  create(  @Body() createDto: CreateGymOpenDayDto ) {
    return this.gymOpenDayService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({ summary: 'Get all opening days of a gym' })
  async findByGym(
    @Param('gymId') gymId: string,
  ): Promise<GymOpenDayEntity[]> {
    return this.gymOpenDayService.findByGym(+gymId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gym membership by id' })
  findOne(@Param('id') id: string) {
    return this.gymOpenDayService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gym opening day' })
  update( @Param('id') id: string, @Body() updateDto: UpdateGymOpenDayDto,) {
    return this.gymOpenDayService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete gym opening day' })
  remove(@Param('id') id: string) {
    return this.gymOpenDayService.remove(+id);
  }
}
