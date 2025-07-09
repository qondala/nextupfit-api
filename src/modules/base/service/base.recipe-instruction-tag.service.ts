import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  CreateBaseRecipeInstructionTagDto,
  UpdateBaseRecipeInstructionTagDto
} from "../dto";
import { BaseRecipeInstructionTagEntity } from "../entity";

@Injectable()
export class BaseRecipeInstructionTagService {
  constructor(
    @InjectRepository(BaseRecipeInstructionTagEntity)
    private readonly tagRepository: Repository<BaseRecipeInstructionTagEntity>
  ) {}

  async create(
    createDto: CreateBaseRecipeInstructionTagDto
  ): Promise<BaseRecipeInstructionTagEntity> {
    const entity = this.tagRepository.create(createDto);
    return await this.tagRepository.save(entity);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<BaseRecipeInstructionTagEntity>> {
    const qb = this.tagRepository
      .createQueryBuilder("tag")
      .orderBy("tag.createdAt", "DESC");

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

  async findOne(id: number): Promise<BaseRecipeInstructionTagEntity> {
    return this.tagRepository.findOneOrFail({ where: { id } });
  }

  async update(
    id: number,
    updateDto: UpdateBaseRecipeInstructionTagDto
  ): Promise<BaseRecipeInstructionTagEntity> {
    await this.tagRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tagRepository.delete(id);
  }
}
