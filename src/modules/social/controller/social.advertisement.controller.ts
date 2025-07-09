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
  ParseIntPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger';


import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import {
  CreateSocialAdvertisementDto,
  UpdateSocialAdvertisementDto,
  PaginatedDetailsSocialAdvertisementDto,
  DetailsSocialAdvertisementDto
} from '../dto';
import { SocialAdvertisementService } from '../service';
import { SocialAdvertisementEntity } from '../entity';
import { SwaggerType } from '@app/common/types';


@ApiTags('Social module endpoints')
@ApiBearerAuth()
@Controller('social/advertisement')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialAdvertisementController {
  constructor(private readonly advertisementService: SocialAdvertisementService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an advertisement',
    operationId: 'createSocialAdvertisement'
  })
  @ApiBody({ 
    type: CreateSocialAdvertisementDto,
    required: true,
    description: 'Advertisement to create'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Advertisement created successfully.',
    type: DetailsSocialAdvertisementDto,
  })
  async create(
    @Body() createDto: CreateSocialAdvertisementDto,
  ): Promise<DetailsSocialAdvertisementDto> {
    return await this.advertisementService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all advertisements',
    operationId: 'findAllSocialAdvertisements'
  })
  @ApiQuery({ 
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number'
  })
  @ApiQuery({ 
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of items per page'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Advertisements found successfully.',
    type: PaginatedDetailsSocialAdvertisementDto,
  })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsSocialAdvertisementDto> {
    return await this.advertisementService.findAll(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get advertisement by id',
    operationId: 'findSocialAdvertisementById'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Advertisement id'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsSocialAdvertisementDto,
    description: 'Advertisement found successfully.'
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.advertisementService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update advertisement',
    operationId: 'updateSocialAdvertisement'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Advertisement id'
  })
  @ApiBody({
    type: UpdateSocialAdvertisementDto,
    required: true,
    description: 'Advertisement to update'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Advertisement updated successfully.',
    type: DetailsSocialAdvertisementDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSocialAdvertisementDto
  ): Promise<DetailsSocialAdvertisementDto> {
    return this.advertisementService.update(id, updateDto);
  }

  @Get('manager/:managerId')
  @ApiOperation({
    summary: 'Get advertisements by manager id',
    operationId: 'findSocialAdvertisementsByManagerId'
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Manager id'
  })
  @ApiQuery({ 
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number'
  })
  @ApiQuery({ 
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of items per page'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsSocialAdvertisementDto,
    description: 'Advertisements found successfully.'
  })
  async findByManagerId(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsSocialAdvertisementDto> {
    return this.advertisementService.findByManagerId(managerId, paginationOptions);
  }

  @Get('random')
  @ApiOperation({
    summary: 'Get random advertisement',
    operationId: 'findSocialAdvertisementRandom'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsSocialAdvertisementDto,
    description: 'Advertisement found successfully.'
  })
  async getRandom(): Promise<DetailsSocialAdvertisementDto> {
    return await this.advertisementService.getRandom();
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete advertisement',
    operationId: 'deleteSocialAdvertisement'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Advertisement deleted successfully.'
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.advertisementService.remove(id);
  }
}
