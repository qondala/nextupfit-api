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
  HttpStatus
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth
} from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import {
  CreateGymManagerSpecializedInWorkoutDto,
  DetailsGymManagerSpecializedInWorkoutDto,
  PaginatedDetailsGymManagerSpecializedInWorkoutDto,
  UpdateGymManagerSpecializedInWorkoutDto
} from '../dto';
import { GymManagerSpecializedInWorkoutService } from '../service';


@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager/specialized-workout')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerSpecializedInWorkoutController {
  constructor(private readonly gymManagerSpecializedInWorkoutService: GymManagerSpecializedInWorkoutService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym manager specialized workout',
    operationId: 'createGymManagerSpecializedInWorkout',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym manager specialized workout created successfully.',
    type: DetailsGymManagerSpecializedInWorkoutDto,
  })
  async create(
    @Body() createDto: CreateGymManagerSpecializedInWorkoutDto,
    @User('id') userId: number
  ) {
    return await this.gymManagerSpecializedInWorkoutService.create(createDto, userId);
  }


  @Get('manager/:managerId')
  @ApiOperation({
    summary: 'Get all specialized workouts of a manager',
    operationId: 'getGymManagerSpecializedInWorkoutByManager',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager specialized workouts found successfully.',
    type: PaginatedDetailsGymManagerSpecializedInWorkoutDto,
  })
  async findByManager(
    @Param('managerId') managerId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerSpecializedInWorkoutDto> {
    return await this.gymManagerSpecializedInWorkoutService.findByManager(+managerId, paginationOptions);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Get gym manager specialized workout by id',
    operationId: 'getGymManagerSpecializedInWorkoutById',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager specialized workout found successfully.',
    type: DetailsGymManagerSpecializedInWorkoutDto,
  })
  async findOne(@Param('id') id: string): Promise<DetailsGymManagerSpecializedInWorkoutDto> {
    return await this.gymManagerSpecializedInWorkoutService.findOne(+id);
  }


  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym manager specialized workout',
    operationId: 'updateGymManagerSpecializedInWorkout',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager specialized workout updated successfully.',
    type: DetailsGymManagerSpecializedInWorkoutDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymManagerSpecializedInWorkoutDto,
    @User('id') userId: number
  ): Promise<DetailsGymManagerSpecializedInWorkoutDto> {
    return await this.gymManagerSpecializedInWorkoutService.update(+id, updateDto, userId);
  }


  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym manager specialized workout',
    operationId: 'deleteGymManagerSpecializedInWorkout',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager specialized workout deleted successfully.',
  })
  async remove(@Param('id') id: string, @User('id') userId: number): Promise<void> {
    return await this.gymManagerSpecializedInWorkoutService.remove(+id, userId);
  }
}
