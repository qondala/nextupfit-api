import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialNewsDto, UpdateSocialNewsDto } from '../dto';
import { SocialNewsEntity } from '../entity';

@Injectable()
export class SocialNewsService {
  constructor(
    @InjectRepository(SocialNewsEntity)
    private readonly newsRepository: Repository<SocialNewsEntity>,
  ) {}

  async create(createDto: CreateSocialNewsDto, userId: number): Promise<SocialNewsEntity> {
    const news = this.newsRepository.create({
      ...createDto,
      userId,
      createdAt: new Date()
    });
    return await this.newsRepository.save(news);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<SocialNewsEntity>> {
    const queryBuilder = this.newsRepository.createQueryBuilder('news')
      .orderBy('news.createdAt', 'DESC');

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page
      }
    };
  }

  async findOne(id: number): Promise<SocialNewsEntity> {
    return await this.newsRepository.findOne({ where: { id } }) as SocialNewsEntity;
  }

  async update(id: number, updateDto: UpdateSocialNewsDto): Promise<SocialNewsEntity> {
    await this.newsRepository.update(id, {
      ...updateDto,
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.newsRepository.delete(id);
  }
}
