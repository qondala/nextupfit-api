import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentSusbcriptionPlanItemEntity } from "../../entity";
import {
  CreateContentSusbcriptionPlanItemDto,
  UpdateContentSusbcriptionPlanItemDto,
} from "../../dto";


@Injectable()
export class ContentSusbcriptionPlanItemService {
  constructor(
    @InjectRepository(ContentSusbcriptionPlanItemEntity)
    private readonly repository: Repository<ContentSusbcriptionPlanItemEntity>,
  ) {}

  async create(
    dto: CreateContentSusbcriptionPlanItemDto,
  ): Promise<ContentSusbcriptionPlanItemEntity> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentSusbcriptionPlanItemEntity>> {
    const { page = 1, limit = 10 } = options;
    const [items, totalItems] = await this.repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
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

  async findOne(id: number): Promise<ContentSusbcriptionPlanItemEntity> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(
    id: number,
    dto: UpdateContentSusbcriptionPlanItemDto,
  ): Promise<ContentSusbcriptionPlanItemEntity> {
    await this.repository.update({ id }, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}
