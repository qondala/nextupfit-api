import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

import {
  FindOrderByEnum,
  PaginatedResponseDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import {
  UserInterestEntity,
} from "@app/module/user/entity";

import {
  ProgramChallengeInterestEntity,
  ProgramStepActivityWorkingsessionPracticeEntity,
} from "../entity";
import {
  CreateProgramChallengeInterestDto,
  UpdateProgramChallengeInterestDto,
  ProgramFindCriteriaChallengeInterestDto,
} from "../dto";


@Injectable()
export class ProgramChallengeInterestService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ProgramChallengeInterestEntity)
    private readonly repository: Repository<ProgramChallengeInterestEntity>,
  ) {}

  async create(body: CreateProgramChallengeInterestDto): Promise<ProgramChallengeInterestEntity> {
    const interest = this.repository.create(body);
    return await this.repository.save(interest);
  }

  async findAll(
    criteria: ProgramFindCriteriaChallengeInterestDto,
    pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<ProgramChallengeInterestEntity>> {
    const queryBuilder = this.repository.createQueryBuilder("programChallengeInterest");

    queryBuilder.where("programChallengeInterest.id != 0");

    if (criteria.interestType) {
      queryBuilder.andWhere("programChallengeInterest.interestType = :interestType", {
        interestType: criteria.interestType,
      });
    }
    if (criteria.interestId) {
      queryBuilder.andWhere("programChallengeInterest.interestId = :interestId", {
        interestId: criteria.interestId,
      });
    }
    if (criteria.workingSessionPracticeId) {
      queryBuilder.andWhere("programChallengeInterest.workingSessionPracticeId = :workingSessionPracticeId", {
        workingSessionPracticeId: criteria.workingSessionPracticeId,
      });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy("RANDOM()");
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy("programChallengeInterest.createdAt", "DESC");
          break;
        default:
          queryBuilder.addOrderBy("programChallengeInterest.createdAt", "DESC");
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

  async getChallengesByUserInterests(
    userId: number,
    pagination: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<ProgramStepActivityWorkingsessionPracticeEntity>> {
    const queryBuilder = this.dataSource
      .getRepository(ProgramStepActivityWorkingsessionPracticeEntity)
      .createQueryBuilder("practice")
      .leftJoinAndSelect("practice.workout", "workout")
      .leftJoinAndSelect("practice.nutrition", "nutrition")
      .innerJoin("practice.interests", "challengeInterest")
      .innerJoin(
        UserInterestEntity,
        "userInterest",
        "userInterest.interestType = challengeInterest.interestType AND userInterest.interestId = challengeInterest.interestId",
      )
      .where("practice.isPublicChallenge = true AND userInterest.userId = :userId", { userId });

    queryBuilder.orderBy("practice.createdAt", "DESC");

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

  async findOne(id: number): Promise<ProgramChallengeInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });
    return interest;
  }

  async update(
    id: number,
    body: UpdateProgramChallengeInterestDto,
  ): Promise<ProgramChallengeInterestEntity> {
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
}
