import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ContentInstructionsEntity } from "../entity";
import {
  CreateContentInstructionsDto,
  UpdateContentInstructionsDto,
  PaginatedDetailsContentInstructionsDto,
} from "../dto";
import { PaginationOptionsDto } from "@app/common/dto";

@Injectable()
export class ContentInstructionsService {
  constructor(
    @InjectRepository(ContentInstructionsEntity)
    private readonly repository: Repository<ContentInstructionsEntity>,
  ) {}

  async create(dto: CreateContentInstructionsDto): Promise<ContentInstructionsEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(contentId: number, options: PaginationOptionsDto): Promise<PaginatedDetailsContentInstructionsDto> {
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

  async findOne(id: number): Promise<ContentInstructionsEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneWithContentId(contentId: number): Promise<ContentInstructionsEntity | null> {
    return this.repository.findOne({ where: { contentId } });
  }

  async update(id: number, dto: UpdateContentInstructionsDto): Promise<void> {
    await this.repository.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
