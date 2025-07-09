import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

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
import { SwaggerType } from '@app/common/types';


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
  @ApiBody({
    required: true,
    type: CreateGymManagerOverviewDto
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
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of manager overviews',
    type: PaginatedDetailsGymManagerOverviewDto
  })
  async findByManager(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerOverviewDto> {
    return this.gymManagerOverviewService.findByManager(managerId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym manager overview by id',
    description: 'Get gym manager overview by id',
    operationId: 'getGymManagerOverviewById',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager overview details',
    type: DetailsGymManagerOverviewDto
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsGymManagerOverviewDto> {
    return this.gymManagerOverviewService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym manager overview',
    description: 'Update gym manager overview',
    operationId: 'updateGymManagerOverview',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiBody({
    required: true,
    type: UpdateGymManagerOverviewDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated gym manager overview details',
    type: DetailsGymManagerOverviewDto
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymManagerOverviewDto,
    @User('id') userId: number
  ): Promise<DetailsGymManagerOverviewDto> {
    return this.gymManagerOverviewService.update(id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym manager overview',
    description: 'Delete gym manager overview',
    operationId: 'deleteGymManagerOverview',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym manager overview deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number, @User('id') userId: number): Promise<void> {
    return this.gymManagerOverviewService.remove(id, userId);
  }
}
