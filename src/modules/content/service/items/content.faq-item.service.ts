import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentFaqItemEntity } from "../../entity/items";
import {
  CreateContentFaqItemDto,
  UpdateContentFaqItemDto,
} from "../../dto";

@Injectable()
export class ContentFaqItemService {
  constructor(
    @InjectRepository(ContentFaqItemEntity)
    private readonly repository: Repository<ContentFaqItemEntity>,
  ) {}

  async create(dto: CreateContentFaqItemDto): Promise<ContentFaqItemEntity> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentFaqItemEntity>> {
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

  async findOne(id: number): Promise<ContentFaqItemEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new Error(`FAQ item ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateContentFaqItemDto): Promise<ContentFaqItemEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
