import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

import {
  FindOrderByEnum,
  PaginatedResponseDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import { UserInterestEntity } from "@app/module/user/entity";

import { GymManagerEntity, GymManagerInterestEntity } from "../entity";

import {
  CreateGymManagerInterestDto,
  UpdateGymManagerInterestDto,
  GymFindCriteriaManagerInterestDto,
  GymFindOrderManagerInterestEnum,
} from "../dto";

@Injectable()
export class GymManagerInterestService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(GymManagerInterestEntity)
    private readonly repository: Repository<GymManagerInterestEntity>,
  ) {}

  async create(
    body: CreateGymManagerInterestDto,
  ): Promise<GymManagerInterestEntity> {
    const interest = this.repository.create(body);
    return await this.repository.save(interest);
  }

  async findAll(
    criteria: GymFindCriteriaManagerInterestDto,
    pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymManagerInterestEntity>> {
    const queryBuilder =
      this.repository.createQueryBuilder("gymManagerInterest");

    queryBuilder.where("gymManagerInterest.id != 0");

    if (criteria.interestType) {
      queryBuilder.andWhere("gymManagerInterest.interestType = :interestType", {
        interestType: criteria.interestType,
      });
    }
    if (criteria.interestId) {
      queryBuilder.andWhere("gymManagerInterest.interestId = :interestId", {
        interestId: criteria.interestId,
      });
    }
    if (criteria.managerId) {
      queryBuilder.andWhere("gymManagerInterest.managerId = :managerId", {
        managerId: criteria.managerId,
      });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy("RANDOM()");
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy("gymManagerInterest.createdAt", "DESC");
          break;
        default:
          queryBuilder.addOrderBy("gymManagerInterest.createdAt", "DESC");
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

  async findOne(id: number): Promise<GymManagerInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });
    return interest;
  }

  async update(
    id: number,
    body: UpdateGymManagerInterestDto,
  ): Promise<GymManagerInterestEntity> {
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

  async getUserInteredtedManagers(
    userId: number,
    pagination: PaginationOptionsDto,
    order: GymFindOrderManagerInterestEnum,
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const queryBuilder = this.dataSource
      .getRepository(GymManagerEntity)
      .createQueryBuilder("gymManager")
      .leftJoinAndSelect("gymManager.user", "user")
      .leftJoinAndSelect("gymManager.interests", "interests")
      .innerJoin(
        UserInterestEntity,
        "userInterest",
        "userInterest.interestType = interests.interestType AND userInterest.interestId = interests.interestId",
      )
      .where("userInterest.userId = :userId", { userId });

    switch (order) {
      case GymFindOrderManagerInterestEnum.date:
        queryBuilder.addOrderBy("gymManager.createdAt", "DESC");
        break;
      case GymFindOrderManagerInterestEnum.name:
        queryBuilder.addOrderBy("gymManager.name", "ASC");
        break;
      case GymFindOrderManagerInterestEnum.viewsCount:
        queryBuilder.addOrderBy("gymManager.viewsCount", "ASC");
        break;
      case GymFindOrderManagerInterestEnum.ratingsAvg:
        queryBuilder.addOrderBy("gymManager.ratingsAvg", "DESC");
        break;
      case GymFindOrderManagerInterestEnum.followersCount:
        queryBuilder.addOrderBy("gymManager.followersCount", "ASC");
        break;
      case GymFindOrderManagerInterestEnum.level:
        queryBuilder.addOrderBy("gymManager.level", "DESC");
        break;
      case GymFindOrderManagerInterestEnum.speciality:
        queryBuilder.addOrderBy("gymManager.speciality", "DESC");
        break;
      case GymFindOrderManagerInterestEnum.age:
        queryBuilder.addOrderBy("gymManager.age", "DESC");
        break;
      case GymFindOrderManagerInterestEnum.gender:
        queryBuilder.addOrderBy("gymManager.gender", "DESC");
        break;
      case GymFindOrderManagerInterestEnum.yearsOfExperience:
        queryBuilder.addOrderBy("gymManager.yearsOfExperience", "DESC");
        break;
      case GymFindOrderManagerInterestEnum.certified:
        queryBuilder.addOrderBy("gymManager.certified", "DESC");
        break;
      case GymFindOrderManagerInterestEnum.verified:
        queryBuilder.addOrderBy("gymManager.verified", "DESC");
        break;
      case GymFindOrderManagerInterestEnum.random:
        queryBuilder.addOrderBy("RANDOM()");
        break;
    }

    console.log("Gym Manager interest service - Pagination: ", pagination);

    const skip = (pagination.page - 1) * pagination.limit;
    console.log("Gym Manager interest service - Skip: ", skip);

    const [items, totalItems] = await queryBuilder
      .skip(skip || 0)
      .take(pagination.limit || 10)
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
