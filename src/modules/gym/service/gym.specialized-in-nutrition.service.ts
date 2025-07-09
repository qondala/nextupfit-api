import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  CreateGymSpecializedInNutritionDto,
  UpdateGymSpecializedInNutritionDto,
} from "../dto";
import { GymSpecializedInNutritionEntity } from "../entity";

@Injectable()
export class GymSpecializedInNutritionService {
  constructor(
    @InjectRepository(GymSpecializedInNutritionEntity)
    private readonly repository: Repository<GymSpecializedInNutritionEntity>,
  ) {}

  async create(dto: CreateGymSpecializedInNutritionDto): Promise<GymSpecializedInNutritionEntity> {
    const record = this.repository.create({ ...dto, createdAt: new Date() });
    return this.repository.save(record);
  }

  async findByGym(
    gymId: number,
    { page = 1, limit = 10 }: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymSpecializedInNutritionEntity>> {
    const qb = this.repository.createQueryBuilder("nut")
      .where("nut.gymId = :gymId", { gymId })
      .orderBy("nut.createdAt", "DESC");

    const skip = (page - 1) * limit;
    const [items, totalItems] = await qb.skip(skip).take(limit).getManyAndCount();
    const totalPages = Math.ceil(totalItems / limit);

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

  async findOne(id: number): Promise<GymSpecializedInNutritionEntity> {
    return this.repository.findOne({ where: { id }, relations: ["nutrition"] });
  }

  async update(id: number, dto: UpdateGymSpecializedInNutritionDto): Promise<GymSpecializedInNutritionEntity> {
    await this.repository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
