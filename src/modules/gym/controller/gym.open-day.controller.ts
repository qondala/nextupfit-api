import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import { CreateGymOpenDayDto, UpdateGymOpenDayDto, DetailsGymOpenDayDto, PaginatedDetailsGymOpenDayDto } from '../dto';
import { GymOpenDayService } from '../service';


@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/opening-day')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymOpenDayController {
  constructor(private readonly gymOpenDayService: GymOpenDayService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym open day',
    operationId: 'createGymOpenDay'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym open day created successfully.',
    type: DetailsGymOpenDayDto
  })
  async create(@Body() createDto: CreateGymOpenDayDto): Promise<DetailsGymOpenDayDto> {
    return await this.gymOpenDayService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get all opening days of a gym',
    operationId: 'getGymOpenDaysByGymId'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of gym open days',
    type: PaginatedDetailsGymOpenDayDto
  })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymOpenDayDto> {
    return await this.gymOpenDayService.findByGym(+gymId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym open day by id',
    operationId: 'getGymOpenDayById'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym open day details',
    type: DetailsGymOpenDayDto
  })
  async findOne(@Param('id') id: string): Promise<DetailsGymOpenDayDto> {
    return await this.gymOpenDayService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym opening day',
    operationId: 'updateGymOpenDay'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym open day updated successfully.',
    type: DetailsGymOpenDayDto
  })
  async update(@Param('id') id: string, @Body() updateDto: UpdateGymOpenDayDto): Promise<DetailsGymOpenDayDto> {
    return await this.gymOpenDayService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym opening day',
    operationId: 'deleteGymOpenDay'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym open day deleted successfully.'
  })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.gymOpenDayService.remove(+id);
  }
}
