import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { BaseNutritionTypeEntity } from "../entity";
import { CreateBaseNutritionTypeDto, UpdateBaseNutritionTypeDto } from "../dto";

@Injectable()
export class BaseNutritionTypeService {
  constructor(
    @InjectRepository(BaseNutritionTypeEntity)
    private readonly nutritionTypeRepository: Repository<BaseNutritionTypeEntity>
  ) {}

  async create(createDto: CreateBaseNutritionTypeDto): Promise<BaseNutritionTypeEntity> {
    const type = this.nutritionTypeRepository.create(createDto);
    return this.nutritionTypeRepository.save(type);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseNutritionTypeEntity>> {
    const [items, total] = await this.nutritionTypeRepository.findAndCount({
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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseNutritionTypeEntity>> {
    const searchTerm = `%${query}%`;
    const [items, total] = await this.nutritionTypeRepository.findAndCount({
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

  findOne(id: number): Promise<BaseNutritionTypeEntity | null> {
    return this.nutritionTypeRepository.findOneBy({ id });
  }

  findByCode(code: string): Promise<BaseNutritionTypeEntity | null> {
    return this.nutritionTypeRepository.findOneBy({ code });
  }

  async update(id: number, updateDto: UpdateBaseNutritionTypeDto): Promise<BaseNutritionTypeEntity | null> {
    const result = await this.nutritionTypeRepository.update(id, updateDto);
    if (result.affected === 0) {
      return null;
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.nutritionTypeRepository.delete(id);
    return result.affected > 0;
  }
}
