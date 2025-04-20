import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialReviewDto, UpdateSocialReviewDto } from '../dto';
import { SocialReviewService } from '../service';
import { SocialReviewEntity } from '../entity';


@ApiTags('Social module endpoints')
@ApiBearerAuth()
@Controller('social/review')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialReviewController {
  constructor(private readonly reviewService: SocialReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create a review' })
  @ApiResponse({ status: 201, description: 'Review created successfully.' })
  create(
    @Body() createDto: CreateSocialReviewDto,
    @User('id') userId: number
  ) {
    return this.reviewService.create(createDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto,
    @User('id') userId: number
  ): Promise<PaginatedResponseDto<SocialReviewEntity>> {
    return this.reviewService.findAll(paginationOptions, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get review by id' })
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update review' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialReviewDto
  ) {
    return this.reviewService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete review' })
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
