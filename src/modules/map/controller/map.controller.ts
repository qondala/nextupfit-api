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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiQuery
} from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto, LocationRadiusDto } from '@app/common/dto';

import {
  CreateMapDto,
  DetailsMapDto,
  PaginatedDetailsMapDto,
  UpdateMapDto
} from '../dto';
import { MapService } from '../service';
import { SwaggerType } from '@app/common/types';


@ApiTags('Map module endpoints')
@ApiBearerAuth()
@Controller('map')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MapController {

  constructor(private readonly mapService: MapService) {}

  @Post()
  @ApiOperation({
    operationId: 'createMapRecord',
    summary: 'Save a location on map'
  })
  @ApiCreatedResponse({
    description: 'Location saved successfully.',
    type: DetailsMapDto
  })
  create(@Body() createDto: CreateMapDto): Promise<DetailsMapDto> {
    return this.mapService.create(createDto);
  }


  @Get('gyms-and-managers')
  @ApiOperation({
    operationId: 'findGymsAndManagersWithinRadius',
    summary: 'Get Gyms and Users locations within radius'
  })
  @ApiOkResponse({
    description: 'List of gyms and users locations within radius.',
    type: PaginatedDetailsMapDto,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'latitude',
    description: 'Latitude of the location',
    required: true,
    type: SwaggerType.NUMBER
  })
  @ApiQuery({
    name: 'longitude',
    description: 'Longitude of the location',
    required: true,
    type: SwaggerType.NUMBER
  })
  @ApiQuery({
    name: 'radius',
    description: 'Radius in meters',
    required: true,
    type: SwaggerType.INTEGER
  })
  async findGymsAndManagersWithinRadius(
    @Query() locationRadiusDto: LocationRadiusDto,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsMapDto> {
    return this.mapService.findGymsAndManagersWithinRadius(locationRadiusDto, paginationOptions);
  }


  @Get('gyms')
  @ApiOperation({
    operationId: 'findGymsWithinRadius',
    summary: 'Get all gyms locations'
  })
  @ApiOkResponse({
    description: 'List of gyms locations.',
    type: PaginatedDetailsMapDto
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'latitude',
    description: 'Latitude of the location',
    required: true,
    type: SwaggerType.NUMBER
  })
  @ApiQuery({
    name: 'longitude',
    description: 'Longitude of the location',
    required: true,
    type: SwaggerType.NUMBER
  })
  @ApiQuery({
    name: 'radius',
    description: 'Radius in meters',
    required: true,
    type: SwaggerType.INTEGER
  })
  async getAllGymsLocations(
    @Query() locationRadiusDto: LocationRadiusDto,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsMapDto> {
    return this.mapService.findGymsWithinRadius(locationRadiusDto, paginationOptions);
  }


  @Get('managers')
  @ApiOperation({
    operationId: 'findManagersWithinRadius',
    summary: 'Get all managers locations'
  })
  @ApiOkResponse({
    description: 'List of managers locations.',
    type: PaginatedDetailsMapDto
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'latitude',
    description: 'Latitude of the location',
    required: true,
    type: SwaggerType.NUMBER
  })
  @ApiQuery({
    name: 'longitude',
    description: 'Longitude of the location',
    required: true,
    type: SwaggerType.NUMBER
  })
  @ApiQuery({
    name: 'radius',
    description: 'Radius in meters',
    required: true,
    type: SwaggerType.INTEGER
  })
  async getAllManagersLocations(
    @Query() locationRadiusDto: LocationRadiusDto,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsMapDto> {
    return this.mapService.findManagersWithinRadius(locationRadiusDto, paginationOptions);
  }


  @Get('attendees')
  @ApiOperation({
    operationId: 'findAttendeesWithinRadius',
    summary: 'Get all attendees locations'
  })
  @ApiOkResponse({
    description: 'List of attendees locations.',
    type: PaginatedDetailsMapDto
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'latitude',
    description: 'Latitude of the location',
    required: true,
    type: SwaggerType.NUMBER
  })
  @ApiQuery({
    name: 'longitude',
    description: 'Longitude of the location',
    required: true,
    type: SwaggerType.NUMBER
  })
  @ApiQuery({
    name: 'radius',
    description: 'Radius in meters',
    required: true,
    type: SwaggerType.INTEGER
  })
  async getAllAttendeesLocations(
    @Query() locationRadiusDto: LocationRadiusDto,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsMapDto> {
    return this.mapService.findAttendeesWithinRadius(locationRadiusDto, paginationOptions);
  }


  @Get('gym/:gymId')
  @ApiOperation({
    operationId: 'findByGym',
    summary: 'Get locations of a Gym'
  })
  @ApiOkResponse({
    description: 'List of gym locations.',
    type: PaginatedDetailsMapDto
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'gymId',
    description: 'Gym id',
    required: true,
    type: SwaggerType.INTEGER
  })
  async findByGym(
    @Param('gymId', ParseIntPipe) gymId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsMapDto> {
    return this.mapService.findByGym(+gymId, paginationOptions);
  }


  @Get('user/:userId')
  @ApiOperation({
    operationId: 'findByUser',
    summary: 'Get locations of a User'
  })
  @ApiOkResponse({
    description: 'List of locations of a User.',
    type: PaginatedDetailsMapDto
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'userId',
    description: 'User id',
    required: true,
    type: SwaggerType.INTEGER
  })
  async findByUser(
    @Param('userId', ParseIntPipe) targetUserId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsMapDto> {
    return this.mapService.findByUser(+targetUserId, paginationOptions);
  }


  @Get(':id')
  @ApiOperation({
    operationId: 'getMapRecordById',
    summary: 'Get map record by id'
  })
  @ApiOkResponse({
    description: 'Map record by id.',
    type: DetailsMapDto
  })
  @ApiQuery({
    name: 'id',
    description: 'Map record id',
    required: true,
    type: SwaggerType.INTEGER
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsMapDto> {
    return this.mapService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({
    operationId: 'updateMapRecord',
    summary: 'Update map record'
  })
  @ApiOkResponse({
    description: 'Updated map record.',
    type: DetailsMapDto
  })
  @ApiQuery({
    name: 'id',
    description: 'Map record id',
    required: true,
    type: SwaggerType.INTEGER
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateMapDto
  ): Promise<DetailsMapDto> {
    return this.mapService.update(id, updateDto);
  }


  @Delete(':id')
  @ApiOperation({
    operationId: 'deleteMapRecord',
    summary: 'Delete map record'
  })
  @ApiOkResponse({
    description: 'Deleted map record.',
    type: DetailsMapDto
  })
  @ApiQuery({
    name: 'id',
    description: 'Map record id',
    required: true,
    type: SwaggerType.INTEGER
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.mapService.remove(id);
  }
}
