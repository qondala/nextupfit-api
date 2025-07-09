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
  ParseArrayPipe
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
  @ApiBody({
    required: true,
    type: CreateGymManagerSpecializedInWorkoutDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym manager specialized workout created successfully.',
    type: DetailsGymManagerSpecializedInWorkoutDto,
  })
  async create(
    @Body() createDto: CreateGymManagerSpecializedInWorkoutDto,
  ) {
    return await this.gymManagerSpecializedInWorkoutService.create(createDto);
  }


  @Get('manager/:managerId')
  @ApiOperation({
    summary: 'Get all specialized workouts of a manager',
    operationId: 'getGymManagerSpecializedInWorkoutByManager',
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager specialized workouts found successfully.',
    type: PaginatedDetailsGymManagerSpecializedInWorkoutDto,
  })
  async findByManager(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerSpecializedInWorkoutDto> {
    return await this.gymManagerSpecializedInWorkoutService.findByManager(managerId, paginationOptions);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Get gym manager specialized workout by id',
    operationId: 'getGymManagerSpecializedInWorkoutById',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager specialized workout found successfully.',
    type: DetailsGymManagerSpecializedInWorkoutDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsGymManagerSpecializedInWorkoutDto> {
    return await this.gymManagerSpecializedInWorkoutService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym manager specialized workout',
    operationId: 'updateGymManagerSpecializedInWorkout',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiBody({
    required: true,
    type: UpdateGymManagerSpecializedInWorkoutDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager specialized workout updated successfully.',
    type: DetailsGymManagerSpecializedInWorkoutDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymManagerSpecializedInWorkoutDto,
  ): Promise<DetailsGymManagerSpecializedInWorkoutDto> {
    return await this.gymManagerSpecializedInWorkoutService.update(id, updateDto);
  }


  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym manager specialized workout',
    operationId: 'deleteGymManagerSpecializedInWorkout',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym manager specialized workout deleted successfully.',
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.gymManagerSpecializedInWorkoutService.remove(id);
  }

  @Get('workouts')
  @ApiOperation({
    summary: 'Find managers specialized in workout',
    operationId: 'findManagersSpecializedInWorkout',
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
  })
  @ApiQuery({
    name: 'workoutIds',
    required: true,
    type: SwaggerType.INTEGER,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Found managers specialized in workout',
    type: PaginatedDetailsGymManagerSpecializedInWorkoutDto
  })
  async findManagersSpecializedInWorkouts(
    @Query() options: PaginationOptionsDto,
    @Query('workoutIds', new ParseArrayPipe({ items: Number })) workoutIds: number[],
  ): Promise<PaginatedDetailsGymManagerSpecializedInWorkoutDto> {
    return this.gymManagerSpecializedInWorkoutService.findManagersSpecializedInWorkouts(workoutIds, options);
  }
}
