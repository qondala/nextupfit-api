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
  CreateGymManagerRequestDto,
  UpdateGymManagerRequestDto,
  DetailsGymManagerRequestDto,
  PaginatedDetailsGymManagerRequestDto
} from '../dto';
import { GymManagerRequestService } from '../service';


@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/manager/request')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerRequestController {
  constructor(private readonly gymManagerRequestService: GymManagerRequestService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym manager request',
    description: 'Create a new gym manager request',
    operationId: 'createGymManagerRequest'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym manager request created successfully.',
    type: DetailsGymManagerRequestDto
  })
  create( @Body() createDto: CreateGymManagerRequestDto ) {
    return this.gymManagerRequestService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get all manager requests for a gym',
    description: 'Get all manager requests for a gym',
    operationId: 'getGymManagerRequestByGymId'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of manager requests for gym',
    type: PaginatedDetailsGymManagerRequestDto
  })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerRequestDto> {
    return this.gymManagerRequestService.findByGym(+gymId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all requests made by a user',
    description: 'Get all requests made by a user',
    operationId: 'getGymManagerRequestByUserId'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of manager requests by user',
    type: PaginatedDetailsGymManagerRequestDto
  })
  async findByUser(
    @Param('userId') userId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymManagerRequestDto> {
    return this.gymManagerRequestService.findByUser(+userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym manager request by id',
    description: 'Get gym manager request by id',
    operationId: 'getGymManagerRequestById'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym manager request details',
    type: DetailsGymManagerRequestDto
  })
  async findOne(@Param('id') id: string): Promise<DetailsGymManagerRequestDto> {
    return this.gymManagerRequestService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym manager request',
    description: 'Update gym manager request',
    operationId: 'updateGymManagerRequest'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated gym manager request details',
    type: DetailsGymManagerRequestDto
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymManagerRequestDto
  ): Promise<DetailsGymManagerRequestDto> {
    return await this.gymManagerRequestService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym manager request',
    description: 'Delete gym manager request',
    operationId: 'deleteGymManagerRequest'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym manager request deleted successfully'
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.gymManagerRequestService.remove(+id);
  }
}
