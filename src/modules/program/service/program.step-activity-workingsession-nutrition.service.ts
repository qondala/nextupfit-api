import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";
import { ProgramStepActivityWorkingsessionNutritionEntity } from "../entity";
import {
  CreateProgramStepActivityWorkingsessionNutritionDto,
  UpdateProgramStepActivityWorkingsessionNutritionDto,
  DetailsProgramStepActivityWorkingsessionNutritionDto,
  ProgramFindCriteriaNutritionDto,
  ProgramFindOrderNutritionEnum,
} from "../dto";

@Injectable()
export class ProgramStepActivityWorkingsessionNutritionService {
  constructor(
    @InjectRepository(ProgramStepActivityWorkingsessionNutritionEntity)
    private readonly repository: Repository<ProgramStepActivityWorkingsessionNutritionEntity>,
  ) {}

  async create(
    createDto: CreateProgramStepActivityWorkingsessionNutritionDto,
  ): Promise<DetailsProgramStepActivityWorkingsessionNutritionDto> {
    const nutrition = this.repository.create(createDto);
    const savedNutrition = await this.repository.save(nutrition);
    return savedNutrition;
  }

  async findAll(
    criteria: ProgramFindCriteriaNutritionDto,
    pagination?: PaginationOptionsDto,
  ): Promise<
    PaginatedResponseDto<ProgramStepActivityWorkingsessionNutritionEntity>
  > {
    const queryBuilder = this.repository.createQueryBuilder(
      "programNutritionQuery",
    );

    queryBuilder.where("programNutritionQuery.id != 0");

    if (criteria.title) {
      queryBuilder.andWhere(
        "programNutritionQuery.title ILIKE :title OR programNutritionQuery.description ILIKE :description",
        { title: `%${criteria.title}%`, description: `%${criteria.title}%` },
      );
    }

    if (criteria.baseNutritionId) {
      queryBuilder.andWhere(
        "programNutritionQuery.baseNutritionId = :baseNutritionId",
        { baseNutritionId: criteria.baseNutritionId },
      );
    }
    if (criteria.difficultyLevel) {
      queryBuilder.andWhere(
        "programNutritionQuery.difficultyLevel = :difficultyLevel",
        { difficultyLevel: criteria.difficultyLevel },
      );
    }
    if (criteria.gymId) {
      queryBuilder.andWhere("programNutritionQuery.gymId = :gymId", {
        gymId: criteria.gymId,
      });
    }
    if (criteria.ownerManagerId) {
      queryBuilder.andWhere(
        "programNutritionQuery.ownerManagerId = :ownerManagerId",
        { ownerManagerId: criteria.ownerManagerId },
      );
    }
    if (criteria.programSessionPracticeId) {
      queryBuilder.andWhere(
        "programNutritionQuery.programSessionPracticeId = :programSessionPracticeId",
        { programSessionPracticeId: criteria.programSessionPracticeId },
      );
    }
    if (criteria.programStepActivityId) {
      queryBuilder.andWhere(
        "programNutritionQuery.programStepActivityId = :programStepActivityId",
        { programStepActivityId: criteria.programStepActivityId },
      );
    }
    if (criteria.programStepId) {
      queryBuilder.andWhere(
        "programNutritionQuery.programStepId = :programStepId",
        { programStepId: criteria.programStepId },
      );
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case ProgramFindOrderNutritionEnum.random:
          queryBuilder.addOrderBy("RANDOM()");
          break;
        case ProgramFindOrderNutritionEnum.date:
          queryBuilder.addOrderBy("programNutritionQuery.createdAt", "DESC");
          break;
        case ProgramFindOrderNutritionEnum.ratingsAvg:
          queryBuilder.addOrderBy("programNutritionQuery.ratingsAvg", "DESC");
          break;
        case ProgramFindOrderNutritionEnum.attendeesCount:
          queryBuilder.addOrderBy(
            "programNutritionQuery.attendeesCount",
            "DESC",
          );
          break;
        case ProgramFindOrderNutritionEnum.title:
          queryBuilder.addOrderBy("programNutritionQuery.title", "ASC");
          break;
        case ProgramFindOrderNutritionEnum.difficultyLevel:
          queryBuilder.addOrderBy(
            "programNutritionQuery.difficultyLevel",
            "ASC",
          );
          break;
        case ProgramFindOrderNutritionEnum.gym:
          queryBuilder.addOrderBy("programNutritionQuery.gymId", "ASC");
          break;
        case ProgramFindOrderNutritionEnum.program:
          queryBuilder.addOrderBy("programNutritionQuery.programId", "ASC");
          break;
        case ProgramFindOrderNutritionEnum.programStep:
          queryBuilder.addOrderBy("programNutritionQuery.programStepId", "ASC");
          break;
        case ProgramFindOrderNutritionEnum.activity:
          queryBuilder.addOrderBy(
            "programNutritionQuery.programStepActivityId",
            "ASC",
          );
          break;
        case ProgramFindOrderNutritionEnum.owner:
          queryBuilder.addOrderBy("programNutritionQuery.ownerUserId", "ASC");
          break;
        case ProgramFindOrderNutritionEnum.status:
          queryBuilder.addOrderBy("programNutritionQuery.status", "ASC");
          break;
        case ProgramFindOrderNutritionEnum.attendeesCount:
          queryBuilder.addOrderBy(
            "programNutritionQuery.attendeesCount",
            "ASC",
          );
          break;
        case ProgramFindOrderNutritionEnum.viewsCount:
          queryBuilder.addOrderBy("programNutritionQuery.viewsCount", "ASC");
          break;
        case ProgramFindOrderNutritionEnum.ratingsAvg:
          queryBuilder.addOrderBy("programNutritionQuery.ratingsAvg", "ASC");
          break;
        case ProgramFindOrderNutritionEnum.ratingsCount:
          queryBuilder.addOrderBy("programNutritionQuery.ratingsCount", "ASC");
          break;
        default:
          queryBuilder.addOrderBy("programNutritionQuery.createdAt", "DESC");
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

  async findOne(
    id: number,
  ): Promise<DetailsProgramStepActivityWorkingsessionNutritionDto> {
    const nutrition = await this.repository.findOne({
      where: { id },
    });

    return nutrition;
  }

  async findByProgramStepActivityId(
    programStepActivityId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<
    PaginatedResponseDto<ProgramStepActivityWorkingsessionNutritionEntity>
  > {
    const [items, totalItems] = await this.repository.findAndCount({
      where: { programStepActivityId },
      skip: (page - 1) * limit,
      take: limit,
      order: { position: "ASC", createdAt: "DESC" },
    });

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

  async update(
    id: number,
    updateDto: UpdateProgramStepActivityWorkingsessionNutritionDto,
  ): Promise<DetailsProgramStepActivityWorkingsessionNutritionDto> {
    const nutrition = await this.repository.findOne({
      where: { id },
    });

    if (!nutrition) {
      throw new NotFoundException(`Nutrition with ID ${id} not found`);
    }

    Object.assign(nutrition, updateDto);
    const updatedNutrition = await this.repository.save(nutrition);
    return updatedNutrition;
  }

  async remove(id: number): Promise<void> {
    const nutrition = await this.repository.findOne({
      where: { id },
    });

    if (!nutrition) {
      throw new NotFoundException(`Nutrition with ID ${id} not found`);
    }

    await this.repository.remove(nutrition);
  }

  async incrementViewsCount(id: number): Promise<void> {
    await this.repository.increment({ id }, "viewsCount", 1);
  }

  async incrementAttendeesCount(id: number): Promise<void> {
    await this.repository.increment({ id }, "attendeesCount", 1);
  }

  async updateRating(id: number, newRating: number): Promise<void> {
    const nutrition = await this.repository.findOne({
      where: { id },
    });

    const totalRatings = nutrition.ratingsAvg * nutrition.ratingsCount;
    const newRatingsCount = nutrition.ratingsCount + 1;
    const newRatingsAvg = (totalRatings + newRating) / newRatingsCount;

    await this.repository.update(id, {
      ratingsCount: newRatingsCount,
      ratingsAvg: newRatingsAvg,
    });
  }
}
