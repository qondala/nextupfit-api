import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  ParseIntPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

import { SwaggerType } from '@app/common/types';

import { GymHasProgramService } from '../service';
import {
  CreateGymHasProgramDto,
  DetailsGymHasProgramDto,
  UpdateGymHasProgramDto,
  PaginatedDetailsGymHasProgramDto,
} from '../dto';
import { PaginationOptionsDto } from '@app/common/dto';
import { ProgramItemTypeEnum } from '@app/module/program/types';

@ApiTags('Gym Has Program')
@Controller('gym-has-program')
export class GymHasProgramController {
  constructor(private readonly gymHasProgramService: GymHasProgramService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym has program record',
    operationId: 'createGymHasProgram',
  })
  @ApiBody({
    type: CreateGymHasProgramDto,
    description: 'Gym has program data to create',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym has program record created successfully',
    type: DetailsGymHasProgramDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  create(@Body() createGymHasProgramDto: CreateGymHasProgramDto): Promise<DetailsGymHasProgramDto> {
    return this.gymHasProgramService.create(createGymHasProgramDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all gym has program records with pagination',
    operationId: 'findAllGymHasProgram',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of records per page (default: 10)',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym has program records retrieved successfully',
    type: PaginatedDetailsGymHasProgramDto,
  })
  findAll(
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymHasProgramDto> {
    return this.gymHasProgramService.findAll(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a gym has program record by ID',
    operationId: 'findOneGymHasProgram',
  })
  @ApiParam({
    name: 'id',
    type: SwaggerType.INTEGER,
    description: 'Gym has program record ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym has program record retrieved successfully',
    type: DetailsGymHasProgramDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Gym has program record not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsGymHasProgramDto> {
    return this.gymHasProgramService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a gym has program record by ID',
    operationId: 'updateGymHasProgram',
  })
  @ApiParam({
    name: 'id',
    type: SwaggerType.INTEGER,
    description: 'Gym has program record ID',
    example: 1,
  })
  @ApiBody({
    type: UpdateGymHasProgramDto,
    description: 'Gym has program data to update',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym has program record updated successfully',
    type: DetailsGymHasProgramDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Gym has program record not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGymHasProgramDto: UpdateGymHasProgramDto,
  ): Promise<DetailsGymHasProgramDto> {
    return this.gymHasProgramService.update(id, updateGymHasProgramDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a gym has program record by ID',
    operationId: 'removeGymHasProgram',
  })
  @ApiParam({
    name: 'id',
    type: SwaggerType.INTEGER,
    description: 'Gym has program record ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym has program record deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Gym has program record not found',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gymHasProgramService.remove(id);
  }

  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get gym has program records by gym ID with pagination',
    operationId: 'findGymHasProgramByGymId',
  })
  @ApiParam({
    name: 'gymId',
    type: SwaggerType.INTEGER,
    description: 'Gym ID',
    example: 1,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of records per page (default: 10)',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym has program records retrieved successfully',
    type: PaginatedDetailsGymHasProgramDto,
  })
  findByGymId(
    @Param('gymId', ParseIntPipe) gymId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymHasProgramDto> {
    return this.gymHasProgramService.findByGymId(gymId, paginationOptions);
  }

  @Get('manager/:managerId')
  @ApiOperation({
    summary: 'Get gym has program records by manager ID with pagination',
    operationId: 'findGymHasProgramByManagerId',
  })
  @ApiParam({
    name: 'managerId',
    type: SwaggerType.INTEGER,
    description: 'Manager ID',
    example: 1,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of records per page (default: 10)',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym has program records retrieved successfully',
    type: PaginatedDetailsGymHasProgramDto,
  })
  findByManagerId(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymHasProgramDto> {
    return this.gymHasProgramService.findByManagerId(managerId, paginationOptions);
  }

  @Get('gym/:gymId/manager/:managerId')
  @ApiOperation({
    summary: 'Get gym has program records by gym ID and manager ID with pagination',
    operationId: 'findGymHasProgramByGymIdAndManagerId',
  })
  @ApiParam({
    name: 'gymId',
    type: SwaggerType.INTEGER,
    description: 'Gym ID',
    example: 1,
  })
  @ApiParam({
    name: 'managerId',
    type: SwaggerType.INTEGER,
    description: 'Manager ID',
    example: 1,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of records per page (default: 10)',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym has program records retrieved successfully',
    type: PaginatedDetailsGymHasProgramDto,
  })
  findByGymIdAndManagerId(
    @Param('gymId', ParseIntPipe) gymId: number,
    @Param('managerId', ParseIntPipe) managerId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymHasProgramDto> {
    return this.gymHasProgramService.findByGymIdAndManagerId(gymId, managerId, paginationOptions);
  }

  @Get('item-type/:itemType/manager/:managerId')
  @ApiOperation({
    summary: 'Get gym has program records by item type and manager ID with pagination',
    operationId: 'findGymHasProgramByItemTypeAndManagerId',
  })
  @ApiParam({
    name: 'itemType',
    enum: ProgramItemTypeEnum,
    enumName: 'ProgramItemTypeEnum',
    description: 'Item type',
    example: ProgramItemTypeEnum.program,
  })
  @ApiParam({
    name: 'managerId',
    type: SwaggerType.INTEGER,
    description: 'Manager ID',
    example: 1,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of records per page (default: 10)',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym has program records retrieved successfully',
    type: PaginatedDetailsGymHasProgramDto,
  })
  findByItemTypeAndManagerId(
    @Param('itemType', new ParseEnumPipe(ProgramItemTypeEnum)) itemType: ProgramItemTypeEnum,
    @Param('managerId', ParseIntPipe) managerId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymHasProgramDto> {
    return this.gymHasProgramService.findByItemTypeAndManagerId(itemType, managerId, paginationOptions);
  }
}
