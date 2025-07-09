import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import { 
  CreateGymManagerOverviewDto, 
  UpdateGymManagerOverviewDto,
  DetailsGymManagerOverviewDto,
  PaginatedDetailsGymManagerOverviewDto
} from '../dto';
import { GymManagerOverviewService } from '../service';


@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager/overview')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerOverviewController {
  constructor(private readonly gymManagerOverviewService: GymManagerOverviewService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym manager overview',
    description: 'Create a new gym manager overview',
    operationId: 'createGymManagerOverview',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym manager overview created successfully.',
    type: DetailsGymManagerOverviewDto
  })
  create(
    @Body() createDto: CreateGymManagerOverviewDto,
    @User('id') userId: number
  ) {
    return this.gymManagerOverviewService.create(createDto, userId);
  }

  @Get('manager/:managerId')
  @ApiOperation({
    summary: 'Get overview by manager id',
    description: 'Get overview by manager id',
    operationId: 'getGymManagerOverviewByManagerId',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of manager overviews',
    type: PaginatedDetailsGymManagerOverviewDto
  })
  async findByManager(
    @Param('managerId') managerId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerOverviewDto> {
    return this.gymManagerOverviewService.findByManager(+managerId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym manager overview by id',
    description: 'Get gym manager overview by id',
    operationId: 'getGymManagerOverviewById',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager overview details',
    type: DetailsGymManagerOverviewDto
  })
  async findOne(@Param('id') id: string): Promise<DetailsGymManagerOverviewDto> {
    return this.gymManagerOverviewService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym manager overview',
    description: 'Update gym manager overview',
    operationId: 'updateGymManagerOverview',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated gym manager overview details',
    type: DetailsGymManagerOverviewDto
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymManagerOverviewDto,
    @User('id') userId: number
  ) {
    return this.gymManagerOverviewService.update(+id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym manager overview',
    description: 'Delete gym manager overview',
    operationId: 'deleteGymManagerOverview',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym manager overview deleted successfully',
  })
  async remove(@Param('id') id: string, @User('id') userId: number): Promise<void> {
    return this.gymManagerOverviewService.remove(+id, userId);
  }
}
