import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialAdvertisementDto, UpdateSocialAdvertisementDto } from '../dto';
import { SocialAdvertisementService } from '../service';
import { SocialAdvertisementEntity } from '../entity';


@ApiTags('Social module endpoints')
@ApiBearerAuth()
@Controller('social/advertisement')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialAdvertisementController {
  constructor(private readonly advertisementService: SocialAdvertisementService) {}

  @Post()
  @ApiOperation({ summary: 'Create an advertisement' })
  @ApiResponse({ status: 201, description: 'Advertisement created successfully.' })
  create(
    @Body() createDto: CreateSocialAdvertisementDto,
    @User('id') userId: number
  ) {
    return this.advertisementService.create(createDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all advertisements' })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<SocialAdvertisementEntity>> {
    return this.advertisementService.findAll(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get advertisement by id' })
  findOne(@Param('id') id: string) {
    return this.advertisementService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update advertisement' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialAdvertisementDto
  ) {
    return this.advertisementService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete advertisement' })
  remove(@Param('id') id: string) {
    return this.advertisementService.remove(+id);
  }
}
