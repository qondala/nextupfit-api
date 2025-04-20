import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialAffiliateLinkDto, UpdateSocialAffiliateLinkDto } from '../dto';
import { SocialAffiliateLinkService } from '../service';
import { SocialAffiliateLinkEntity } from '../entity';


@ApiTags('Social module endpoints')
@ApiBearerAuth()
@Controller('social/affiliate/link')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialAffiliateLinkController {
  constructor(private readonly affiliateLinkService: SocialAffiliateLinkService) {}

  @Post()
  @ApiOperation({ summary: 'Create an affiliate link' })
  @ApiResponse({ status: 201, description: 'Affiliate link created successfully.' })
  create(
    @Body() createDto: CreateSocialAffiliateLinkDto,
    @User('id') userId: number
  ) {
    return this.affiliateLinkService.create(createDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all affiliate links' })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto,
    @User('id') userId: number
  ): Promise<PaginatedResponseDto<SocialAffiliateLinkEntity>> {
    return this.affiliateLinkService.findAll(paginationOptions, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get affiliate link by id' })
  findOne(@Param('id') id: string) {
    return this.affiliateLinkService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update affiliate link' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialAffiliateLinkDto
  ) {
    return this.affiliateLinkService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete affiliate link' })
  remove(@Param('id') id: string) {
    return this.affiliateLinkService.remove(+id);
  }
}
