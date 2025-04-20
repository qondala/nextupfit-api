import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { User } from '@app/common/decorators';

import { UserBookmarkAndFavoriteService } from '../service';
import { UserBookmarkAndFavoriteItemTypeEnum } from '../types';
import { DetailsUserBookmarkAndFavoriteDto } from '../dto';


@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/program-evolution")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserBookmarkAndFavoriteController {
  constructor(
    private readonly bookmarkAndFavoriteService: UserBookmarkAndFavoriteService,
  ) {}

  @Post()
  async create(
    @User('id') userId: number,
    @Body() body: {
      itemId: number;
      bookmarkType: UserBookmarkAndFavoriteItemTypeEnum;
      isBookMark?: boolean;
      isFavorite?: boolean;
    },
  ) {
    return await this.bookmarkAndFavoriteService.create(
      userId,
      body.itemId,
      body.bookmarkType,
      body.isBookMark,
      body.isFavorite,
    );
  }

  @Get()
  async findAll(
    @User('id') userId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<DetailsUserBookmarkAndFavoriteDto>> {
    return await this.bookmarkAndFavoriteService.findAll(userId, paginationOptions);
  }

  @Get('type/:type')
  async findByType(
    @User('id') userId: number,
    @Param('type') type: UserBookmarkAndFavoriteItemTypeEnum,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<DetailsUserBookmarkAndFavoriteDto>> {
    return await this.bookmarkAndFavoriteService.findByType(
      userId,
      type,
      paginationOptions,
    );
  }

  @Get('bookmarks')
  async findBookmarks(
    @User('id') userId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<DetailsUserBookmarkAndFavoriteDto>> {
    return await this.bookmarkAndFavoriteService.findBookmarks(
      userId,
      paginationOptions,
    );
  }

  @Get('favorites')
  async findFavorites(
    @User('id') userId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<DetailsUserBookmarkAndFavoriteDto>> {
    return await this.bookmarkAndFavoriteService.findFavorites(
      userId,
      paginationOptions,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { isBookMark?: boolean; isFavorite?: boolean },
  ): Promise<DetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.update(
      id,
      body.isBookMark,
      body.isFavorite,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.bookmarkAndFavoriteService.delete(id);
  }

  @Get('check')
  async checkBookmarkAndFavorite(
    @User('id') userId: number,
    @Query('itemId') itemId: number,
    @Query('type') type: UserBookmarkAndFavoriteItemTypeEnum,
  ): Promise<DetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.findByItemId(
      userId,
      itemId,
      type,
    );
  }
}
