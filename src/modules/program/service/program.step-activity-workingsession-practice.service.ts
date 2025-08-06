import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";
import { ProgramStepActivityWorkingsessionPracticeEntity } from "../entity";
import {
  CreateProgramStepActivityWorkingsessionPracticeDto,
  UpdateProgramStepActivityWorkingsessionPracticeDto,
  DetailsProgramStepActivityWorkingsessionPracticeDto,
  ProgramFindCriteriaPracticeDto,
  ProgramFindOrderPracticeEnum,
} from "../dto";

@Injectable()
export class ProgramStepActivityWorkingsessionPracticeService {
  constructor(
    @InjectRepository(ProgramStepActivityWorkingsessionPracticeEntity)
    private readonly repository: Repository<ProgramStepActivityWorkingsessionPracticeEntity>,
  ) {}

  async create(
    createDto: CreateProgramStepActivityWorkingsessionPracticeDto,
  ): Promise<DetailsProgramStepActivityWorkingsessionPracticeDto> {
    const practice = this.repository.create(createDto);
    const savedPractice = await this.repository.save(practice);
    return savedPractice;
  }

  async findAll(
    criteria: ProgramFindCriteriaPracticeDto,
    pagination: PaginationOptionsDto,
  ): Promise<
    PaginatedResponseDto<ProgramStepActivityWorkingsessionPracticeEntity>
  > {
    const queryBuilder = this.repository.createQueryBuilder(
      "programPracticeQuery",
    );

    queryBuilder.where("programPracticeQuery.id != 0");

    if (criteria.gymId) {
      queryBuilder.andWhere("programPracticeQuery.gymId = :gymId", {
        gymId: criteria.gymId,
      });
    }
    if (criteria.ownerManagerId) {
      queryBuilder.andWhere(
        "programPracticeQuery.ownerManagerId = :ownerManagerId",
        { ownerManagerId: criteria.ownerManagerId },
      );
    }
    if (criteria.programStepActivityId) {
      queryBuilder.andWhere(
        "programPracticeQuery.programStepActivityId = :programStepActivityId",
        { programStepActivityId: criteria.programStepActivityId },
      );
    }
    if (criteria.programStepId) {
      queryBuilder.andWhere(
        "programPracticeQuery.programStepId = :programStepId",
        { programStepId: criteria.programStepId },
      );
    }
    if (criteria.programNutritionId) {
      queryBuilder.andWhere(
        "programPracticeQuery.programNutritionId = :programNutritionId",
        { programNutritionId: criteria.programNutritionId },
      );
    }
    if (criteria.programWorkoutId) {
      queryBuilder.andWhere(
        "programPracticeQuery.programWorkoutId = :programWorkoutId",
        { programWorkoutId: criteria.programWorkoutId },
      );
    }
    if (criteria.workingSessionId) {
      queryBuilder.andWhere(
        "programPracticeQuery.workingSessionId = :workingSessionId",
        { workingSessionId: criteria.workingSessionId },
      );
    }
    if (criteria.ownerUserId) {
      queryBuilder.andWhere("programPracticeQuery.ownerUserId = :ownerUserId", {
        ownerUserId: criteria.ownerUserId,
      });
    }
    if (criteria.ownerManagerId) {
      queryBuilder.andWhere(
        "programPracticeQuery.ownerManagerId = :ownerManagerId",
        { ownerManagerId: criteria.ownerManagerId },
      );
    }
    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case ProgramFindOrderPracticeEnum.random:
          queryBuilder.addOrderBy("RANDOM()");
          break;
        case ProgramFindOrderPracticeEnum.date:
          queryBuilder.addOrderBy("programPracticeQuery.createdAt", "DESC");
          break;
        case ProgramFindOrderPracticeEnum.title:
          queryBuilder.addOrderBy("programPracticeQuery.title", "ASC");
          break;
        case ProgramFindOrderPracticeEnum.gym:
          queryBuilder.addOrderBy("programPracticeQuery.gymId", "ASC");
          break;
        case ProgramFindOrderPracticeEnum.program:
          queryBuilder.addOrderBy("programPracticeQuery.programId", "ASC");
          break;
        case ProgramFindOrderPracticeEnum.programStep:
          queryBuilder.addOrderBy("programPracticeQuery.programStepId", "ASC");
          break;
        case ProgramFindOrderPracticeEnum.activity:
          queryBuilder.addOrderBy(
            "programPracticeQuery.programStepActivityId",
            "ASC",
          );
          break;
        case ProgramFindOrderPracticeEnum.owner:
          queryBuilder.addOrderBy("programPracticeQuery.ownerUserId", "ASC");
          break;
        default:
          queryBuilder.addOrderBy("programPracticeQuery.createdAt", "DESC");
          break;
      }
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
        currentPage: page,
      },
    };
  }

  findOne(
    id: number,
  ): Promise<DetailsProgramStepActivityWorkingsessionPracticeDto> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateDto: UpdateProgramStepActivityWorkingsessionPracticeDto,
  ): Promise<DetailsProgramStepActivityWorkingsessionPracticeDto> {
    const practice = await this.repository.findOne({
      where: { id },
    });

    Object.assign(practice, updateDto);
    const updatedPractice = await this.repository.save(practice);
    return updatedPractice;
  }

  async remove(id: number): Promise<void> {
    const practice = await this.repository.findOne({
      where: { id },
    });
    await this.repository.remove(practice);
  }
}
