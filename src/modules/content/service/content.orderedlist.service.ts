import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentOrderedlistEntity } from "../entity";
import { CreateContentOrderedlistDto, UpdateContentOrderedlistDto } from "../dto";

@Injectable()
export class ContentOrderedlistService {
  constructor(
    @InjectRepository(ContentOrderedlistEntity)
    private readonly repository: Repository<ContentOrderedlistEntity>,
  ) {}

  async create(dto: CreateContentOrderedlistDto): Promise<ContentOrderedlistEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentOrderedlistEntity>> {
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

  async findOne(id: number): Promise<ContentOrderedlistEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new Error(`Content ordered list ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateContentOrderedlistDto): Promise<ContentOrderedlistEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
