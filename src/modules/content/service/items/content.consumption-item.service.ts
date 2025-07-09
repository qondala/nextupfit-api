import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentConsumptionItemEntity } from "../../entity/items";
import { CreateContentConsumptionItemDto, UpdateContentConsumptionItemDto } from "../../dto";

@Injectable()
export class ContentConsumptionItemService {
  constructor(
    @InjectRepository(ContentConsumptionItemEntity)
    private readonly repository: Repository<ContentConsumptionItemEntity>,
  ) {}

  async create(dto: CreateContentConsumptionItemDto): Promise<ContentConsumptionItemEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentConsumptionItemEntity>> {
    const { page = 1, limit = 10 } = options;
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { position: "ASC" },
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

  async findOne(id: number): Promise<ContentConsumptionItemEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new Error(`Consumption item ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateContentConsumptionItemDto): Promise<ContentConsumptionItemEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
