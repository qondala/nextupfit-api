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
  ParseIntPipe,
  HttpStatus
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiBody
} from '@nestjs/swagger';

import { SwaggerType } from '@app/common/types';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';
import {
  ErrorResponseException,
  ErrorResponseExceptionType,
  SystemStatusCode
} from '@app/common/exceptions';


import { 
  CreateGymManagerFollowerDto,
  DetailsGymManagerFollowerDto,
  PaginatedDetailsGymManagerFollowerDto
} from '../dto';
import { GymManagerFollowerService } from '../service';



@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager/follower')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerFollowerController {
  constructor(private readonly gymManagerFollowerService: GymManagerFollowerService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym follower',
    operationId: 'createGymFollower'
  })
  @ApiBody({
    type: CreateGymManagerFollowerDto,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym follower created successfully.',
    type: DetailsGymManagerFollowerDto
  })
  async create(
    @Body() createDto: CreateGymManagerFollowerDto,
  ): Promise<DetailsGymManagerFollowerDto> {
    return await this.gymManagerFollowerService.create(createDto);
  }

  @Get('manager/:managerId')
  @ApiOperation({
    summary: 'Get all followers of a manager',
    operationId: 'getAllFollowersOfManager'
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
    description: 'Paginated list of manager followers',
    type: PaginatedDetailsGymManagerFollowerDto
  })
  async findAllFollowersOfManager(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerFollowerDto> {
    return this.gymManagerFollowerService.findAllFollowersOfManager(managerId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all managers followed by a user',
    operationId: 'getAllManagersFollowedByUser'
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
    description: 'Paginated list of managers followed by the user',
    type: PaginatedDetailsGymManagerFollowerDto
  })
  async findAllManagersFollowedByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerFollowerDto> {
    return this.gymManagerFollowerService.findAllManagersFollowedByUser(userId, paginationOptions);
  }

  @Get('is-following/user/:userId/manager/:managerId')
  @ApiOperation({
    summary: 'Check if a user is following a manager',
    operationId: 'isFollowingManager'
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User is following manager',
    type: DetailsGymManagerFollowerDto
  })
  async isFollowingManager(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('managerId', ParseIntPipe) managerId: number
  ): Promise<DetailsGymManagerFollowerDto> {
    return this.gymManagerFollowerService.isFollowing(userId, managerId);
  }


  @Patch('accept-follower/manager/:managerId/user/:userId')
  @ApiOperation({
    summary: 'Accept a follower',
    operationId: 'acceptFollower'
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Follower accepted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Follower accepted successfully',
  })
  async acceptFollower(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.gymManagerFollowerService.acceptFollower(managerId, userId);
    return;
  }


  @Patch('reject-follower/manager/:managerId/user/:userId')
  @ApiOperation({
    summary: 'Reject a follower',
    operationId: 'rejectFollower'
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Follower rejected successfully',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Follower rejected successfully',
  })
  async rejectFollower(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.gymManagerFollowerService.rejectFollower(managerId, userId);
    return;
  }


  @Patch('stop-following/user/:userId/manager/:managerId')
  @ApiOperation({
    summary: 'Stop following a manager',
    operationId: 'stopFollowing'
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Stopped following the manager successfully',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Stopped following the manager successfully',
  })
  async stopFollowing(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('managerId', ParseIntPipe) managerId: number
  ): Promise<void> {
    await this.gymManagerFollowerService.stopFollowing(userId, managerId);
    return;
  }

  @Patch('block-follower/manager/:managerId/user/:userId')
  @ApiOperation({
    summary: 'Block a follower',
    operationId: 'blockFollowerManager'
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Follower blocked successfully',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Follower blocked successfully',
  })
  async blockFollower(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('managerId', ParseIntPipe) managerId: number
  ): Promise<void> {
    await this.gymManagerFollowerService.blockFollower(managerId, userId);
    return;
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Get gym follower by id',
    operationId: 'findOneManagerFollower'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym follower details',
    type: DetailsGymManagerFollowerDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Gym follower not found',
    type: ErrorResponseException
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsGymManagerFollowerDto> {
    const record = this.gymManagerFollowerService.findOne(id);
    if (!record) {
      throw new ErrorResponseException(
        ErrorResponseExceptionType.DATABASE,
        `Gym follower with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
        SystemStatusCode.NOT_FOUND
      );
    }
    return record;
  }
}
