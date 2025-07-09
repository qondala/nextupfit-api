import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  CreateGymManagerSpecializedInNutritionDto,
  UpdateGymManagerSpecializedInNutritionDto,
} from "../dto";
import { GymManagerSpecializedInNutritionEntity } from "../entity";

@Injectable()
export class GymManagerSpecializedInNutritionService {
  constructor(
    @InjectRepository(GymManagerSpecializedInNutritionEntity)
    private readonly repository: Repository<GymManagerSpecializedInNutritionEntity>,
  ) {}

  async create(
    dto: CreateGymManagerSpecializedInNutritionDto,
    userId: number,
  ): Promise<GymManagerSpecializedInNutritionEntity> {
    const entity = this.repository.create({ ...dto, createdAt: new Date() });
    return this.repository.save(entity);
  }

  async findByManager(
    managerId: number,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymManagerSpecializedInNutritionEntity>> {
    const { page = 1, limit = 10 } = options;

    const query = this.repository
      .createQueryBuilder("specializedNutrition")
      .where("specializedNutrition.managerId = :managerId", { managerId })
      .orderBy("specializedNutrition.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit);

    const [items, totalItems] = await query.getManyAndCount();

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<GymManagerSpecializedInNutritionEntity> {
    return this.repository.findOne({ where: { id }, relations: ["baseNutrition"] });
  }

  async update(
    id: number,
    dto: UpdateGymManagerSpecializedInNutritionDto,
    userId: number,
  ): Promise<GymManagerSpecializedInNutritionEntity> {
    await this.repository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.repository.delete(id);
  }
}
