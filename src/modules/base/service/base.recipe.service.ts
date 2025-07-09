import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto, PaginatedResponseDto } from "@app/common/dto";
import { CreateBaseRecipeDto, UpdateBaseRecipeDto } from "../dto";
import { BaseRecipeEntity } from "../entity";

@Injectable()
export class BaseRecipeService {
  constructor(
    @InjectRepository(BaseRecipeEntity)
    private readonly recipeRepository: Repository<BaseRecipeEntity>
  ) {}

  async create(createDto: CreateBaseRecipeDto): Promise<BaseRecipeEntity> {
    const entity = this.recipeRepository.create(createDto);
    return this.recipeRepository.save(entity);
  }

  async findAll(
    pagination: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<BaseRecipeEntity>> {
    const qb = this.recipeRepository
      .createQueryBuilder("recipe")
      .orderBy("recipe.createdAt", "DESC");

    const skip = (pagination.page - 1) * pagination.limit;
    const [items, totalItems] = await qb
      .skip(skip)
      .take(pagination.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / pagination.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages,
        currentPage: pagination.page
      }
    };
  }

  findOne(id: number): Promise<BaseRecipeEntity> {
    return this.recipeRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateDto: UpdateBaseRecipeDto): Promise<BaseRecipeEntity> {
    await this.recipeRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.recipeRepository.delete(id);
  }
}
