import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  PaginatedResponseDto,
  PaginationOptionsDto
} from "@app/common/dto";

import {
  ProgramEntity,
  ProgramStepEntity,
  ProgramStepActivityEntity, 
  ProgramStepActivityWorkingsessionEntity, 
  ProgramStepActivityWorkingsessionWorkoutEntity,
} from "../entity";

import {
  CreateProgramDto,
  UpdateProgramDto,
  ProgramFindCriteriaDto,
  ProgramFindOrderByEnum
} from "../dto";
import {
  ProgramItemCompositeDto,
  ProgramItemTypeEnum,
} from "../types";

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly repository: Repository<ProgramEntity>,

    @InjectRepository(ProgramStepEntity)
    private readonly stepRepository: Repository<ProgramStepEntity>,

    @InjectRepository(ProgramStepActivityEntity)
    private readonly activityRepository: Repository<ProgramStepActivityEntity>,

    @InjectRepository(ProgramStepActivityWorkingsessionEntity)
    private readonly workingSessionRepository: Repository<ProgramStepActivityWorkingsessionEntity>,

    @InjectRepository(ProgramStepActivityWorkingsessionWorkoutEntity)
    private readonly workoutRepository: Repository<ProgramStepActivityWorkingsessionWorkoutEntity>
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<ProgramEntity> {
    const program = this.repository.create(createProgramDto);
    return await this.repository.save(program);
  }

  async findAll(
    criteria: ProgramFindCriteriaDto,
    pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<ProgramEntity>> {

    const queryBuilder = this.repository.createQueryBuilder("program");

    queryBuilder.where('program.id != 0');

    if (criteria.name) {
      queryBuilder.andWhere("program.name ILIKE :name", { name: `%${criteria.name}%` });
    }
    if (criteria.type) {
      queryBuilder.andWhere("program.type = :type", { type: criteria.type });
    }
    if (criteria.status) {
      queryBuilder.andWhere("program.status = :status", { status: criteria.status });
    }
    if (criteria.duration) {
      queryBuilder.andWhere("program.duration <= :duration", { duration: criteria.duration });
    }
    if (criteria.gymId) {
      queryBuilder.andWhere("program.gymId = :gymId", { gymId: criteria.gymId });
    }
    if (criteria.ownerUserId) {
      queryBuilder.andWhere("program.ownerUserId = :ownerUserId", { ownerUserId: criteria.ownerUserId });
    }
    if (criteria.ownerManagerId) {
      queryBuilder.andWhere("program.ownerManagerId = :ownerManagerId", { ownerManagerId: criteria.ownerManagerId });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case ProgramFindOrderByEnum.random:
          queryBuilder.addOrderBy('RANDOM()');
          break;
        case ProgramFindOrderByEnum.date:
          queryBuilder.addOrderBy('program.createdAt', 'DESC');
          break;
        case ProgramFindOrderByEnum.ratingsAvg:
          queryBuilder.addOrderBy('program.ratingsAvg', 'DESC');
          break;
        case ProgramFindOrderByEnum.attendeesCount:
          queryBuilder.addOrderBy('program.attendeesCount', 'DESC');
          break;
        case ProgramFindOrderByEnum.name:
          queryBuilder.addOrderBy('program.name', 'ASC');
          break;
        case ProgramFindOrderByEnum.duration:
          queryBuilder.addOrderBy('program.duration', 'ASC');
          break;
        case ProgramFindOrderByEnum.difficultyLevel:
          queryBuilder.addOrderBy('program.difficultyLevel', 'ASC');
          break;
        default:
          queryBuilder.addOrderBy('program.createdAt', 'DESC');
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

  async findOne(id: number): Promise<ProgramEntity> {
    const program = await this.repository.findOne({ where: { id } });
    if (!program) {
      throw new Error(`Program with ID ${id} not found`);
    }
    return program;
  }

  async update(id: number, updateProgramDto: UpdateProgramDto): Promise<ProgramEntity> {
    const program = await this.findOne(id);
    Object.assign(program, updateProgramDto);
    return await this.repository.save(program);
  }

  async remove(id: number): Promise<void> {
    const program = await this.findOne(id);
    await this.repository.remove(program);
  }


  
    async getProgramItem(
      itemType: ProgramItemTypeEnum, 
      itemId: number,
    ): Promise<ProgramItemCompositeDto> {

      const composite = new ProgramItemCompositeDto();

      switch(itemType) {
        case ProgramItemTypeEnum.program:
          composite.program = await this.repository.findOne({ where: { id: itemId } });
          break;
  
        case ProgramItemTypeEnum.step:
          composite.step = await this.stepRepository.findOne({ where: { id: itemId } });
          break;
  
        case ProgramItemTypeEnum.activity:
          composite.activity = await this.activityRepository.findOne({ where: { id: itemId } });
          break;
  
        case ProgramItemTypeEnum.workingsession:
          composite.workingsession = await this.workingSessionRepository.findOne({ where: { id: itemId } });
          break;
  
        case ProgramItemTypeEnum.workout:
          composite.workout = await this.workoutRepository.findOne({ where: { id: itemId } });
          break;
      }

      return composite;
    }
}
