import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentCarouselEntity } from "../entity";
import { CreateContentCarouselDto, UpdateContentCarouselDto } from "../dto";

@Injectable()
export class ContentCarouselService {
  constructor(
    @InjectRepository(ContentCarouselEntity)
    private readonly repository: Repository<ContentCarouselEntity>,
  ) {}

  async create(dto: CreateContentCarouselDto): Promise<ContentCarouselEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(contentId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentCarouselEntity>> {
    const { page = 1, limit = 10 } = options;
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
      where: { contentId },
      relations: ["items"],
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

  async findOne(id: number): Promise<ContentCarouselEntity> {
    const entity = await this.repository.findOne({ where: { id }, relations: ["items"] });
    return entity;
  }

  async findOneWithContentId(contentId: number): Promise<ContentCarouselEntity> {
    const entity = await this.repository.findOne({ where: { contentId }, relations: ["items"] });
    return entity;
  }

  async update(id: number, dto: UpdateContentCarouselDto): Promise<ContentCarouselEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
