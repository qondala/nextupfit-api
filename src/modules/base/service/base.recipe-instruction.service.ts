import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  CreateBaseRecipeInstructionDto,
  UpdateBaseRecipeInstructionDto
} from "../dto";
import { BaseRecipeInstructionEntity } from "../entity";

@Injectable()
export class BaseRecipeInstructionService {
  constructor(
    @InjectRepository(BaseRecipeInstructionEntity)
    private readonly instructionRepository: Repository<BaseRecipeInstructionEntity>
  ) {}

  async create(
    createDto: CreateBaseRecipeInstructionDto
  ): Promise<BaseRecipeInstructionEntity> {
    const entity = this.instructionRepository.create(createDto);
    return this.instructionRepository.save(entity);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<BaseRecipeInstructionEntity>> {
    const qb = this.instructionRepository
      .createQueryBuilder("instruction")
      .orderBy("instruction.createdAt", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await qb
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page
      }
    };
  }

  async findOne(id: number): Promise<BaseRecipeInstructionEntity> {
    return this.instructionRepository.findOneOrFail({ where: { id } });
  }

  async update(
    id: number,
    updateDto: UpdateBaseRecipeInstructionDto
  ): Promise<BaseRecipeInstructionEntity> {
    await this.instructionRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.instructionRepository.delete(id);
  }
}
