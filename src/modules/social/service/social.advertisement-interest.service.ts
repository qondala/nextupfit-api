import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  FindOrderByEnum,
  InterestPaginationDto,
  PaginatedResponseDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import { UserInterestService } from "@app/module/user/service";

import { SocialAdvertisementEntity, SocialAdvertisementInterestEntity } from "../entity";
import {
  CreateSocialAdvertisementInterestDto,
  UpdateSocialAdvertisementInterestDto,
  SocialFindCriteriaAdvertisementInterestDto,
} from "../dto";
import { UserInterestEntity } from "@app/module/user/entity";

@Injectable()
export class SocialAdvertisementInterestService {
  constructor(
    @InjectRepository(SocialAdvertisementInterestEntity)
    private readonly repository: Repository<SocialAdvertisementInterestEntity>,
    private readonly userInterestsService: UserInterestService,
  ) {}

  async create(body: CreateSocialAdvertisementInterestDto): Promise<SocialAdvertisementInterestEntity> {
    const interest = this.repository.create(body);
    return await this.repository.save(interest);
  }

  async findAll(criteria: SocialFindCriteriaAdvertisementInterestDto, pagination?: PaginationOptionsDto): Promise<PaginatedResponseDto<SocialAdvertisementInterestEntity>> {
    
    const queryBuilder = this.repository.createQueryBuilder("advertisementInterest");
    
    queryBuilder.where("advertisementInterest.id != 0");
    
    if (criteria.interestType) {
      queryBuilder.andWhere("advertisementInterest.interestType = :interestType", { interestType: criteria.interestType });
    }
    if (criteria.interestId) {
      queryBuilder.andWhere("advertisementInterest.interestId = :interestId", { interestId: criteria.interestId });
    }
    if (criteria.advertisementId) {
      queryBuilder.andWhere("advertisementInterest.advertisementId = :advertisementId", { advertisementId: criteria.advertisementId });
    }
    
    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy('RANDOM()');
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy('advertisementInterest.createdAt', 'DESC');
          break;
        default:
          queryBuilder.addOrderBy('advertisementInterest.createdAt', 'DESC');
          break;
      }
    }
    
    const { page, limit } = pagination || { page: 1, limit: 10 };

    const skip = (page - 1) * limit;
    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page
      }
    };
  }

  async findOne(id: number): Promise<SocialAdvertisementInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });
    return interest;
  }

  async update(id: number, body: UpdateSocialAdvertisementInterestDto): Promise<SocialAdvertisementInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });

    Object.assign(interest, body);
    return await this.repository.save(interest);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
    return;
  }

  async getUserInterests(userId: number, pagination: InterestPaginationDto): Promise<UserInterestEntity[]> {
    const interests = await this.userInterestsService.findAll(userId, pagination.user);
    return interests.items;
  }

  async getAdvertisementsByUserInterests(userId: number, pagination: InterestPaginationDto): Promise<PaginatedResponseDto<SocialAdvertisementEntity>> {
    const userInterests = await this.getUserInterests(userId, pagination);

    const advertisements: SocialAdvertisementEntity[] = [];
    const advertisementIds: number[] = [];

    // Loop through user interests
    for (const userInterest of userInterests) {

      // And find advertisements with that interest
      const advertisementsInterests = await this.findAll(
        {
          interestId: userInterest.interestId,
          interestType: userInterest.interestType,
        },
        pagination.local
      );

      advertisementsInterests.items.forEach(interest => {
        if (!advertisementIds.includes(interest.advertisement.id)) {
          advertisementIds.push(interest.advertisement.id);
          advertisements.push(interest.advertisement);
        }
      });
    }

    return {
      items: advertisements,
      meta: {
        totalItems: advertisements.length,
        itemCount: advertisements.length,
        itemsPerPage: 99,
        totalPages: 1,
        currentPage: 1
      }
    };
  }
}
