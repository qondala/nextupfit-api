import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentSusbcriptionPlanEntity } from "../entity";
import {
  CreateContentSusbcriptionPlanDto,
  UpdateContentSusbcriptionPlanDto,
} from "../dto";

@Injectable()
export class ContentSusbcriptionPlanService {
  constructor(
    @InjectRepository(ContentSusbcriptionPlanEntity)
    private readonly repository: Repository<ContentSusbcriptionPlanEntity>,
  ) {}

  async create(
    dto: CreateContentSusbcriptionPlanDto,
  ): Promise<ContentSusbcriptionPlanEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(
    contentId: number,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<ContentSusbcriptionPlanEntity>> {
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

  async findOne(id: number): Promise<ContentSusbcriptionPlanEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ["items"],
    });
    return entity;
  }

  async findOneWithContentId(
    contentId: number,
  ): Promise<ContentSusbcriptionPlanEntity | null> {
    return this.repository.findOne({
      where: { contentId },
      relations: ["items"],
    });
  }

  async update(
    id: number,
    dto: UpdateContentSusbcriptionPlanDto,
  ): Promise<ContentSusbcriptionPlanEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
