import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";
import { ContentRecipeEntity } from "../entity";
import {
  CreateContentRecipeDto,
  UpdateContentRecipeDto,
} from "../dto";

@Injectable()
export class ContentRecipeService {
  constructor(
    @InjectRepository(ContentRecipeEntity)
    private readonly repository: Repository<ContentRecipeEntity>,
  ) {}

  create(dto: CreateContentRecipeDto): Promise<ContentRecipeEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(
    { page = 1, limit = 10 }: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<ContentRecipeEntity>> {
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

  async findOne(id: number): Promise<ContentRecipeEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new Error(`Content recipe ${id} not found`);
    return entity;
  }

  async update(
    id: number,
    dto: UpdateContentRecipeDto,
  ): Promise<ContentRecipeEntity> {
    await this.repository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
