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

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import { 
  CreateGymSpecializedInWorkoutDto, 
  UpdateGymSpecializedInWorkoutDto, 
  DetailsGymSpecializedInWorkoutDto, 
  PaginatedDetailsGymSpecializedInWorkoutDto
} from '../dto';
import { GymSpecializedInWorkoutService } from '../service';


@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/specialized-workout')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymSpecializedInWorkoutController {
  constructor(private readonly gymSpecializedInWorkoutService: GymSpecializedInWorkoutService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym specialized workout',
    description: 'Create a new gym specialized workout',
    operationId: 'createGymSpecializedInWorkout',
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Gym specialized workout created successfully.',
    type: DetailsGymSpecializedInWorkoutDto
  })
  async create( @Body() createDto: CreateGymSpecializedInWorkoutDto ): Promise<DetailsGymSpecializedInWorkoutDto> {
    return await this.gymSpecializedInWorkoutService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get all specialized workouts of a gym',
    description: 'Get all specialized workouts of a gym',
    operationId: 'getGymSpecializedInWorkouts',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of specialized workouts',
    type: PaginatedDetailsGymSpecializedInWorkoutDto
  })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymSpecializedInWorkoutDto> {
    return this.gymSpecializedInWorkoutService.findByGym(+gymId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym specialized workout by id',
    description: 'Get gym specialized workout by id',
    operationId: 'getGymSpecializedInWorkoutById',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym specialized workout details',
    type: DetailsGymSpecializedInWorkoutDto
  })
  async findOne(@Param('id') id: string): Promise<DetailsGymSpecializedInWorkoutDto> {
    return await this.gymSpecializedInWorkoutService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym specialized workout',
    description: 'Update gym specialized workout',
    operationId: 'updateGymSpecializedInWorkout',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated gym specialized workout details',
    type: DetailsGymSpecializedInWorkoutDto
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymSpecializedInWorkoutDto
  ): Promise<DetailsGymSpecializedInWorkoutDto> {
    return await this.gymSpecializedInWorkoutService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym specialized workout',
    description: 'Delete gym specialized workout',
    operationId: 'deleteGymSpecializedInWorkout',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym specialized workout deleted successfully',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.gymSpecializedInWorkoutService.remove(+id);
  }
}
