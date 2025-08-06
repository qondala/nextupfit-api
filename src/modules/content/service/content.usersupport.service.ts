import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentUsersupportEntity } from "../entity";
import {
  CreateContentUsersupportDto,
  UpdateContentUsersupportDto,
} from "../dto";

@Injectable()
export class ContentUsersupportService {
  constructor(
    @InjectRepository(ContentUsersupportEntity)
    private readonly repository: Repository<ContentUsersupportEntity>,
  ) {}

  async create(
    dto: CreateContentUsersupportDto,
  ): Promise<ContentUsersupportEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(
    contentId: number,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<ContentUsersupportEntity>> {
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

  async findOne(id: number): Promise<ContentUsersupportEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity;
  }

  async findOneWithContentId(
    contentId: number,
  ): Promise<ContentUsersupportEntity | null> {
    return this.repository.findOne({ where: { contentId } });
  }

  async update(
    id: number,
    dto: UpdateContentUsersupportDto,
  ): Promise<ContentUsersupportEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
