import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  FindOrderByEnum,
  PaginatedResponseDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import { ProgramPerSociologyEntity } from "../entity";
import {
  CreateProgramPerSociologyDto,
  ProgramFindCriteriaPerSociologyDto,
  UpdateProgramPerSociologyDto,
} from "../dto";

import { ProgramService } from "../service";

@Injectable()
export class ProgramPerSociologyService {
  constructor(
    @InjectRepository(ProgramPerSociologyEntity)
    private readonly programPerSociologyRepository: Repository<ProgramPerSociologyEntity>,
    private readonly programService: ProgramService,
  ) {}

  async create(
    createProgramPerSociologyDto: CreateProgramPerSociologyDto,
  ): Promise<ProgramPerSociologyEntity> {
    const programPerSociology = this.programPerSociologyRepository.create(
      createProgramPerSociologyDto,
    );
    return await this.programPerSociologyRepository.save(programPerSociology);
  }

  async findAll(
    criteria: ProgramFindCriteriaPerSociologyDto,
    pagination?: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<ProgramPerSociologyEntity>> {
    const queryBuilder = this.programPerSociologyRepository.createQueryBuilder(
      "programPerSociology",
    );

    queryBuilder.where("programPerSociology.id != 0");

    if (criteria.itemType) {
      queryBuilder.andWhere("programPerSociology.itemType = :itemType", {
        itemType: criteria.itemType,
      });
    }
    if (criteria.itemId) {
      queryBuilder.andWhere("programPerSociology.itemId = :itemId", {
        itemId: criteria.itemId,
      });
    }
    if (criteria.baseSociologyId) {
      queryBuilder.andWhere(
        "programPerSociology.baseSociologyId = :baseSociologyId",
        { baseSociologyId: criteria.baseSociologyId },
      );
    }
    if (criteria.baseSociologyIds) {
      queryBuilder.andWhere(
        "programPerSociology.baseSociologyId IN (:...baseSociologyIds)",
        { baseSociologyIds: criteria.baseSociologyIds },
      );
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy("RANDOM()");
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy("programPerSociology.createdAt", "DESC");
          break;
        default:
          queryBuilder.addOrderBy("programPerSociology.createdAt", "DESC");
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

  async findOne(id: number): Promise<ProgramPerSociologyEntity> {
    const programPerSociology =
      await this.programPerSociologyRepository.findOne({ where: { id } });
    if (programPerSociology) {
      programPerSociology.item = await this.programService.getProgramItem(
        programPerSociology.itemType,
        programPerSociology.itemId,
      );
    }
    return programPerSociology;
  }

  async update(
    id: number,
    updateProgramPerSociologyDto: UpdateProgramPerSociologyDto,
  ): Promise<ProgramPerSociologyEntity> {
    const programPerSociology = await this.findOne(id);
    Object.assign(programPerSociology, updateProgramPerSociologyDto);
    return await this.programPerSociologyRepository.save(programPerSociology);
  }

  async remove(id: number): Promise<void> {
    await this.programPerSociologyRepository.delete(id);
  }
}
