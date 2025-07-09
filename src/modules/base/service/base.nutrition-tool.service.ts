import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  CreateBaseNutritionToolDto,
  UpdateBaseNutritionToolDto
} from "../dto";
import { BaseNutritionToolEntity } from "../entity";

@Injectable()
export class BaseNutritionToolService {
  constructor(
    @InjectRepository(BaseNutritionToolEntity)
    private readonly nutritionToolRepository: Repository<BaseNutritionToolEntity>
  ) {}

  async create(
    createDto: CreateBaseNutritionToolDto
  ): Promise<BaseNutritionToolEntity> {
    const entity = this.nutritionToolRepository.create(createDto);
    return await this.nutritionToolRepository.save(entity);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<BaseNutritionToolEntity>> {
    const queryBuilder = this.nutritionToolRepository
      .createQueryBuilder("tool")
      .orderBy("tool.createdAt", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
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

  async findOne(id: number): Promise<BaseNutritionToolEntity> {
    return await this.nutritionToolRepository.findOneOrFail({ where: { id } });
  }

  async update(
    id: number,
    updateDto: UpdateBaseNutritionToolDto
  ): Promise<BaseNutritionToolEntity> {
    await this.nutritionToolRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.nutritionToolRepository.delete(id);
  }
}
