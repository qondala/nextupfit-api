import {
  Injectable
} from "@nestjs/common";
import {
  InjectRepository
} from "@nestjs/typeorm";
import {
  LessThan,
  MoreThan,
  Repository
} from "typeorm";

import {
  PaginatedResponseDto,
  PaginationOptionsDto
} from "@app/common/dto";

import {
  ProgramStepEntity
} from "../entity";
import {
  CreateProgramStepDto,
  ProgramFindOrderStepEnum,
  UpdateProgramStepDto,
  ProgramFindCriteriaStepDto
} from "../dto";


@Injectable()
export class ProgramStepService {
  constructor(
    @InjectRepository(ProgramStepEntity)
    private readonly repository: Repository<ProgramStepEntity>,
  ) {}

  async create(body: CreateProgramStepDto): Promise<ProgramStepEntity> {
    const step = this.repository.create(body);
    return await this.repository.save(step);
  }

  async findAll(
    criteria: ProgramFindCriteriaStepDto,
    pagination?: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<ProgramStepEntity>> {

    const queryBuilder = this.repository.createQueryBuilder("stepQuery");

    queryBuilder.where("stepQuery.id != 0");

    if (criteria.search) {
      queryBuilder.andWhere("stepQuery.name LIKE :search", { search: `%${criteria.search}%` });
      queryBuilder.andWhere("stepQuery.description LIKE :search", { search: `%${criteria.search}%` });
    }

    if (criteria.gymId) {
      queryBuilder.andWhere("stepQuery.gymId = :gymId", { gymId: criteria.gymId });
    }

    if (criteria.programId) {
      queryBuilder.andWhere("stepQuery.programId = :programId", { programId: criteria.programId });
    }

    if (criteria.ownerUserId) {
      queryBuilder.andWhere("stepQuery.ownerUserId = :ownerUserId", { ownerUserId: criteria.ownerUserId });
    }

    if (criteria.ownerManagerId) {
      queryBuilder.andWhere("stepQuery.ownerManagerId = :ownerManagerId", { ownerManagerId: criteria.ownerManagerId });
    }

    if (criteria.status) {
      queryBuilder.andWhere("stepQuery.status = :status", { status: criteria.status });
    }

    if (criteria.attendeesCount) {
      queryBuilder.andWhere("stepQuery.attendeesCount = :attendeesCount", { attendeesCount: criteria.attendeesCount });
    }

    if (criteria.viewsCount) {
      queryBuilder.andWhere("stepQuery.viewsCount = :viewsCount", { viewsCount: criteria.viewsCount });
    }

    if (criteria.ratingsAvg) {
      queryBuilder.andWhere("stepQuery.ratingsAvg = :ratingsAvg", { ratingsAvg: criteria.ratingsAvg });
    }

    if (criteria.ratingsCount) {
      queryBuilder.andWhere("stepQuery.ratingsCount = :ratingsCount", { ratingsCount: criteria.ratingsCount });
    }

    if (criteria.duration) {
      queryBuilder.andWhere("stepQuery.duration = :duration", { duration: criteria.duration });
    }

    if (criteria.difficultyLevel) {
      queryBuilder.andWhere("stepQuery.difficultyLevel = :difficultyLevel", { difficultyLevel: criteria.difficultyLevel });
    }


    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case ProgramFindOrderStepEnum.date:
          queryBuilder.addOrderBy("stepQuery.createdAt", "DESC");
          break;
        case ProgramFindOrderStepEnum.random:
          queryBuilder.addOrderBy("RANDOM()");
          break;
        case ProgramFindOrderStepEnum.name:
          queryBuilder.addOrderBy("stepQuery.name", "ASC");
          break;
        case ProgramFindOrderStepEnum.gym:
          queryBuilder.addOrderBy("stepQuery.gymId", "ASC");
          break;
        case ProgramFindOrderStepEnum.program:
          queryBuilder.addOrderBy("stepQuery.programId", "ASC");
          break;
        case ProgramFindOrderStepEnum.owner:
          queryBuilder.addOrderBy("stepQuery.ownerUserId", "ASC");
          break;
        case ProgramFindOrderStepEnum.status:
          queryBuilder.addOrderBy("stepQuery.status", "ASC");
          break;
        case ProgramFindOrderStepEnum.attendeesCount:
          queryBuilder.addOrderBy("stepQuery.attendeesCount", "ASC");
          break;
        case ProgramFindOrderStepEnum.viewsCount:
          queryBuilder.addOrderBy("stepQuery.viewsCount", "ASC");
          break;
        case ProgramFindOrderStepEnum.ratingsAvg:
          queryBuilder.addOrderBy("stepQuery.ratingsAvg", "ASC");
          break;
        case ProgramFindOrderStepEnum.ratingsCount:
          queryBuilder.addOrderBy("stepQuery.ratingsCount", "ASC");
          break;
        case ProgramFindOrderStepEnum.difficultyLevel:
          queryBuilder.addOrderBy("stepQuery.difficultyLevel", "ASC");
          break;
        default:
          queryBuilder.addOrderBy("stepQuery.createdAt", "DESC");
          break;
      }
    }
    else {
      queryBuilder.addOrderBy("stepQuery.createdAt", "DESC");
      queryBuilder.addOrderBy("stepQuery.position", "ASC");
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

  async findOne(id: number): Promise<ProgramStepEntity> {
    const step = await this.repository.findOne({ where: { id } });
    return step;
  }

  async findFirst(programId: number): Promise<ProgramStepEntity> {
    const step = await this.repository.findOne({ where: { programId }, order: { position: "ASC" } });
    return step;
  }


  async findNext(stepId: number): Promise<ProgramStepEntity> {
    const step = await this.findOne(stepId);
    const nextStep = await this.repository.findOne({ where: { programId: step.programId, position: MoreThan(step.position) }, order: { position: "ASC" } });
    return nextStep;
  }

  async findPrevious(stepId: number): Promise<ProgramStepEntity> {
    const step = await this.findOne(stepId);
    const previousStep = await this.repository.findOne({ where: { programId: step.programId, position: LessThan(step.position) }, order: { position: "DESC" } });
    return previousStep;
  }

  async update(id: number, body: UpdateProgramStepDto): Promise<ProgramStepEntity> {
    const step = await this.findOne(id);
    Object.assign(step, body);
    return await this.repository.save(step);
  }

  async remove(id: number): Promise<void> {
    const step = await this.findOne(id);
    await this.repository.remove(step);
  }

} 