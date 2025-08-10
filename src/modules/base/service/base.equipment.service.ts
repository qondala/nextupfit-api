import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { BaseEquipmentEntity } from "../entity";
import { CreateBaseEquipmentDto, UpdateBaseEquipmentDto } from "../dto";

@Injectable()
export class BaseEquipmentService {
  constructor(
    @InjectRepository(BaseEquipmentEntity)
    private readonly baseEquipmentRepository: Repository<BaseEquipmentEntity>,
  ) {}

  async create(
    createBaseEquipmentDto: CreateBaseEquipmentDto,
  ): Promise<BaseEquipmentEntity> {
    const newEquipment = this.baseEquipmentRepository.create(
      createBaseEquipmentDto,
    );
    return this.baseEquipmentRepository.save(newEquipment);
  }

  async findAll(
    options: PaginationOptionsDto,
    usageId?: number,
  ): Promise<PaginatedResponseDto<BaseEquipmentEntity>> {
    const queryBuilder =
      this.baseEquipmentRepository.createQueryBuilder("equipment");

    queryBuilder.leftJoinAndSelect("equipment.usage", "usage");

    if (usageId) {
      queryBuilder.where("equipment.usageId = :usageId", { usageId });
    }

    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy("equipment.id", "DESC");

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page,
      },
    };
  }

  async findOne(id: number): Promise<BaseEquipmentEntity | null> {
    return this.baseEquipmentRepository.findOne({
      where: { id },
      relations: ["usage"],
    });
  }

  async update(
    id: number,
    updateBaseEquipmentDto: UpdateBaseEquipmentDto,
  ): Promise<BaseEquipmentEntity | null> {
    const result = await this.baseEquipmentRepository.update(
      id,
      updateBaseEquipmentDto,
    );

    if (result.affected === 0) {
      return null;
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseEquipmentRepository.delete(id);
    return result.affected > 0;
  }
}
