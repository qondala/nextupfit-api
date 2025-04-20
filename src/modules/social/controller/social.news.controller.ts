import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialNewsDto, UpdateSocialNewsDto } from '../dto';
import { SocialNewsService } from '../service';
import { SocialNewsEntity } from '../entity';


@ApiTags('Social module endpoints')
@ApiBearerAuth()
@Controller('social/news')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialNewsController {
  constructor(private readonly newsService: SocialNewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a news post' })
  @ApiResponse({ status: 201, description: 'News post created successfully.' })
  create(
    @Body() createDto: CreateSocialNewsDto,
    @User('id') userId: number
  ) {
    return this.newsService.create(createDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news posts' })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<SocialNewsEntity>> {
    return this.newsService.findAll(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news post by id' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update news post' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialNewsDto
  ) {
    return this.newsService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete news post' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
