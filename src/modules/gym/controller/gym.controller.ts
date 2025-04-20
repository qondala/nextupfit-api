import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import { CreateGymDto, PaginatedDetailsGymDto, UpdateGymDto } from '../dto';
import { GymService } from '../service';
import { DetailsGymDto } from '../dto';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymController {

  constructor(private readonly gymService: GymService) {}

  @Post()
  @ApiOperation({
    operationId: 'createGym',
    summary: 'Create a new gym'
  })
  @ApiCreatedResponse({
    description: 'Gym created successfully.',
    type: DetailsGymDto
  })
  create(
    @Body() createDto: CreateGymDto
  ): Promise<DetailsGymDto> {
    return this.gymService.create(createDto);
  }

  @Get()
  @ApiOperation({
    operationId: 'findAllGyms',
    summary: 'Get all gyms'
  })
  @ApiOkResponse({
    description: 'List of gyms.',
    type: PaginatedDetailsGymDto
  })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findAll(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'findGymById',
    summary: 'Get gym by id'
  })
  @ApiOkResponse({
    description: 'Gym by id.',
    type: DetailsGymDto
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.gymService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    operationId: 'updateGym',
    summary: 'Update gym'
  })
  @ApiOkResponse({
    description: 'Updated gym.',
    type: DetailsGymDto
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymDto,
  ): Promise<DetailsGymDto> {
    return this.gymService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'removeGym',
    summary: 'Delete gym'
  })
  @ApiOkResponse({
    description: 'Deleted gym.',
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.gymService.remove(id);
  }
}
