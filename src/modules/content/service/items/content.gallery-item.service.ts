import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  PaginatedResponseDto,
  PaginationOptionsDto
} from "@app/common/dto";

import { ContentGalleryItemEntity } from "../../entity";

import {
  CreateContentGalleryItemDto,
  UpdateContentGalleryItemDto,
  DetailsContentGalleryItemDto
} from "../../dto";

@Injectable()
export class ContentGalleryItemService {
  constructor(
    @InjectRepository(ContentGalleryItemEntity)
    private readonly repository: Repository<ContentGalleryItemEntity>
  ) {}

  async create(createDto: CreateContentGalleryItemDto): Promise<ContentGalleryItemEntity> {
    const entity = this.repository.create(createDto);
    const savedEntity = await this.repository.save(entity);
    return savedEntity;
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentGalleryItemEntity>> {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.repository.findAndCount({
      skip,
      take: limit,
      order: { position: "ASC", id: "ASC" },
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

  async findOne(id: number): Promise<ContentGalleryItemEntity> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error(`Content gallery item with ID ${id} not found`);
    }

    return entity;
  }

  async update(id: number, updateDto: UpdateContentGalleryItemDto): Promise<ContentGalleryItemEntity> {
    const entity = await this.findOne(id);
    
    Object.assign(entity, updateDto);
    const updatedEntity = await this.repository.save(entity);
    
    return updatedEntity;
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findByContentGalleryId(contentGalleryId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentGalleryItemEntity>> {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.repository.findAndCount({
      where: { contentGalleryId },
      skip,
      take: limit,
      order: { position: "ASC", id: "ASC" },
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
}
