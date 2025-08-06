import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  CreateProgramStepActivityWorkingsessionDto,
  ProgramFindCriteriaWorkingsessionDto,
  ProgramFindOrderWorkingsessionEnum,
  UpdateProgramStepActivityWorkingsessionDto,
} from "../dto";
import { ProgramStepActivityWorkingsessionEntity } from "../entity";

@Injectable()
export class ProgramStepActivityWorkingsessionService {
  constructor(
    @InjectRepository(ProgramStepActivityWorkingsessionEntity)
    private readonly repository: Repository<ProgramStepActivityWorkingsessionEntity>,
  ) {}

  async create(
    body: CreateProgramStepActivityWorkingsessionDto,
  ): Promise<ProgramStepActivityWorkingsessionEntity> {
    const workingsession = this.repository.create(body);
    return await this.repository.save(workingsession);
  }

  async findAll(
    criteria: ProgramFindCriteriaWorkingsessionDto,
    pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<ProgramStepActivityWorkingsessionEntity>> {
    const query = this.repository.createQueryBuilder("workingsessionQuery");

    if (criteria.workingSessionId) {
      query.andWhere("workingsessionQuery.id = :workingSessionId", {
        workingSessionId: criteria.workingSessionId,
      });
    }

    if (criteria.baseWorkoutId) {
      query.andWhere("workingsessionQuery.baseWorkoutId = :baseWorkoutId", {
        baseWorkoutId: criteria.baseWorkoutId,
      });
    }

    if (criteria.search) {
      const searchSQL =
        "(workingsessionQuery.title ILIKE :search OR workingsessionQuery.description ILIKE :search)";
      query.andWhere(searchSQL, { search: `%${criteria.search}%` });
    }

    if (criteria.gymId) {
      query.andWhere("workingsessionQuery.gymId = :gymId", {
        gymId: criteria.gymId,
      });
    }

    if (criteria.programId) {
      query.andWhere("workingsessionQuery.programId = :programId", {
        programId: criteria.programId,
      });
    }

    if (criteria.programStepId) {
      query.andWhere("workingsessionQuery.programStepId = :programStepId", {
        programStepId: criteria.programStepId,
      });
    }

    if (criteria.programStepActivityId) {
      query.andWhere(
        "workingsessionQuery.programStepActivityId = :programStepActivityId",
        { programStepActivityId: criteria.programStepActivityId },
      );
    }

    if (criteria.ownerUserId) {
      query.andWhere("workingsessionQuery.ownerUserId = :ownerUserId", {
        ownerUserId: criteria.ownerUserId,
      });
    }

    if (criteria.ownerManagerId) {
      query.andWhere("workingsessionQuery.ownerManagerId = :ownerManagerId", {
        ownerManagerId: criteria.ownerManagerId,
      });
    }

    if (criteria.status) {
      query.andWhere("workingsessionQuery.status = :status", {
        status: criteria.status,
      });
    }

    if (criteria.attendeesCount) {
      query.andWhere("workingsessionQuery.attendeesCount = :attendeesCount", {
        attendeesCount: criteria.attendeesCount,
      });
    }

    if (criteria.viewsCount) {
      query.andWhere("workingsessionQuery.viewsCount = :viewsCount", {
        viewsCount: criteria.viewsCount,
      });
    }

    if (criteria.ratingsAvg) {
      query.andWhere("workingsessionQuery.ratingsAvg = :ratingsAvg", {
        ratingsAvg: criteria.ratingsAvg,
      });
    }

    if (criteria.ratingsCount) {
      query.andWhere("workingsessionQuery.ratingsCount = :ratingsCount", {
        ratingsCount: criteria.ratingsCount,
      });
    }

    if (criteria.difficultyLevel) {
      query.andWhere("workingsessionQuery.difficultyLevel = :difficultyLevel", {
        difficultyLevel: criteria.difficultyLevel,
      });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case ProgramFindOrderWorkingsessionEnum.title:
          query.addOrderBy("workingsessionQuery.title", "ASC");
          break;
        case ProgramFindOrderWorkingsessionEnum.gym:
          query.addOrderBy("workingsessionQuery.gym", "ASC");
          break;
        case ProgramFindOrderWorkingsessionEnum.program:
          query.addOrderBy("workingsessionQuery.program", "ASC");
          break;
        case ProgramFindOrderWorkingsessionEnum.programStep:
          query.addOrderBy("workingsessionQuery.programStep", "ASC");
          break;
        case ProgramFindOrderWorkingsessionEnum.activity:
          query.addOrderBy("workingsessionQuery.activity", "ASC");
          break;
        case ProgramFindOrderWorkingsessionEnum.owner:
          query.addOrderBy("workingsessionQuery.owner", "ASC");
          break;
        case ProgramFindOrderWorkingsessionEnum.status:
          query.addOrderBy("workingsessionQuery.status", "DESC");
          break;
        case ProgramFindOrderWorkingsessionEnum.attendeesCount:
          query.addOrderBy("workingsessionQuery.attendeesCount", "DESC");
          break;
        case ProgramFindOrderWorkingsessionEnum.viewsCount:
          query.addOrderBy("workingsessionQuery.viewsCount", "DESC");
          break;
        case ProgramFindOrderWorkingsessionEnum.ratingsAvg:
          query.addOrderBy("workingsessionQuery.ratingsAvg", "DESC");
          break;
        case ProgramFindOrderWorkingsessionEnum.ratingsCount:
          query.addOrderBy("workingsessionQuery.ratingsCount", "DESC");
          break;
        case ProgramFindOrderWorkingsessionEnum.difficultyLevel:
          query.addOrderBy("workingsessionQuery.difficultyLevel", "ASC");
          break;
        case ProgramFindOrderWorkingsessionEnum.position:
          query.addOrderBy("workingsessionQuery.position", "ASC");
          break;
        case ProgramFindOrderWorkingsessionEnum.date:
          query.addOrderBy("workingsessionQuery.date", "ASC");
          break;
        case ProgramFindOrderWorkingsessionEnum.random:
          query.addOrderBy("RANDOM()");
          break;
      }
    } else {
      query.addOrderBy("workingsessionQuery.createdAt", "DESC");
      query.addOrderBy("workingsessionQuery.position", "ASC");
    }

    const { page, limit } = pagination || { page: 1, limit: 10 };
    const skip = (page - 1) * limit;
    const [items, totalItems] = await query
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
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<ProgramStepActivityWorkingsessionEntity> {
    const workingsession = await this.repository.findOne({ where: { id } });
    return workingsession;
  }

  async findFirst(
    programStepActivityId: number,
  ): Promise<ProgramStepActivityWorkingsessionEntity> {
    const workingsession = await this.repository.findOne({
      where: { programStepActivityId },
      order: { position: "ASC" },
    });
    return workingsession;
  }

  async findPrevious(
    workingsessionId: number,
  ): Promise<ProgramStepActivityWorkingsessionEntity> {
    const workingsession = await this.findOne(workingsessionId);
    const previousWorkingsession = await this.repository.findOne({
      where: {
        programStepActivityId: workingsession.programStepActivityId,
        position: LessThan(workingsession.position),
      },
      order: { position: "DESC" },
    });
    return previousWorkingsession;
  }

  async findLast(
    programStepActivityId: number,
  ): Promise<ProgramStepActivityWorkingsessionEntity> {
    const workingsession = await this.repository.findOne({
      where: { programStepActivityId },
      order: { position: "DESC" },
    });
    return workingsession;
  }

  async update(
    id: number,
    body: UpdateProgramStepActivityWorkingsessionDto,
  ): Promise<ProgramStepActivityWorkingsessionEntity> {
    const workingsession = await this.findOne(id);
    Object.assign(workingsession, body);
    return await this.repository.save(workingsession);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
