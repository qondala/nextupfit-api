import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

import {
  FindOrderByEnum,
  PaginatedResponseDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import { UserInterestEntity } from "@app/module/user/entity";

import {
  SocialAdvertisementEntity,
  SocialAdvertisementInterestEntity,
} from "../entity";
import {
  CreateSocialAdvertisementInterestDto,
  UpdateSocialAdvertisementInterestDto,
  SocialFindCriteriaAdvertisementInterestDto,
} from "../dto";

@Injectable()
export class SocialAdvertisementInterestService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(SocialAdvertisementInterestEntity)
    private readonly repository: Repository<SocialAdvertisementInterestEntity>,
  ) {}

  async create(
    body: CreateSocialAdvertisementInterestDto,
  ): Promise<SocialAdvertisementInterestEntity> {
    const interest = this.repository.create(body);
    return await this.repository.save(interest);
  }

  async findAll(
    criteria: SocialFindCriteriaAdvertisementInterestDto,
    pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialAdvertisementInterestEntity>> {
    const queryBuilder = this.repository.createQueryBuilder(
      "advertisementInterest",
    );

    queryBuilder.where("advertisementInterest.id != 0");

    if (criteria.interestType) {
      queryBuilder.andWhere(
        "advertisementInterest.interestType = :interestType",
        { interestType: criteria.interestType },
      );
    }
    if (criteria.interestId) {
      queryBuilder.andWhere("advertisementInterest.interestId = :interestId", {
        interestId: criteria.interestId,
      });
    }
    if (criteria.advertisementId) {
      queryBuilder.andWhere(
        "advertisementInterest.advertisementId = :advertisementId",
        { advertisementId: criteria.advertisementId },
      );
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy("RANDOM()");
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy("advertisementInterest.createdAt", "DESC");
          break;
        default:
          queryBuilder.addOrderBy("advertisementInterest.createdAt", "DESC");
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
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<SocialAdvertisementInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });
    return interest;
  }

  async update(
    id: number,
    body: UpdateSocialAdvertisementInterestDto,
  ): Promise<SocialAdvertisementInterestEntity> {
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

  async findUserInterestedAdvertisements(
    userId: number,
    pagination: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialAdvertisementEntity>> {
    const queryBuilder = this.dataSource
      .getRepository(SocialAdvertisementEntity)
      .createQueryBuilder("advertisement")
      .leftJoinAndSelect("advertisement.content", "content")
      .innerJoin("advertisement.interests", "advertisementInterest")
      .innerJoin(
        UserInterestEntity,
        "userInterest",
        "userInterest.interestType = advertisementInterest.interestType AND userInterest.interestId = advertisementInterest.interestId",
      )
      .where("userInterest.userId = :userId", { userId });

    queryBuilder.addOrderBy("advertisement.createdAt", "DESC");
    queryBuilder.addOrderBy("RANDOM()");

    const skip = (pagination.page - 1) * pagination.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(pagination.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / pagination.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages,
        currentPage: pagination.page,
      },
    };
  }
}
