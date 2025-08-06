import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

import {
  FindOrderByEnum,
  PaginatedResponseDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import { UserInterestEntity } from "@app/module/user/entity";

import { GymEntity, GymInterestEntity } from "../entity";
import {
  CreateGymInterestDto,
  UpdateGymInterestDto,
  GymFindCriteriaInterestDto,
  GymFindOrderFreetoolEnum,
} from "../dto";

@Injectable()
export class GymInterestService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(GymInterestEntity)
    private readonly repository: Repository<GymInterestEntity>,
  ) {}

  async create(body: CreateGymInterestDto): Promise<GymInterestEntity> {
    const interest = this.repository.create(body);
    return await this.repository.save(interest);
  }

  async findAll(
    criteria: GymFindCriteriaInterestDto,
    pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymInterestEntity>> {
    const queryBuilder = this.repository.createQueryBuilder("gymInterest");

    queryBuilder.where("gymInterest.id != 0");

    if (criteria.interestType) {
      queryBuilder.andWhere("gymInterest.interestType = :interestType", {
        interestType: criteria.interestType,
      });
    }
    if (criteria.interestId) {
      queryBuilder.andWhere("gymInterest.interestId = :interestId", {
        interestId: criteria.interestId,
      });
    }
    if (criteria.gymId) {
      queryBuilder.andWhere("gymInterest.gymId = :gymId", {
        gymId: criteria.gymId,
      });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy("RANDOM()");
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy("gymInterest.createdAt", "DESC");
          break;
        default:
          queryBuilder.addOrderBy("gymInterest.createdAt", "DESC");
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

  async findOne(id: number): Promise<GymInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });
    return interest;
  }

  async update(
    id: number,
    body: UpdateGymInterestDto,
  ): Promise<GymInterestEntity> {
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

  async getUserInterestedGyms(
    userId: number,
    pagination: PaginationOptionsDto,
    order: GymFindOrderFreetoolEnum,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = await this.dataSource
      .getRepository(GymEntity)
      .createQueryBuilder("gym")
      .leftJoinAndSelect("gym.manager", "manager")
      .leftJoinAndSelect("gym.location", "location")
      .innerJoin("gym.interests", "gymInterest")
      .innerJoin(
        UserInterestEntity,
        "userInterest",
        "userInterest.interestType = gymInterest.interestType AND userInterest.interestId = gymInterest.interestId",
      )
      .where("userInterest.userId = :userId", { userId });

    switch (order) {
      case GymFindOrderFreetoolEnum.date:
        queryBuilder.addOrderBy("gym.createdAt", "DESC");
        break;
      case GymFindOrderFreetoolEnum.name:
        queryBuilder.addOrderBy("gym.name", "ASC");
        break;
      case GymFindOrderFreetoolEnum.viewsCount:
        queryBuilder.addOrderBy("gym.viewsCount", "ASC");
        break;
      case GymFindOrderFreetoolEnum.ratingsAvg:
        queryBuilder.addOrderBy("gym.ratingsAvg", "DESC");
        break;
      case GymFindOrderFreetoolEnum.membersCount:
        queryBuilder.addOrderBy("gym.membersCount", "ASC");
        break;
      case GymFindOrderFreetoolEnum.followersCount:
        queryBuilder.addOrderBy("gym.followersCount", "ASC");
        break;
      case GymFindOrderFreetoolEnum.random:
        queryBuilder.addOrderBy("RANDOM()");
        break;
    }

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
