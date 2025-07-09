import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentEntity } from "../entity";
import { CreateContentDto, UpdateContentDto } from "../dto";
import { ContentContainerTypeEnum } from "../types";

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>
  ) {}

  async create(createContentDto: CreateContentDto): Promise<ContentEntity> {
    const content = this.contentRepository.create(createContentDto);
    return await this.contentRepository.save(content);
  }

  async findAll(
    containerType: ContentContainerTypeEnum,
    containerId: number,
    options: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<ContentEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.contentRepository.createQueryBuilder("content");

    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .where("content.containerType = :containerType", { containerType })
      .andWhere("content.containerId = :containerId", { containerId })
      .orderBy("content.createdAt", "DESC")
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page
      }
    };
  }

  async findOne(id: number): Promise<ContentEntity> {
    const content = await this.contentRepository.findOne({ where: { id } });
    if (!content) {
      throw new Error(`Content with ID ${id} not found`);
    }
    return content;
  }

  async update(id: number, updateContentDto: UpdateContentDto): Promise<ContentEntity> {
    const content = await this.findOne(id);
    Object.assign(content, updateContentDto);
    return await this.contentRepository.save(content);
  }

  async remove(id: number): Promise<void> {
    await this.contentRepository.delete(id);
  }
}
