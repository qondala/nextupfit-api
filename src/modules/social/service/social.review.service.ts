import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialReviewDto, UpdateSocialReviewDto } from '../dto';
import { SocialReviewEntity } from '../entity';
import { SocialReviewItemTypeEnum } from '../types';
import { DetailsSocialRatingsDto } from '../dto/details';


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



  async getProgramRating(programId: number): Promise<DetailsSocialRatingsDto> {
    const reviews = await this.reviewRepository.find({
      where: { itemId: programId, itemType: SocialReviewItemTypeEnum.program },
      order: { createdAt: 'DESC' },
      take: 10,
    });

    const stats = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'averageRating')
      .addSelect('AVG(review.easeOfUse)', 'averageEaseOfUse')
      .addSelect('AVG(review.effectiveness)', 'averageEffectiveness')
      .addSelect('COUNT(review.id)', 'totalReviews')
      .addSelect('MIN(review.rating)', 'minRating')
      .addSelect('MAX(review.rating)', 'maxRating')
      .where('review.itemId = :programId', { programId })
      .andWhere('review.itemType = :itemType', { itemType: SocialReviewItemTypeEnum.program })
      .getRawOne();

    return {
      reviews,
      count: parseInt(stats.totalReviews) || 0,
      rating: parseFloat(stats.averageRating) || 0,
      easeOfUse: parseFloat(stats.averageEaseOfUse) || 0,
      effectiveness: parseFloat(stats.averageEffectiveness) || 0,
      minRating: parseFloat(stats.minRating) || 0,
      maxRating: parseFloat(stats.maxRating) || 0,
      itemId: programId,
      itemType: SocialReviewItemTypeEnum.program,
    };
  }
}
