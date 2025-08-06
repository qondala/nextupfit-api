import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  FindOrderByEnum,
  PaginatedResponseDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import { ProgramService } from "./program.service";
import {
  CreateProgramFreetoolDto,
  ProgramFindCriteriaFreetoolDto,
  UpdateProgramFreetoolDto,
} from "../dto";

import { ProgramFreetoolEntity } from "../entity";

@Injectable()
export class ProgramFreetoolService {
  constructor(
    @InjectRepository(ProgramFreetoolEntity)
    private readonly programFreetoolRepository: Repository<ProgramFreetoolEntity>,
    private readonly programService: ProgramService,
  ) {}

  async create(
    createDto: CreateProgramFreetoolDto,
  ): Promise<ProgramFreetoolEntity> {
    const entity = this.programFreetoolRepository.create(createDto);
    return await this.programFreetoolRepository.save(entity);
  }

  async findAll(
    criteria: ProgramFindCriteriaFreetoolDto,
    pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<ProgramFreetoolEntity>> {
    const queryBuilder = this.programFreetoolRepository
      .createQueryBuilder("programFreetool")
      .leftJoinAndSelect("programFreetool.activity", "activity")
      .leftJoinAndSelect("programFreetool.gym", "gym")
      .leftJoinAndSelect("programFreetool.manager", "manager");

    queryBuilder.where("programFreetool.id != 0");

    if (criteria.activityId) {
      queryBuilder.andWhere("programFreetool.activityId = :activityId", {
        activityId: criteria.activityId,
      });
    }
    if (criteria.managerId) {
      queryBuilder.andWhere("programFreetool.managerId = :managerId", {
        managerId: criteria.managerId,
      });
    }
    if (criteria.gymId) {
      queryBuilder.andWhere("programFreetool.gymId = :gymId", {
        gymId: criteria.gymId,
      });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy("RANDOM()");
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy("programFreetool.createdAt", "DESC");
          break;
        default:
          queryBuilder.addOrderBy("programFreetool.createdAt", "DESC");
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

  async findOne(id: number): Promise<ProgramFreetoolEntity> {
    const record = await this.programFreetoolRepository.findOne({
      where: { id },
      relations: ["activity", "gym", "manager"],
    });

    return record;
  }

  async isGymFreeToolActivity(
    activityId: number,
    gymId: number,
  ): Promise<boolean> {
    const record = await this.programFreetoolRepository.findOne({
      where: { activityId, gymId },
    });
    return !!record;
  }

  async update(
    id: number,
    updateDto: UpdateProgramFreetoolDto,
  ): Promise<ProgramFreetoolEntity> {
    await this.programFreetoolRepository.update({ id }, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.programFreetoolRepository.delete({ id });
    return;
  }
}
