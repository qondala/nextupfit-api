import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { UserBookmarkAndFavoriteEntity } from '../entity';
import { UserBookmarkAndFavoriteItemTypeEnum } from '../types';
import { UpdateUserBookmarkAndFavoriteDto } from '../dto';

@Injectable()
export class UserBookmarkAndFavoriteService {
  constructor(
    @InjectRepository(UserBookmarkAndFavoriteEntity)
    private readonly bookmarkAndFavoriteRepository: Repository<UserBookmarkAndFavoriteEntity>,
  ) {}

  async create(dto: UpdateUserBookmarkAndFavoriteDto): Promise<UserBookmarkAndFavoriteEntity> {
    const bookmarkAndFavorite = this.bookmarkAndFavoriteRepository.create(dto);
    return await this.bookmarkAndFavoriteRepository.save(bookmarkAndFavorite);
  }

  async findAll(
    userId: number,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserBookmarkAndFavoriteEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.bookmarkAndFavoriteRepository.findAndCount({
      where: { userId },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page
      }
    };
  }

  async findByType(
    userId: number,
    bookmarkType: UserBookmarkAndFavoriteItemTypeEnum,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserBookmarkAndFavoriteEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.bookmarkAndFavoriteRepository.findAndCount({
      where: { userId, bookmarkType },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page
      }
    };
  }

  async findBookmarks(
    userId: number,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserBookmarkAndFavoriteEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.bookmarkAndFavoriteRepository.findAndCount({
      where: { userId, isBookMark: true },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page
      }
    };
  }

  async findFavorites(
    userId: number,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserBookmarkAndFavoriteEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.bookmarkAndFavoriteRepository.findAndCount({
      where: { userId, isFavorite: true },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page
      }
    };
  }

  async update(
    id: number,
    dto: UpdateUserBookmarkAndFavoriteDto,
  ): Promise<UserBookmarkAndFavoriteEntity> {
    const bookmarkAndFavorite = await this.bookmarkAndFavoriteRepository.findOne({
      where: { id },
    });

    if (!bookmarkAndFavorite) {
      throw new NotFoundException('Bookmark or favorite not found');
    }

    if (dto?.isBookMark !== undefined) {
      bookmarkAndFavorite.isBookMark = dto.isBookMark;
    }

    if (dto?.isFavorite !== undefined) {
      bookmarkAndFavorite.isFavorite = dto.isFavorite;
    }

    return await this.bookmarkAndFavoriteRepository.save(bookmarkAndFavorite);
  }

  async delete(id: number): Promise<void> {
    await this.bookmarkAndFavoriteRepository.delete(id);
  }

  async findByItemId(
    userId: number,
    itemId: number,
    bookmarkType: UserBookmarkAndFavoriteItemTypeEnum,
  ): Promise<UserBookmarkAndFavoriteEntity> {
    return await this.bookmarkAndFavoriteRepository.findOne({
      where: { userId, itemId, bookmarkType },
    });
  }

  async isBookmarked(
    userId: number,
    itemId: number,
    bookmarkType: UserBookmarkAndFavoriteItemTypeEnum,
  ): Promise<boolean> {
    const bookmarkAndFavorite = await this.bookmarkAndFavoriteRepository.findOne({
      where: { userId, itemId, bookmarkType },
    });
    return !!bookmarkAndFavorite;
  }

  async isFavorite(
    userId: number,
    itemId: number,
    bookmarkType: UserBookmarkAndFavoriteItemTypeEnum,
  ): Promise<boolean> {
    const bookmarkAndFavorite = await this.bookmarkAndFavoriteRepository.findOne({
      where: { userId, itemId, bookmarkType },
    });
    return !!bookmarkAndFavorite;
  }
}
