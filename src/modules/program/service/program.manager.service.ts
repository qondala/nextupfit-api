import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  FindOrderByEnum,
  PaginatedResponseDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import { ProgramManagerEntity } from "../entity";
import {
  CreateProgramManagerDto,
  ProgramFindCriteriaManagerDto,
  UpdateProgramManagerDto,
} from "../dto";

import { ProgramService } from "../service";

@Injectable()
export class ProgramManagerService {
  constructor(
    @InjectRepository(ProgramManagerEntity)
    private readonly programManagerRepository: Repository<ProgramManagerEntity>,
    private readonly programService: ProgramService,
  ) {}

  async create(
    createProgramManagerDto: CreateProgramManagerDto,
  ): Promise<ProgramManagerEntity> {
    const programManager = this.programManagerRepository.create(
      createProgramManagerDto,
    );
    return await this.programManagerRepository.save(programManager);
  }

  async findAll(
    criteria: ProgramFindCriteriaManagerDto,
    pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<ProgramManagerEntity>> {
    const queryBuilder =
      this.programManagerRepository.createQueryBuilder("programManager");

    queryBuilder.where("programManager.id != 0");

    if (criteria.itemType) {
      queryBuilder.andWhere("programManager.itemType = :itemType", {
        itemType: criteria.itemType,
      });
    }
    if (criteria.itemId) {
      queryBuilder.andWhere("programManager.itemId = :itemId", {
        itemId: criteria.itemId,
      });
    }
    if (criteria.managerId) {
      queryBuilder.andWhere("programManager.managerId = :managerId", {
        managerId: criteria.managerId,
      });
    }
    if (criteria.gymId) {
      queryBuilder.andWhere("programManager.gymId = :gymId", {
        gymId: criteria.gymId,
      });
    }
    if (criteria.managerUserId) {
      queryBuilder.andWhere("programManager.managerUserId = :managerUserId", {
        managerUserId: criteria.managerUserId,
      });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy("RANDOM()");
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy("programManager.createdAt", "DESC");
          break;
        default:
          queryBuilder.addOrderBy("programManager.createdAt", "DESC");
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

    for (const item of items) {
      item.item = await this.programService.getProgramItem(
        item.itemType,
        item.itemId,
      );
    }

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

  async findOne(id: number): Promise<ProgramManagerEntity> {
    const programManager = await this.programManagerRepository.findOne({
      where: { id },
    });

    if (programManager) {
      programManager.item = await this.programService.getProgramItem(
        programManager.itemType,
        programManager.itemId,
      );
    }

    return programManager;
  }

  async update(
    id: number,
    updateProgramManagerDto: UpdateProgramManagerDto,
  ): Promise<ProgramManagerEntity> {
    const programManager = await this.findOne(id);
    Object.assign(programManager, updateProgramManagerDto);
    return await this.programManagerRepository.save(programManager);
  }

  async remove(id: number): Promise<void> {
    await this.programManagerRepository.delete(id);
  }
}
