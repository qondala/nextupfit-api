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
  ProgramFreetoolEntity,
  ProgramFreetoolInterestEntity,
} from "../entity";
import {
  CreateProgramFreetoolInterestDto,
  UpdateProgramFreetoolInterestDto,
  ProgramFindCriteriaInterestDto,
  ProgramFindOrderFreetoolEnum,
} from "../dto";

@Injectable()
export class ProgramFreetoolInterestService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ProgramFreetoolInterestEntity)
    private readonly repository: Repository<ProgramFreetoolInterestEntity>,
  ) {}

  async create(
    body: CreateProgramFreetoolInterestDto,
  ): Promise<ProgramFreetoolInterestEntity> {
    const interest = this.repository.create(body);
    return await this.repository.save(interest);
  }

  async findAll(
    criteria: ProgramFindCriteriaInterestDto,
    pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<ProgramFreetoolInterestEntity>> {
    const queryBuilder = this.repository.createQueryBuilder("programInterest");

    queryBuilder.where("programInterest.id != 0");

    if (criteria.interestType) {
      queryBuilder.andWhere("programInterest.interestType = :interestType", {
        interestType: criteria.interestType,
      });
    }
    if (criteria.interestId) {
      queryBuilder.andWhere("programInterest.interestId = :interestId", {
        interestId: criteria.interestId,
      });
    }
    if (criteria.programId) {
      queryBuilder.andWhere("programInterest.programId = :programId", {
        programId: criteria.programId,
      });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy("RANDOM()");
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy("programInterest.createdAt", "DESC");
          break;
        default:
          queryBuilder.addOrderBy("programInterest.createdAt", "DESC");
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

  async findOne(id: number): Promise<ProgramFreetoolInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });
    return interest;
  }

  async update(
    id: number,
    body: UpdateProgramFreetoolInterestDto,
  ): Promise<ProgramFreetoolInterestEntity> {
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

  async getFreetoolsByUserInterests(
    userId: number,
    pagination: PaginationOptionsDto,
    order: ProgramFindOrderFreetoolEnum,
  ): Promise<PaginatedResponseDto<ProgramFreetoolEntity>> {
    const queryBuilder = this.dataSource
      .getRepository(ProgramFreetoolEntity)
      .createQueryBuilder("freetool")
      .leftJoinAndSelect("freetool.gym", "gym")
      .leftJoinAndSelect("freetool.manager", "manager")
      .leftJoinAndSelect("freetool.activity", "activity")
      .innerJoin("freetool.interests", "freetoolInterest")
      .innerJoin(
        UserInterestEntity,
        "userInterest",
        "userInterest.interestType = freetoolInterest.interestType AND userInterest.interestId = freetoolInterest.interestId",
      )
      .where("userInterest.userId = :userId", { userId });

    switch (order) {
      case ProgramFindOrderFreetoolEnum.date:
        queryBuilder.addOrderBy("activity.createdAt", "DESC");
        break;
      case ProgramFindOrderFreetoolEnum.name:
        queryBuilder.addOrderBy("activity.name", "ASC");
        break;
      case ProgramFindOrderFreetoolEnum.price:
        queryBuilder.addOrderBy("activity.price", "DESC");
        break;
      case ProgramFindOrderFreetoolEnum.attendeesCount:
        queryBuilder.addOrderBy("activity.attendeesCount", "ASC");
        break;
      case ProgramFindOrderFreetoolEnum.viewsCount:
        queryBuilder.addOrderBy("activity.viewsCount", "ASC");
        break;
      case ProgramFindOrderFreetoolEnum.ratingsAvg:
        queryBuilder.addOrderBy("activity.ratingsAvg", "DESC");
        break;
      case ProgramFindOrderFreetoolEnum.gym:
        queryBuilder.addOrderBy("activity.gymId", "ASC");
        break;
      case ProgramFindOrderFreetoolEnum.owner:
        queryBuilder.addOrderBy("activity.ownerManagerId", "ASC");
        break;
      case ProgramFindOrderFreetoolEnum.status:
        queryBuilder.addOrderBy("activity.status", "ASC");
        break;
      case ProgramFindOrderFreetoolEnum.difficultyLevel:
        queryBuilder.addOrderBy("activity.difficultyLevel", "DESC");
        break;
      case ProgramFindOrderFreetoolEnum.random:
        queryBuilder.addOrderBy("RANDOM()");
        break;
    }

    const { page, limit } = pagination;

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
}
