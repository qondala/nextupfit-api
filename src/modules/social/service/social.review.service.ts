import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialReviewDto, UpdateSocialReviewDto } from '../dto';
import { SocialReviewEntity } from '../entity';


@Injectable()
export class SocialReviewService {
  constructor(
    @InjectRepository(SocialReviewEntity)
    private readonly reviewRepository: Repository<SocialReviewEntity>,
  ) {}

  async create(createDto: CreateSocialReviewDto, userId: number): Promise<SocialReviewEntity> {
    const review = this.reviewRepository.create({
      ...createDto,
      userId,
      createdAt: new Date()
    });
    return await this.reviewRepository.save(review);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
    userId: number
  ): Promise<PaginatedResponseDto<SocialReviewEntity>> {
    const queryBuilder = this.reviewRepository.createQueryBuilder('review')
      .where('review.userId = :userId', { userId })
      .orderBy('review.createdAt', 'DESC');

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

  async findOne(id: number): Promise<SocialReviewEntity> {
    return await this.reviewRepository.findOne({ where: { id } }) as SocialReviewEntity;
  }

  async update(id: number, updateDto: UpdateSocialReviewDto): Promise<SocialReviewEntity> {
    await this.reviewRepository.update(id, {
      ...updateDto,
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
