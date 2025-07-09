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
  CreateGymMembershipPlanDto,
  UpdateGymMembershipPlanDto,
  DetailsGymMembershipPlanDto,
  PaginatedDetailsGymMembershipPlanDto
} from '../dto';
import { GymMembershipPlanService } from '../service';


@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/membership-plan')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymMembershipPlanController {
  constructor(private readonly gymMembershipPlanService: GymMembershipPlanService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym membership plan',
    operationId: 'createGymMembershipPlan',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym membership plan created successfully.',
    type: DetailsGymMembershipPlanDto,
  })
  async create(
    @Body() createDto: CreateGymMembershipPlanDto,
    @User('id') userId: number
  ) {
    return await this.gymMembershipPlanService.create(createDto, userId);
  }

  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get all membership plans of a gym',
    operationId: 'getGymMembershipPlansByGymId',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym membership plans retrieved successfully.',
    type: PaginatedDetailsGymMembershipPlanDto,
  })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymMembershipPlanDto> {
    return await this.gymMembershipPlanService.findByGym(+gymId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym membership plan by id',
    operationId: 'getGymMembershipPlanById',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym membership plan retrieved successfully.',
    type: DetailsGymMembershipPlanDto,
  })
  async findOne(@Param('id') id: string): Promise<DetailsGymMembershipPlanDto> {
    return await this.gymMembershipPlanService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym membership plan',
    operationId: 'updateGymMembershipPlan',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym membership plan updated successfully.',
    type: DetailsGymMembershipPlanDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGymMembershipPlanDto,
    @User('id') userId: number
  ) {
    return await this.gymMembershipPlanService.update(+id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym membership plan',
    operationId: 'deleteGymMembershipPlan',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym membership plan deleted successfully.',
  })
  async remove(@Param('id') id: string, @User('id') userId: number): Promise<void> {
    return await this.gymMembershipPlanService.remove(+id, userId);
  }
}
