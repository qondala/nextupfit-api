import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto, PaginatedResponseDto } from "@app/common/dto";
import { CreateUserRecipeDto, UpdateUserRecipeDto } from "../dto";
import { UserRecipeEntity } from "../entity";

@Injectable()
export class UserRecipeService {
  constructor(
    @InjectRepository(UserRecipeEntity)
    private readonly recipeRepository: Repository<UserRecipeEntity>
  ) {}

  async create(dto: CreateUserRecipeDto): Promise<UserRecipeEntity> {
    const entity = this.recipeRepository.create(dto);
    return this.recipeRepository.save(entity);
  }

  async findAll(
    userId: number,
    pagination: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<UserRecipeEntity>> {
    const qb = this.recipeRepository.createQueryBuilder("usr")
      .where("usr.userId = :userId", { userId })
      .orderBy("usr.createdAt", "DESC");

    const skip = (pagination.page - 1) * pagination.limit;
    const [items, totalItems] = await qb.skip(skip).take(pagination.limit).getManyAndCount();

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages: Math.ceil(totalItems / pagination.limit),
        currentPage: pagination.page
      }
    };
  }

  findOne(id: number): Promise<UserRecipeEntity> {
    return this.recipeRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, dto: UpdateUserRecipeDto): Promise<UserRecipeEntity> {
    await this.recipeRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.recipeRepository.delete(id);
  }
}
