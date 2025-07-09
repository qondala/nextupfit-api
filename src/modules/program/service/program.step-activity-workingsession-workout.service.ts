import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  CreateProgramStepActivityWorkingsessionWorkoutDto,
  ProgramFindCriteriaWorkoutDto,
  ProgramFindOrderWorkoutEnum,
  UpdateProgramStepActivityWorkingsessionWorkoutDto
} from "../dto";
import {
  ProgramStepActivityWorkingsessionWorkoutEntity
} from "../entity";


@Injectable()
export class ProgramStepActivityWorkingsessionWorkoutService {
  constructor(
    @InjectRepository(ProgramStepActivityWorkingsessionWorkoutEntity)
    private readonly service: Repository<ProgramStepActivityWorkingsessionWorkoutEntity>,
  ) {}

  async create(body: CreateProgramStepActivityWorkingsessionWorkoutDto): Promise<ProgramStepActivityWorkingsessionWorkoutEntity> {
    const workout = this.service.create(body);
    return await this.service.save(workout);
  }

  async findAll(
    criteria: ProgramFindCriteriaWorkoutDto,
    pagination?: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramStepActivityWorkingsessionWorkoutEntity>> {

    const queryBuilder = this.service.createQueryBuilder("workoutQuery");

    queryBuilder.where("workoutQuery.id != 0");

    if (criteria.workingSessionId) {
      queryBuilder.andWhere("workoutQuery.workingSessionId = :workingSessionId", { workingSessionId: criteria.workingSessionId });
    }
    if (criteria.baseWorkoutId) {
      queryBuilder.andWhere("workoutQuery.baseWorkoutId = :baseWorkoutId", { baseWorkoutId: criteria.baseWorkoutId });
    }
    if (criteria.title) {
      queryBuilder.andWhere("workoutQuery.title ILIKE :title", { title: `%${criteria.title}%` });
    }
    if (criteria.description) {
      queryBuilder.andWhere("workoutQuery.description ILIKE :description", { description: `%${criteria.description}%` });
    }
    if (criteria.gymId) {
      queryBuilder.andWhere("workoutQuery.gymId = :gymId", { gymId: criteria.gymId });
    }
    if (criteria.programId) {
      queryBuilder.andWhere("workoutQuery.programId = :programId", { programId: criteria.programId });
    }
    if (criteria.programStepId) {
      queryBuilder.andWhere("workoutQuery.programStepId = :programStepId", { programStepId: criteria.programStepId });
    }
    if (criteria.programStepActivityId) {
      queryBuilder.andWhere("workoutQuery.programStepActivityId = :programStepActivityId", { programStepActivityId: criteria.programStepActivityId });
    }
    if (criteria.workingSessionId) {
      queryBuilder.andWhere("workoutQuery.workingSessionId = :workingSessionId", { workingSessionId: criteria.workingSessionId });
    }
    if (criteria.ownerUserId) {
      queryBuilder.andWhere("workoutQuery.ownerUserId = :ownerUserId", { ownerUserId: criteria.ownerUserId });
    }
    if (criteria.ownerManagerId) {
      queryBuilder.andWhere("workoutQuery.ownerManagerId = :ownerManagerId", { ownerManagerId: criteria.ownerManagerId });
    }
    if (criteria.status) {
      queryBuilder.andWhere("workoutQuery.status = :status", { status: criteria.status });
    }
    if (criteria.attendeesCount) {
      queryBuilder.andWhere("workoutQuery.attendeesCount = :attendeesCount", { attendeesCount: criteria.attendeesCount });
    }
    if (criteria.viewsCount) {
      queryBuilder.andWhere("workoutQuery.viewsCount = :viewsCount", { viewsCount: criteria.viewsCount });
    }
    if (criteria.ratingsAvg) {
      queryBuilder.andWhere("workoutQuery.ratingsAvg = :ratingsAvg", { ratingsAvg: criteria.ratingsAvg });
    }
    if (criteria.ratingsCount) {
      queryBuilder.andWhere("workoutQuery.ratingsCount = :ratingsCount", { ratingsCount: criteria.ratingsCount });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case ProgramFindOrderWorkoutEnum.random:
          queryBuilder.addOrderBy('RANDOM()');
          break;
        case ProgramFindOrderWorkoutEnum.date:
          queryBuilder.addOrderBy('workoutQuery.createdAt', 'DESC');
          break;
        case ProgramFindOrderWorkoutEnum.ratingsAvg:
          queryBuilder.addOrderBy('workoutQuery.ratingsAvg', 'DESC');
          break;
        case ProgramFindOrderWorkoutEnum.attendeesCount:
          queryBuilder.addOrderBy('workoutQuery.attendeesCount', 'DESC');
          break;
        case ProgramFindOrderWorkoutEnum.title:
          queryBuilder.addOrderBy('workoutQuery.title', 'ASC');
          break;
        case ProgramFindOrderWorkoutEnum.difficultyLevel:
          queryBuilder.addOrderBy('workoutQuery.difficultyLevel', 'ASC');
          break;
        case ProgramFindOrderWorkoutEnum.gym:
          queryBuilder.addOrderBy('workoutQuery.gymId', 'ASC');
          break;
        case ProgramFindOrderWorkoutEnum.program:
          queryBuilder.addOrderBy('workoutQuery.programId', 'ASC');
          break;
        case ProgramFindOrderWorkoutEnum.programStep:
          queryBuilder.addOrderBy('workoutQuery.programStepId', 'ASC');
          break;
        case ProgramFindOrderWorkoutEnum.activity:
          queryBuilder.addOrderBy('workoutQuery.programStepActivityId', 'ASC');
          break;
        case ProgramFindOrderWorkoutEnum.owner:
          queryBuilder.addOrderBy('workoutQuery.ownerUserId', 'ASC');
          break;
        case ProgramFindOrderWorkoutEnum.status:
          queryBuilder.addOrderBy('workoutQuery.status', 'ASC');
          break;
        case ProgramFindOrderWorkoutEnum.attendeesCount:
          queryBuilder.addOrderBy('workoutQuery.attendeesCount', 'ASC');
          break;
        case ProgramFindOrderWorkoutEnum.viewsCount:
          queryBuilder.addOrderBy('workoutQuery.viewsCount', 'ASC');
          break;
        case ProgramFindOrderWorkoutEnum.ratingsAvg:
          queryBuilder.addOrderBy('workoutQuery.ratingsAvg', 'ASC');
          break;
        case ProgramFindOrderWorkoutEnum.ratingsCount:
          queryBuilder.addOrderBy('workoutQuery.ratingsCount', 'ASC');
          break;
        default:
          queryBuilder.addOrderBy('workoutQuery.createdAt', 'DESC');
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
        currentPage: page
      }
    };
  }

  async findOne(id: number): Promise<ProgramStepActivityWorkingsessionWorkoutEntity> {
    const workout = await this.service.findOne({ where: { id } });

    if (!workout) {
      throw new Error(`Program step activity workingsession workout with ID ${id} not found`);
    }
    return workout;
  }

  async update(id: number, body: UpdateProgramStepActivityWorkingsessionWorkoutDto): Promise<ProgramStepActivityWorkingsessionWorkoutEntity> {
    const workout = await this.findOne(id);
    Object.assign(workout, body);
    return await this.service.save(workout);
  }

  async remove(id: number): Promise<void> {
    await this.service.delete(id);
  }
}
