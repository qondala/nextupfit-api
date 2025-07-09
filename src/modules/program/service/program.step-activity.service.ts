import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  PaginatedResponseDto,
  PaginationOptionsDto
} from "@app/common/dto";

import { ProgramStepActivityEntity } from "../entity";
import {
  CreateProgramStepActivityDto,
  ProgramFindOrderActivityEnum,
  UpdateProgramStepActivityDto,
  ProgramFindCriteriaActivityDto
} from "../dto";


@Injectable()
export class ProgramStepActivityService {
  constructor(
    @InjectRepository(ProgramStepActivityEntity)
    private readonly service: Repository<ProgramStepActivityEntity>
  ) {}

  async create(body: CreateProgramStepActivityDto): Promise<ProgramStepActivityEntity> {
    const activity = this.service.create(body);
    return await this.service.save(activity);
  }

  async findAll(
    criteria: ProgramFindCriteriaActivityDto,
    pagination?: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramStepActivityEntity>> {

    const queryBuilder = this.service.createQueryBuilder("activityQuery");

    queryBuilder.where("activityQuery.id != 0");

    if (criteria.search) {
      queryBuilder.andWhere("activityQuery.name ILIKE :search", { search: `%${criteria.search}%` });
    }
    if (criteria.gymId) {
      queryBuilder.andWhere("activityQuery.gymId = :gymId", { gymId: criteria.gymId });
    }
    if (criteria.programId) {
      queryBuilder.andWhere("activityQuery.programId = :programId", { programId: criteria.programId });
    }
    if (criteria.programStepId) {
      queryBuilder.andWhere("activityQuery.programStepId = :programStepId", { programStepId: criteria.programStepId });
    }
    if (criteria.ownerUserId) {
      queryBuilder.andWhere("activityQuery.ownerUserId = :ownerUserId", { ownerUserId: criteria.ownerUserId });
    }
    if (criteria.ownerManagerId) {
      queryBuilder.andWhere("activityQuery.ownerManagerId = :ownerManagerId", { ownerManagerId: criteria.ownerManagerId });
    }
    if (criteria.status) {
      queryBuilder.andWhere("activityQuery.status = :status", { status: criteria.status });
    }
    if (criteria.attendeesCount) {
      queryBuilder.andWhere("activityQuery.attendeesCount = :attendeesCount", { attendeesCount: criteria.attendeesCount });
    }
    if (criteria.viewsCount) {
      queryBuilder.andWhere("activityQuery.viewsCount = :viewsCount", { viewsCount: criteria.viewsCount });
    }
    if (criteria.ratingsAvg) {
      queryBuilder.andWhere("activityQuery.ratingsAvg = :ratingsAvg", { ratingsAvg: criteria.ratingsAvg });
    }
    if (criteria.ratingsCount) {
      queryBuilder.andWhere("activityQuery.ratingsCount = :ratingsCount", { ratingsCount: criteria.ratingsCount });
    }
    if (criteria.difficultyLevel) {
      queryBuilder.andWhere("activityQuery.difficultyLevel = :difficultyLevel", { difficultyLevel: criteria.difficultyLevel });
    }
    if (criteria.isFreeTool) {
      queryBuilder.andWhere("activityQuery.isFreeTool = :isFreeTool", { isFreeTool: criteria.isFreeTool });
    }
    if (criteria.priceHigherThan) {
      queryBuilder.andWhere("activityQuery.price >= :priceHigherThan", { priceHigherThan: criteria.priceHigherThan });
    }
    if (criteria.priceLowerThan) {
      queryBuilder.andWhere("activityQuery.price <= :priceLowerThan", { priceLowerThan: criteria.priceLowerThan });
    }
    if (criteria.isChallenge) {
      queryBuilder.andWhere("activityQuery.isChallenge = :isChallenge", { isChallenge: criteria.isChallenge });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case ProgramFindOrderActivityEnum.date:
          queryBuilder.orderBy("activityQuery.createdAt", "DESC");
          break;
        case ProgramFindOrderActivityEnum.name:
          queryBuilder.orderBy("activityQuery.name", "ASC");
          break;
        case ProgramFindOrderActivityEnum.price:
          queryBuilder.orderBy("activityQuery.price", "DESC");
          break;
        case ProgramFindOrderActivityEnum.attendeesCount:
          queryBuilder.orderBy("activityQuery.attendeesCount", "ASC");
          break;
        case ProgramFindOrderActivityEnum.viewsCount:
          queryBuilder.orderBy("activityQuery.viewsCount", "ASC");
          break;
        case ProgramFindOrderActivityEnum.ratingsAvg:
          queryBuilder.orderBy("activityQuery.ratingsAvg", "DESC");
          break;
        case ProgramFindOrderActivityEnum.gym:
          queryBuilder.orderBy("activityQuery.gymId", "ASC");
          break;
        case ProgramFindOrderActivityEnum.program:
          queryBuilder.orderBy("activityQuery.programId", "ASC");
          break;
        case ProgramFindOrderActivityEnum.programStep:
          queryBuilder.orderBy("activityQuery.programStepId", "ASC");
          break;
        case ProgramFindOrderActivityEnum.owner:
          queryBuilder.orderBy("activityQuery.ownerUserId", "ASC");
          break;
        case ProgramFindOrderActivityEnum.status:
          queryBuilder.orderBy("activityQuery.status", "ASC");
          break;
        case ProgramFindOrderActivityEnum.difficultyLevel:
          queryBuilder.orderBy("activityQuery.difficultyLevel", "DESC");
          break;
        case ProgramFindOrderActivityEnum.random:
          queryBuilder.orderBy("RANDOM()");
          break;
      }
    }
    else {
      queryBuilder.addOrderBy("activityQuery.createdAt", "DESC");
      queryBuilder.addOrderBy("activityQuery.position", "ASC");
    }

    const { page, limit } = pagination || { page: 1, limit: 10 };
    const skip = (page - 1) * limit;

    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page
      }
    };
  }

  async findOne(id: number): Promise<ProgramStepActivityEntity> {
    const activity = await this.service.findOne({ where: { id } });
    return activity;
  }

  async update(id: number, body: UpdateProgramStepActivityDto): Promise<ProgramStepActivityEntity> {
    const activity = await this.findOne(id);
    Object.assign(activity, body);
    return await this.service.save(activity);
  }

  async remove(id: number): Promise<void> {
    const activity = await this.findOne(id);
    await this.service.remove(activity);
  }

}

