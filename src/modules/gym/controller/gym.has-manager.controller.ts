import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import {
  CreateGymHasManagerDto,
  DetailsGymHasManagerDto,
  UpdateGymHasManagerDto,
  PaginatedDetailsGymHasManagerDto,
} from '../dto';
import { GymHasManagerService } from '../service';
import { SwaggerType } from '@app/common/types';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/has-manager')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymHasManagerController {
  constructor(
    private readonly gymHasManagerService: GymHasManagerService
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym has manager',
    description: 'Create a new gym has manager',
    operationId: 'createGymHasManager',
  })
  @ApiBody({
    required: true,
    type: CreateGymHasManagerDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym has manager created successfully.',
    type: DetailsGymHasManagerDto,
  })
  async create(
    @Body() createDto: CreateGymHasManagerDto,
  ): Promise<DetailsGymHasManagerDto> {
    return await this.gymHasManagerService.create(createDto);
  }

  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get gym has manager by gym id',
    description: 'Get gym has manager by gym id',
    operationId: 'findAllGymManagers',
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
    description: 'Gym has manager retrieved successfully.',
    type: PaginatedDetailsGymHasManagerDto,
  })
  async findAllGymManagers(
    @Param('gymId', ParseIntPipe) gymId: number,
    @Query() paginationOptions: PaginationOptionsDto): Promise<PaginatedDetailsGymHasManagerDto> {
    return await this.gymHasManagerService.findAllGymManagers(gymId, paginationOptions);
  }

  @Get('manager/:managerId')
  @ApiOperation({
    summary: 'Get gym has manager by manager id',
    description: 'Get gym has manager by manager id',
    operationId: 'findAllManagerGyms',
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
    description: 'Gym has manager retrieved successfully.',
    type: PaginatedDetailsGymHasManagerDto,
  })
  async findAllManagerGyms(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Query() paginationOptions: PaginationOptionsDto): Promise<PaginatedDetailsGymHasManagerDto> {
    return await this.gymHasManagerService.findAllManagerGyms(managerId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym has manager by id',
    description: 'Get gym has manager by id',
    operationId: 'getGymHasManagerById',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym has manager retrieved successfully.',
    type: DetailsGymHasManagerDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsGymHasManagerDto> {
    return await this.gymHasManagerService.findOne(id);
  }

  @Patch('update-status/:id')
  @ApiOperation({
    summary: 'Update gym has manager status by id',
    description: 'Update gym has manager status by id',
    operationId: 'updateGymHasManagerStatusById',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiBody({
    required: true,
    type: UpdateGymHasManagerDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym has manager updated successfully.',
    type: DetailsGymHasManagerDto,
  })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymHasManagerDto
  ): Promise<void> {
    await this.gymHasManagerService.updateStatus(id, updateDto.status);
    return;
  }


  @Patch('update-status/manager/:managerId/gym/:gymId')
  @ApiOperation({
    summary: 'Update gym has manager status by manager id and gym id',
    description: 'Update gym has manager status by manager id and gym id',
    operationId: 'updateGymHasManagerStatusByManagerIdAndGymId',
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiParam({
    name: 'gymId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiBody({
    required: true,
    type: UpdateGymHasManagerDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym has manager updated successfully.',
    type: DetailsGymHasManagerDto,
  })
  async updateStatusByManagerIdAndGymId(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Param('gymId', ParseIntPipe) gymId: number,
    @Body() updateDto: UpdateGymHasManagerDto
  ): Promise<void> {
    await this.gymHasManagerService.updateStatusByManagerIdAndGymId(managerId, gymId, updateDto.status);
    return;
  }


  @Patch('update-role/:id')
  @ApiOperation({
    summary: 'Update gym has manager role by id',
    description: 'Update gym has manager role by id',
    operationId: 'updateGymHasManagerRoleById',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiBody({
    required: true,
    type: UpdateGymHasManagerDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym has manager updated successfully.',
    type: DetailsGymHasManagerDto,
  })
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymHasManagerDto
  ): Promise<void> {
    await this.gymHasManagerService.updateRole(id, updateDto.role);
    return;
  }

  @Patch('update-role/manager/:managerId/gym/:gymId')
  @ApiOperation({
    summary: 'Update gym has manager role by manager id and gym id',
    description: 'Update gym has manager role by manager id and gym id',
    operationId: 'updateGymHasManagerRoleByManagerIdAndGymId',
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiParam({
    name: 'gymId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiBody({
    required: true,
    type: UpdateGymHasManagerDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym has manager updated successfully.',
    type: DetailsGymHasManagerDto,
  })
  async updateRoleByManagerIdAndGymId(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Param('gymId', ParseIntPipe) gymId: number,
    @Body() updateDto: UpdateGymHasManagerDto
  ): Promise<void> {
    await this.gymHasManagerService.updateRoleByManagerIdAndGymId(managerId, gymId, updateDto.role);
    return;
  }
}
