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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
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
import { GymManagerService } from '../service';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerController {
  constructor(private readonly gymManagerService: GymManagerService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym manager',
    description: 'Create a new gym manager',
    operationId: 'createGymManager',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym manager created successfully.',
    type: DetailsGymManagerDto,
  })
  async create(
    @Body() createDto: CreateGymManagerDto,
  ) {
    return await this.gymManagerService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get all managers of a gym',
    description: 'Get all managers of a gym',
    operationId: 'getGymManagersByGymId',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym managers retrieved successfully.',
    type: PaginatedDetailsGymManagerDto,
  })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerDto> {
    return await this.gymManagerService.findByGym(+gymId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all gyms managed by a user',
    description: 'Get all gyms managed by a user',
    operationId: 'getGymsManagedByUser',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gyms managed by a user retrieved successfully.',
    type: PaginatedDetailsGymManagerDto,
  })
  async findByUser(
    @Param('userId') userId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerDto> {
    return await this.gymManagerService.findByUser(+userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym manager by id',
    description: 'Get gym manager by id',
    operationId: 'getGymManagerById',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager retrieved successfully.',
    type: DetailsGymManagerDto,
  })
  async findOne(@Param('id') id: string) {
    return await this.gymManagerService.findOne(+id);
  }


  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym manager',
    description: 'Update gym manager',
    operationId: 'updateGymManager',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager updated successfully.',
    type: DetailsGymManagerDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymManagerDto,
    @User('id') userId: number
  ) {
    return await this.gymManagerService.update(+id, updateDto, userId);
  }


  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym manager',
    description: 'Delete gym manager',
    operationId: 'deleteGymManager',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager deleted successfully.',
    type: DetailsGymManagerDto,
  })
  async remove(@Param('id') id: string, @User('id') userId: number) {
    return await this.gymManagerService.remove(+id, userId);
  }
}
