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

import { CreateGymMembershipDto, UpdateGymMembershipDto, DetailsGymMembershipDto, PaginatedDetailsGymMembershipDto } from '../dto';
import { GymMembershipService } from '../service';


@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/membership')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymMembershipController {
  constructor(private readonly gymMembershipService: GymMembershipService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym membership',
    operationId: 'createGymMembership',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym membership created successfully.',
    type: DetailsGymMembershipDto
  })
  async create(
    @Body() createDto: CreateGymMembershipDto,
  ): Promise<DetailsGymMembershipDto> {
    return await this.gymMembershipService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get all memberships of a gym',
    operationId: 'getGymMembershipsByGymId',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of gym memberships by gym',
    type: PaginatedDetailsGymMembershipDto
  })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymMembershipDto> {
    return await this.gymMembershipService.findByGym(+gymId, paginationOptions);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all memberships of a user',
    operationId: 'getGymMembershipsByUserId',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of gym memberships by user',
    type: PaginatedDetailsGymMembershipDto
  })
  async findByUser(
    @Param('userId') userId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymMembershipDto> {
    return await this.gymMembershipService.findByUser(+userId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym membership by id',
    operationId: 'getGymMembershipById',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym membership details',
    type: DetailsGymMembershipDto
  })
  async findOne(@Param('id') id: string): Promise<DetailsGymMembershipDto> {
    return await this.gymMembershipService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym membership',
    operationId: 'updateGymMembership',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated gym membership details',
    type: DetailsGymMembershipDto
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymMembershipDto,
    @User('id') userId: number
  ): Promise<DetailsGymMembershipDto> {
    return await this.gymMembershipService.update(+id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym membership',
    operationId: 'deleteGymMembership',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym membership deleted successfully',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.gymMembershipService.remove(+id);
  }
}
