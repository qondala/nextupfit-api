import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentGoalsItemEntity } from "../../entity/items";
import {
  CreateContentGoalsItemDto,
  UpdateContentGoalsItemDto,
} from "../../dto";

@Injectable()
export class ContentGoalsItemService {
  constructor(
    @InjectRepository(ContentGoalsItemEntity)
    private readonly repository: Repository<ContentGoalsItemEntity>,
  ) {}

  async create(dto: CreateContentGoalsItemDto): Promise<ContentGoalsItemEntity> {
    const entity = this.repository.create(dto as unknown as ContentGoalsItemEntity);
    return this.repository.save(entity);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentGoalsItemEntity>> {
    const { page = 1, limit = 10 } = options;
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "ASC" },
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

  async findOne(id: number): Promise<ContentGoalsItemEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new Error(`Goals item ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateContentGoalsItemDto): Promise<ContentGoalsItemEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
