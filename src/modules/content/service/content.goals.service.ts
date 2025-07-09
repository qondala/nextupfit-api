import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentGoalsEntity } from "../entity";
import { CreateContentGoalsDto, UpdateContentGoalsDto } from "../dto";

@Injectable()
export class ContentGoalsService {
  constructor(
    @InjectRepository(ContentGoalsEntity)
    private readonly repository: Repository<ContentGoalsEntity>,
  ) {}

  async create(dto: CreateContentGoalsDto): Promise<ContentGoalsEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentGoalsEntity>> {
    const { page = 1, limit = 10 } = options;
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
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

  async findOne(id: number): Promise<ContentGoalsEntity> {
    const entity = await this.repository.findOne({ where: { id }, relations: ["items"] });
    if (!entity) throw new Error(`Content goals ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateContentGoalsDto): Promise<ContentGoalsEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
