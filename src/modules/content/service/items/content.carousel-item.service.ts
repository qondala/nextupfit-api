import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentCarouselItemEntity } from "../../entity/items";
import { CreateContentCarouselItemDto, UpdateContentCarouselItemDto } from "../../dto";

@Injectable()
export class ContentCarouselItemService {
  constructor(
    @InjectRepository(ContentCarouselItemEntity)
    private readonly repository: Repository<ContentCarouselItemEntity>,
  ) {}

  async create(dto: CreateContentCarouselItemDto): Promise<ContentCarouselItemEntity> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentCarouselItemEntity>> {
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

  async findOne(id: number): Promise<ContentCarouselItemEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new Error(`Carousel item ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateContentCarouselItemDto): Promise<ContentCarouselItemEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
