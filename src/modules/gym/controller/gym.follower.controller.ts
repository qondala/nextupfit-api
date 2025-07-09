import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import { 
  CreateGymFollowerDto, 
  UpdateGymFollowerDto,
  DetailsGymFollowerDto,
  PaginatedDetailsGymFollowerDto
} from '../dto';
import { GymFollowerService } from '../service';
import { ErrorResponseException, ErrorResponseExceptionType, SystemStatusCode } from '@app/common/exceptions';
import { SwaggerType } from '@app/common/types';
import { ok } from 'assert';


@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/follower')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymFollowerController {
  constructor(private readonly gymFollowerService: GymFollowerService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym follower',
    operationId: 'createGymFollower'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym follower created successfully.',
    type: DetailsGymFollowerDto
  })
  async create(
    @Body() createDto: CreateGymFollowerDto,
  ) {
    return await this.gymFollowerService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get all followers of a gym',
    operationId: 'findByGym'
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
    description: 'Paginated list of gym followers',
    type: PaginatedDetailsGymFollowerDto
  })
  async findByGym(
    @Param('gymId', ParseIntPipe) gymId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymFollowerDto> {
    return this.gymFollowerService.findByGym(+gymId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all gyms followed by a user',
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
    description: 'Paginated list of followed gyms',
    type: PaginatedDetailsGymFollowerDto
  })
  async findByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymFollowerDto> {
    return this.gymFollowerService.findByUser(+userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym follower by id',
    operationId: 'findOne'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym follower details',
    type: DetailsGymFollowerDto
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsGymFollowerDto> {
    const record = this.gymFollowerService.findOne(id);
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

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym follower',
    operationId: 'update'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiBody({
    type: UpdateGymFollowerDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated gym follower details',
    type: DetailsGymFollowerDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Gym follower not found',
    type: ErrorResponseException,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymFollowerDto
  ) {
    const record = await this.gymFollowerService.update(id, updateDto);
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

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym follower',
    operationId: 'remove'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym follower deleted successfully'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Gym follower not found',
    type: ErrorResponseException,
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const ok = this.gymFollowerService.remove(id);
    if (!ok) {
      throw new ErrorResponseException(
        ErrorResponseExceptionType.DATABASE,
        `Gym follower with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
        SystemStatusCode.NOT_FOUND
      );
    }
    return ok;
  }
}
