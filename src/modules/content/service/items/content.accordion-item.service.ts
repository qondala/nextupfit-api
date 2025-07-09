import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentAccordionItemEntity } from "../../entity/items";
import {
  CreateContentAccordionItemDto,
  UpdateContentAccordionItemDto,
} from "../../dto";

@Injectable()
export class ContentAccordionItemService {
  constructor(
    @InjectRepository(ContentAccordionItemEntity)
    private readonly accordionItemRepository: Repository<ContentAccordionItemEntity>,
  ) {}

  async create(dto: CreateContentAccordionItemDto): Promise<ContentAccordionItemEntity> {
    const entity = this.accordionItemRepository.create(dto);
    return await this.accordionItemRepository.save(entity);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentAccordionItemEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.accordionItemRepository.findAndCount({
      skip,
      take: limit,
      order: { position: "ASC" },
    });

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

  async findOne(id: number): Promise<ContentAccordionItemEntity> {
    const entity = await this.accordionItemRepository.findOne({ where: { id } });
    if (!entity) {
      throw new Error(`Content accordion item with ID ${id} not found`);
    }
    return entity;
  }

  async update(id: number, dto: UpdateContentAccordionItemDto): Promise<ContentAccordionItemEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return await this.accordionItemRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.accordionItemRepository.delete(id);
  }
}
