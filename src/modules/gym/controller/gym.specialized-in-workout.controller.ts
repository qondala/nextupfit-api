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
  ParseIntPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery
} from '@nestjs/swagger';

import { SwaggerType } from '@app/common/types';
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
  @ApiBody({
    required: true,
    type: CreateGymSpecializedInWorkoutDto,
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
    description: 'Paginated list of specialized workouts',
    type: PaginatedDetailsGymSpecializedInWorkoutDto
  })
  async findByGym(
    @Param('gymId', ParseIntPipe) gymId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymSpecializedInWorkoutDto> {
    return this.gymSpecializedInWorkoutService.findByGym(gymId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym specialized workout by id',
    description: 'Get gym specialized workout by id',
    operationId: 'getGymSpecializedInWorkoutById',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym specialized workout details',
    type: DetailsGymSpecializedInWorkoutDto
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsGymSpecializedInWorkoutDto> {
    return await this.gymSpecializedInWorkoutService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym specialized workout',
    description: 'Update gym specialized workout',
    operationId: 'updateGymSpecializedInWorkout',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiBody({
    required: true,
    type: UpdateGymSpecializedInWorkoutDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated gym specialized workout details',
    type: DetailsGymSpecializedInWorkoutDto
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymSpecializedInWorkoutDto
  ): Promise<DetailsGymSpecializedInWorkoutDto> {
    return await this.gymSpecializedInWorkoutService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym specialized workout',
    description: 'Delete gym specialized workout',
    operationId: 'deleteGymSpecializedInWorkout',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym specialized workout deleted successfully',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gymSpecializedInWorkoutService.remove(id);
  }
}
