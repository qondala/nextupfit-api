import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  GymEntity, 
  GymManagerOverviewEntity 
} from '@app/module/gym/entity';

import {
  ProgramEntity, 
  ProgramStepActivityEntity, 
  ProgramStepActivityWorkingsessionEntity, 
  ProgramStepActivityWorkingsessionWorkoutEntity 
} from '@app/module/program/entity';

import { CreateSocialRatingsDto, DetailsSocialRatingsDto } from '../dto';
import { SocialRatingsEntity, SocialReviewEntity } from '../entity';
import { SocialReviewItemTypeEnum } from '../types';


@Injectable()
export class SocialRatingsService {
  constructor(
    @InjectRepository(SocialRatingsEntity)
    private readonly ratingsRepository: Repository<SocialRatingsEntity>,
    @InjectRepository(SocialReviewEntity)
    private readonly reviewRepository: Repository<SocialReviewEntity>,

    @InjectRepository(GymEntity)
    private readonly gymRepository: Repository<GymEntity>,
    @InjectRepository(GymManagerOverviewEntity)
    private readonly managerOverviewRepository: Repository<GymManagerOverviewEntity>,


    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,

    @InjectRepository(ProgramStepActivityEntity)
    private readonly activityRepository: Repository<ProgramStepActivityEntity>,

    @InjectRepository(ProgramStepActivityWorkingsessionEntity)
    private readonly workingSessionRepository: Repository<ProgramStepActivityWorkingsessionEntity>,

    @InjectRepository(ProgramStepActivityWorkingsessionWorkoutEntity)
    private readonly workoutRepository: Repository<ProgramStepActivityWorkingsessionWorkoutEntity>
  ) {}

  async create(createDto: CreateSocialRatingsDto): Promise<SocialRatingsEntity> {
    const ratings = this.ratingsRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.ratingsRepository.save(ratings);
  }


  async getRatingsFromReviews(itemType: SocialReviewItemTypeEnum, itemId: number): Promise<DetailsSocialRatingsDto> {
    
    const hasPreviousRatings = await this.hasAnyRatings(itemType, itemId);

    const ratings: DetailsSocialRatingsDto = {
      averageRating: 0,
      averageEaseOfUse: 0,
      averageEffectiveness: 0,
      totalReviews: 0,
      minRating: 0,
      maxRating: 0,
      itemId,
      itemType,
    };

    if (!hasPreviousRatings) {
      return ratings;
    }
    
    const result = await this.reviewRepository.createQueryBuilder('review')
      .select('AVG(review.rating)', 'averageRating')
      .addSelect('AVG(review.easeOfUse)', 'averageEaseOfUse')
      .addSelect('AVG(review.effectiveness)', 'averageEffectiveness')
      .addSelect('COUNT(review.id)', 'totalReviews')
      .addSelect('MIN(review.rating)', 'minRating')
      .addSelect('MAX(review.rating)', 'maxRating')
      .where('review.itemId = :itemId', { itemId })
      .andWhere('review.itemType = :itemType', { itemType })
      .getRawOne();

    ratings.averageRating = parseFloat(result.averageRating.toFixed(1));
    ratings.averageEaseOfUse = parseFloat(result.averageEaseOfUse.toFixed(1));
    ratings.averageEffectiveness = parseFloat(result.averageEffectiveness.toFixed(1));
    ratings.totalReviews = parseInt(result.totalReviews);
    ratings.minRating = parseFloat(result.minRating.toFixed(1));
    ratings.maxRating = parseFloat(result.maxRating.toFixed(1));
    ratings.itemId = itemId;
    ratings.itemType = itemType;
    
    return ratings;
  }

  async updateRatings(itemType: SocialReviewItemTypeEnum, itemId: number): Promise<SocialRatingsEntity> {
    const ratings = await this.getRatingsFromReviews(itemType, itemId);

    const wasAnyRated = await this.hasAnyRatings(itemType, itemId);

    if ( wasAnyRated ) {
      await this.ratingsRepository.update(
        { itemType, itemId },
        { ...ratings, updatedAt: new Date() }
      );
    } else {
      await this.create(ratings);  
    }

    await this.updateItemRepository(itemType, itemId, ratings);

    return await this.findOne(itemType, itemId);
  }
  async hasAnyRatings(itemType: SocialReviewItemTypeEnum, itemId: number): Promise<boolean> {
    const result = await this.findOne(itemType, itemId);
    return result !== null;
  }

  async findOne(itemType: SocialReviewItemTypeEnum, itemId: number): Promise<SocialRatingsEntity> {
    const record = await this.ratingsRepository.findOne({ where: { itemType, itemId } });
    return record;
  }

  async updateItemRepository(
    itemType: SocialReviewItemTypeEnum, 
    itemId: number, 
    ratings: DetailsSocialRatingsDto
  ): Promise<void> {
    switch(itemType) {
      case SocialReviewItemTypeEnum.gym:
        await this.gymRepository.update(
          { id: itemId }, 
          {
            ratingsAvg: ratings.averageRating, 
            ratingsCount: ratings.totalReviews
          }
        );
        break;

      case SocialReviewItemTypeEnum.manager:
        await this.managerOverviewRepository.update(
          { id: itemId }, 
          {
            ratingsAvg: ratings.averageRating, 
            ratingsCount: ratings.totalReviews
          }
        );
        break;

      case SocialReviewItemTypeEnum.program:
        await this.programRepository.update(
          { id: itemId }, 
          {
            ratingsAvg: ratings.averageRating, 
            ratingsCount: ratings.totalReviews
          }
        );
        break;

      case SocialReviewItemTypeEnum.activity:
        await this.activityRepository.update(
          { id: itemId }, 
          {
            ratingsAvg: ratings.averageRating, 
            ratingsCount: ratings.totalReviews
          }
        );
        break;

      case SocialReviewItemTypeEnum.workingsession:
        await this.workingSessionRepository.update(
          { id: itemId }, 
          {
            ratingsAvg: ratings.averageRating, 
            ratingsCount: ratings.totalReviews
          }
        );
        break;

      case SocialReviewItemTypeEnum.workout:
        await this.workoutRepository.update(
          { id: itemId }, 
          {
            ratingsAvg: ratings.averageRating, 
            ratingsCount: ratings.totalReviews
          }
        );
        break;
    }
    
  }

}
