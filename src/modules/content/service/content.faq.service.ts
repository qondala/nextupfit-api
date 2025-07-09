import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentFaqEntity } from "../entity";
import { CreateContentFaqDto, UpdateContentFaqDto } from "../dto";

@Injectable()
export class ContentFaqService {
  constructor(
    @InjectRepository(ContentFaqEntity)
    private readonly repository: Repository<ContentFaqEntity>,
  ) {}

  async create(dto: CreateContentFaqDto): Promise<ContentFaqEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentFaqEntity>> {
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

  async findOne(id: number): Promise<ContentFaqEntity> {
    const entity = await this.repository.findOne({ where: { id }, relations: ["items"] });
    if (!entity) throw new NotFoundException(`Content FAQ ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateContentFaqDto): Promise<ContentFaqEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
