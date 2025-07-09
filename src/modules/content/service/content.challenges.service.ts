import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentChallengesEntity } from "../entity";
import { CreateContentChallengesDto, UpdateContentChallengesDto } from "../dto";

@Injectable()
export class ContentChallengesService {
  constructor(
    @InjectRepository(ContentChallengesEntity)
    private readonly repository: Repository<ContentChallengesEntity>,
  ) {}

  async create(dto: CreateContentChallengesDto): Promise<ContentChallengesEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentChallengesEntity>> {
    const { page = 1, limit = 10 } = options;
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
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

  async findOne(id: number): Promise<ContentChallengesEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new Error(`Content challenges ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateContentChallengesDto): Promise<ContentChallengesEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
