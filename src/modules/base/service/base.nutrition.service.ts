import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { BaseNutritionEntity } from "../entity";
import { CreateBaseNutritionDto, UpdateBaseNutritionDto } from "../dto";

@Injectable()
export class BaseNutritionService {
  constructor(
    @InjectRepository(BaseNutritionEntity)
    private readonly nutritionRepository: Repository<BaseNutritionEntity>
  ) {}

  async create(dto: CreateBaseNutritionDto): Promise<BaseNutritionEntity> {
    const nutrition = this.nutritionRepository.create(dto);
    return this.nutritionRepository.save(nutrition);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseNutritionEntity>> {
    const [items, total] = await this.nutritionRepository.findAndCount({
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { id: "DESC" }
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page
      }
    };
  }

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseNutritionEntity>> {
    const searchTerm = `%${query}%`;
    const [items, total] = await this.nutritionRepository.findAndCount({
      where: [
        { name: Like(searchTerm) },
        { code: Like(searchTerm) }
      ],
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { id: "DESC" }
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page
      }
    };
  }

  findOne(id: number): Promise<BaseNutritionEntity | null> {
    return this.nutritionRepository.findOneBy({ id });
  }

  findByCode(code: string): Promise<BaseNutritionEntity | null> {
    return this.nutritionRepository.findOneBy({ code });
  }

  async update(id: number, dto: UpdateBaseNutritionDto): Promise<BaseNutritionEntity | null> {
    const result = await this.nutritionRepository.update(id, dto);
    if (result.affected === 0) return null;
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.nutritionRepository.delete(id);
    return result.affected > 0;
  }
}
