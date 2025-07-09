import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentChallengesItemEntity } from "../../entity/items";
import {
  CreateContentChallengesItemDto,
  UpdateContentChallengesItemDto,
} from "../../dto";

@Injectable()
export class ContentChallengesItemService {
  constructor(
    @InjectRepository(ContentChallengesItemEntity)
    private readonly repository: Repository<ContentChallengesItemEntity>,
  ) {}

  async create(dto: CreateContentChallengesItemDto): Promise<ContentChallengesItemEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentChallengesItemEntity>> {
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

  async findOne(id: number): Promise<ContentChallengesItemEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new Error(`Challenges item ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateContentChallengesItemDto): Promise<ContentChallengesItemEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
