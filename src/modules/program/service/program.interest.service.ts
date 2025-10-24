import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

import {
  FindOrderByEnum,
  PaginatedResponseDto,
  PaginationOptionsDto,
} from "@app/common/dto";
import { UserInterestEntity } from "@app/module/user/entity";

import { ProgramEntity, ProgramInterestEntity } from "../entity";
import {
  CreateProgramInterestDto,
  UpdateProgramInterestDto,
  ProgramFindCriteriaInterestDto,
  ProgramFindOrderInterestEnum,
} from "../dto";

@Injectable()
export class ProgramInterestService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ProgramInterestEntity)
    private readonly repository: Repository<ProgramInterestEntity>,
  ) {}

  async create(body: CreateProgramInterestDto): Promise<ProgramInterestEntity> {
    const interest = this.repository.create(body);
    return await this.repository.save(interest);
  }

  async findAll(
    criteria: ProgramFindCriteriaInterestDto,
    pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<ProgramInterestEntity>> {
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

  async findOne(id: number): Promise<ProgramInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });
    return interest;
  }

  async update(
    id: number,
    body: UpdateProgramInterestDto,
  ): Promise<ProgramInterestEntity> {
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

  async getUserInterestedPrograms(
    userId: number,
    pagination: PaginationOptionsDto,
    order: ProgramFindOrderInterestEnum,
  ): Promise<PaginatedResponseDto<ProgramEntity>> {
    const queryBuilder = this.dataSource
      .getRepository(ProgramEntity)
      .createQueryBuilder("program")
      .leftJoinAndSelect("program.gym", "gym")
      .innerJoin("program.interests", "programInterest")
      .innerJoin(
        UserInterestEntity,
        "userInterest",
        "userInterest.interestType = programInterest.interestType AND userInterest.interestId = programInterest.interestId",
      )
      .where("userInterest.userId = :userId", { userId });

    switch (order) {
      case ProgramFindOrderInterestEnum.date:
        queryBuilder.addOrderBy("program.createdAt", "DESC");
        break;
      case ProgramFindOrderInterestEnum.name:
        queryBuilder.addOrderBy("program.name", "ASC");
        break;
      case ProgramFindOrderInterestEnum.attendeesCount:
        queryBuilder.addOrderBy("program.attendeesCount", "ASC");
        break;
      case ProgramFindOrderInterestEnum.viewsCount:
        queryBuilder.addOrderBy("program.viewsCount", "ASC");
        break;
      case ProgramFindOrderInterestEnum.ratingsAvg:
        queryBuilder.addOrderBy("program.ratingsAvg", "DESC");
        break;
      case ProgramFindOrderInterestEnum.ratingsCount:
        queryBuilder.addOrderBy("program.ratingsCount", "ASC");
        break;
      case ProgramFindOrderInterestEnum.random:
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
