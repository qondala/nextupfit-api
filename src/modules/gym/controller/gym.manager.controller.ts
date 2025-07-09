import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import {
  CreateGymManagerDto,
  DetailsGymManagerDto,
  UpdateGymManagerDto,
  PaginatedDetailsGymManagerDto,
} from '../dto';
import { GymManagerService, GymManagerOverviewService } from '../service';
import { SwaggerType } from '@app/common/types';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerController {
  constructor(
    private readonly gymManagerService: GymManagerService,
    private readonly gymManagerOverviewService: GymManagerOverviewService
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym manager',
    description: 'Create a new gym manager',
    operationId: 'createGymManager',
  })
  @ApiBody({
    required: true,
    type: CreateGymManagerDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym manager created successfully.',
    type: DetailsGymManagerDto,
  })
  async create(
    @Body() createDto: CreateGymManagerDto,
  ): Promise<DetailsGymManagerDto> {
    return await this.gymManagerService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get all managers of a gym',
    description: 'Get all managers of a gym',
    operationId: 'getGymManagersByGymId',
  })
  @ApiParam({
    name: 'gymId',
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
    description: 'Gym managers retrieved successfully.',
    type: PaginatedDetailsGymManagerDto,
  })
  async findByGym(
    @Param('gymId', ParseIntPipe) gymId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerDto> {
    return await this.gymManagerService.findByGym(gymId, paginationOptions);
  }


  @Get('best-rated-and-attended')
  @ApiOperation({
    summary: 'Get best rated and attended managers',
    description: 'Get best rated and attended managers',
    operationId: 'getBestRatedAndAttentedManagers',
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
    description: 'Best rated and attended managers retrieved successfully.',
    type: PaginatedDetailsGymManagerDto,
  })
  async findBestRatedAndAttented(
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerDto> {
    const managers = await this.gymManagerOverviewService.findBestRatedAndAttented(paginationOptions);
    
    const details: DetailsGymManagerDto[] = await Promise.all(
      managers.items.map(async (manager) => {
        const gymManager: DetailsGymManagerDto = await this.gymManagerService.findOne(manager.id);
        return gymManager;
      })
    );

    return {
      ...managers,
      items: details
    };
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all gyms managed by a user',
    description: 'Get all gyms managed by a user',
    operationId: 'getGymsManagedByUser',
  })
  @ApiParam({
    name: 'userId',
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
    description: 'Gyms managed by a user retrieved successfully.',
    type: PaginatedDetailsGymManagerDto,
  })
  async findByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerDto> {
    return await this.gymManagerService.findByUser(userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym manager by id',
    description: 'Get gym manager by id',
    operationId: 'getGymManagerById',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager retrieved successfully.',
    type: DetailsGymManagerDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsGymManagerDto> {
    return await this.gymManagerService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym manager',
    description: 'Update gym manager',
    operationId: 'updateGymManager',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiBody({
    required: true,
    type: UpdateGymManagerDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager updated successfully.',
    type: DetailsGymManagerDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymManagerDto,
    @User('id') userId: number
  ): Promise<DetailsGymManagerDto> {
    return await this.gymManagerService.update(id, updateDto, userId);
  }


  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym manager',
    description: 'Delete gym manager',
    operationId: 'deleteGymManager',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym manager deleted successfully.',
    type: DetailsGymManagerDto,
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number
  ): Promise<void> {
    return await this.gymManagerService.remove(id, userId);
  }
}
