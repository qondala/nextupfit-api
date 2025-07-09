import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";

import { ContentGalleryEntity } from "../entity";
import {
  CreateContentGalleryDto,
  DetailsContentGalleryDto,
  UpdateContentGalleryDto,
  PaginatedDetailsContentGalleryDto
} from "../dto";

@Injectable()
export class ContentGalleryService {
  constructor(
    @InjectRepository(ContentGalleryEntity)
    private readonly repository: Repository<ContentGalleryEntity>
  ) {}

  async create(createDto: CreateContentGalleryDto): Promise<DetailsContentGalleryDto> {
    const entity = this.repository.create(createDto);
    const savedEntity = await this.repository.save(entity);
    return savedEntity;
  }

  async findAll(paginationQuery: PaginationOptionsDto): Promise<PaginatedDetailsContentGalleryDto> {
    const { page, limit } = paginationQuery;
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      skip,
      take: limit,
      order: { id: "ASC" },
      relations: ["items"],
    });

    return {
      items: data,
      meta: {
        totalItems: total,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<DetailsContentGalleryDto> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ["items"],
    });

    return entity;
  }

  async findOneWithContentId(contentId: number): Promise<DetailsContentGalleryDto> {
    const entity = await this.repository.findOne({
      where: { contentId },
      relations: ["items"],
    });

    return entity;
  }

  async update(id: number, updateDto: UpdateContentGalleryDto): Promise<DetailsContentGalleryDto> {
    const entity = await this.findOne(id);
    
    Object.assign(entity, updateDto);
    const updatedEntity = await this.repository.save(entity);
    
    return updatedEntity;
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findByContentId(contentId: number, paginationQuery: PaginationOptionsDto): Promise<PaginatedDetailsContentGalleryDto> {
    const { page, limit } = paginationQuery;
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      where: { contentId },
      skip,
      take: limit,
      order: { id: "ASC" },
      relations: ["items"],
    });

    return {
      items: data,
      meta: {
        totalItems: total,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }
}
