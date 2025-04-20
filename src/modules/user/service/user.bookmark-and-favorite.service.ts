import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBookmarkAndFavoriteEntity } from '../entity/user.bookmark-and-favorite.entity';
import { UserBookmarkAndFavoriteItemTypeEnum } from '../types';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

@Injectable()
export class UserBookmarkAndFavoriteService {
  constructor(
    @InjectRepository(UserBookmarkAndFavoriteEntity)
    private readonly bookmarkAndFavoriteRepository: Repository<UserBookmarkAndFavoriteEntity>,
  ) {}

  async create(
    userId: number,
    itemId: number,
    bookmarkType: UserBookmarkAndFavoriteItemTypeEnum,
    isBookMark: boolean = false,
    isFavorite: boolean = false,
  ): Promise<UserBookmarkAndFavoriteEntity> {
    const bookmarkAndFavorite = this.bookmarkAndFavoriteRepository.create({
      userId,
      itemId,
      bookmarkType,
      isBookMark,
      isFavorite,
    });
    return await this.bookmarkAndFavoriteRepository.save(bookmarkAndFavorite);
  }

  async findAll(
    userId: number,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserBookmarkAndFavoriteEntity>> {
    const [items, total] = await this.bookmarkAndFavoriteRepository.findAndCount({
      where: { userId },
      skip: options.page,
      take: options.limit,
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
    const [items, total] = await this.bookmarkAndFavoriteRepository.findAndCount({
      where: { userId, bookmarkType },
      skip: options.page,
      take: options.limit,
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
    const [items, total] = await this.bookmarkAndFavoriteRepository.findAndCount({
      where: { userId, isBookMark: true },
      skip: options.page,
      take: options.limit,
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
    const [items, total] = await this.bookmarkAndFavoriteRepository.findAndCount({
      where: { userId, isFavorite: true },
      skip: options.page,
      take: options.limit,
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
    isBookMark?: boolean,
    isFavorite?: boolean,
  ): Promise<UserBookmarkAndFavoriteEntity> {
    const bookmarkAndFavorite = await this.bookmarkAndFavoriteRepository.findOne({
      where: { id },
    });

    if (!bookmarkAndFavorite) {
      throw new Error('Bookmark or favorite not found');
    }

    if (isBookMark !== undefined) {
      bookmarkAndFavorite.isBookMark = isBookMark;
    }
    if (isFavorite !== undefined) {
      bookmarkAndFavorite.isFavorite = isFavorite;
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
}
