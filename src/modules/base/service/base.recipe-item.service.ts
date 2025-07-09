import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  CreateBaseRecipeItemDto,
  UpdateBaseRecipeItemDto
} from "../dto";
import { BaseRecipeItemEntity } from "../entity";

@Injectable()
export class BaseRecipeItemService {
  constructor(
    @InjectRepository(BaseRecipeItemEntity)
    private readonly recipeItemRepository: Repository<BaseRecipeItemEntity>
  ) {}

  async create(createDto: CreateBaseRecipeItemDto): Promise<BaseRecipeItemEntity> {
    const entity = this.recipeItemRepository.create(createDto);
    return await this.recipeItemRepository.save(entity);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<BaseRecipeItemEntity>> {
    const qb = this.recipeItemRepository
      .createQueryBuilder("item")
      .orderBy("item.createdAt", "DESC");

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

  async findOne(id: number): Promise<BaseRecipeItemEntity> {
    return this.recipeItemRepository.findOneOrFail({ where: { id } });
  }

  async update(
    id: number,
    updateDto: UpdateBaseRecipeItemDto
  ): Promise<BaseRecipeItemEntity> {
    await this.recipeItemRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.recipeItemRepository.delete(id);
  }
}
