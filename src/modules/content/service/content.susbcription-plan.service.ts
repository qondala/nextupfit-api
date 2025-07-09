import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentSusbcriptionPlanEntity } from "../entity";
import { CreateContentSusbcriptionPlanDto, UpdateContentSusbcriptionPlanDto } from "../dto";

@Injectable()
export class ContentSusbcriptionPlanService {
  constructor(
    @InjectRepository(ContentSusbcriptionPlanEntity)
    private readonly repository: Repository<ContentSusbcriptionPlanEntity>,
  ) {}

  async create(dto: CreateContentSusbcriptionPlanDto): Promise<ContentSusbcriptionPlanEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentSusbcriptionPlanEntity>> {
    const { page = 1, limit = 10 } = options;
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
    });

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

  async findOne(id: number): Promise<ContentSusbcriptionPlanEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new Error(`Content subscription plan ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateContentSusbcriptionPlanDto): Promise<ContentSusbcriptionPlanEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
