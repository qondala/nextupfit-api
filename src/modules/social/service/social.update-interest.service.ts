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
  SocialUpdateEntity,
  SocialUpdateInterestEntity,
} from "../entity";
import {
  CreateSocialUpdateInterestDto,
  UpdateSocialUpdateInterestDto,
  SocialFindCriteriaUpdateInterestDto,
} from "../dto";

@Injectable()
export class SocialUpdateInterestService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(SocialUpdateInterestEntity)
    private readonly repository: Repository<SocialUpdateInterestEntity>,
  ) {}

  async create(
    body: CreateSocialUpdateInterestDto,
  ): Promise<SocialUpdateInterestEntity> {
    const interest = this.repository.create(body);
    return await this.repository.save(interest);
  }

  async findAll(
    criteria: SocialFindCriteriaUpdateInterestDto,
    pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialUpdateInterestEntity>> {
    const queryBuilder = this.repository.createQueryBuilder(
      "updateInterest",
    );

    queryBuilder.where("updateInterest.id != 0");

    if (criteria.interestType) {
      queryBuilder.andWhere(
        "updateInterest.interestType = :interestType",
        { interestType: criteria.interestType },
      );
    }
    if (criteria.interestId) {
      queryBuilder.andWhere("updateInterest.interestId = :interestId", {
        interestId: criteria.interestId,
      });
    }
    if (criteria.updateId) {
      queryBuilder.andWhere(
        "updateInterest.updateId = :updateId",
        { updateId: criteria.updateId },
      );
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy("RANDOM()");
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy("updateInterest.createdAt", "DESC");
          break;
        default:
          queryBuilder.addOrderBy("updateInterest.createdAt", "DESC");
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

  async findOne(id: number): Promise<SocialUpdateInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });
    return interest;
  }

  async update(
    id: number,
    body: UpdateSocialUpdateInterestDto,
  ): Promise<SocialUpdateInterestEntity> {
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

  async findUserInterestedUpdates(
    userId: number,
    pagination: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialUpdateEntity>> {
    const queryBuilder = this.dataSource
      .getRepository(SocialUpdateEntity)
      .createQueryBuilder("update")
      .leftJoinAndSelect("update.content", "content")
      .innerJoin("update.interests", "updateInterest")
      .innerJoin(
        UserInterestEntity,
        "userInterest",
        "userInterest.interestType = updateInterest.interestType AND userInterest.interestId = updateInterest.interestId",
      )
      .where("userInterest.userId = :userId", { userId });

    queryBuilder.addOrderBy("update.createdAt", "DESC");
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
