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
import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import { 
  CreateGymManagerFollowerDto, 
  UpdateGymManagerFollowerDto, 
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
    summary: 'Create a new gym manager follower',
    operationId: 'createGymManagerFollower'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym manager follower created successfully.',
    type: DetailsGymManagerFollowerDto
  })
  @ApiBody({
    required: true,
    type: CreateGymManagerFollowerDto
  })
  async create(
    @Body() createDto: CreateGymManagerFollowerDto,
    @User('id') userId: number
  ) {
    return await this.gymManagerFollowerService.create(createDto, userId);
  }

  @Get('manager/:managerId')
  @ApiOperation({
    summary: 'Get all followers of a manager',
    operationId: 'findByManager'
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
  async findByManager(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerFollowerDto> {
    return this.gymManagerFollowerService.findByManager(managerId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all managers followed by a user',
    operationId: 'findByUser'
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
    description: 'Paginated list of followed managers',
    type: PaginatedDetailsGymManagerFollowerDto
  })
  async findByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerFollowerDto> {
    return this.gymManagerFollowerService.findByUser(userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym manager follower by id',
    operationId: 'findOne'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager follower details',
    type: DetailsGymManagerFollowerDto
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsGymManagerFollowerDto> {
    return this.gymManagerFollowerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym manager follower',
    operationId: 'update'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiBody({
    type: UpdateGymManagerFollowerDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated gym manager follower details',
    type: DetailsGymManagerFollowerDto
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymManagerFollowerDto,
    @User('id') userId: number
  ) {
    return await this.gymManagerFollowerService.update(id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym manager follower',
    operationId: 'remove'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym manager follower deleted successfully'
  })
  async remove(@Param('id', ParseIntPipe) id: number, @User('id') userId: number): Promise<void> {
    return this.gymManagerFollowerService.remove(id, userId);
  }
}
