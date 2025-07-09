import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";

import { ContentImageEntity } from "../entity";
import {
  CreateContentImageDto,
  UpdateContentImageDto,
  PaginatedDetailsContentImageDto,
} from "../dto";

@Injectable()
export class ContentImageService {
  constructor(
    @InjectRepository(ContentImageEntity)
    private readonly repository: Repository<ContentImageEntity>,
  ) {}

  async create(dto: CreateContentImageDto): Promise<ContentImageEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(contentId: number, options: PaginationOptionsDto): Promise<PaginatedDetailsContentImageDto> {
    const { page = 1, limit = 10 } = options;
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
      where: { contentId },
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

  async findOne(id: number): Promise<ContentImageEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneWithContentId(contentId: number): Promise<ContentImageEntity | null> {
    return this.repository.findOne({ where: { contentId } });
  }

  async update(id: number, dto: UpdateContentImageDto): Promise<void> {
    await this.repository.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
