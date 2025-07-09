import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";

import { ContentInformationEntity } from "../entity";
import {
  CreateContentInformationDto,
  UpdateContentInformationDto,
  PaginatedDetailsContentInformationDto,
} from "../dto";


@Injectable()
export class ContentInformationService {
  constructor(
    @InjectRepository(ContentInformationEntity)
    private readonly repository: Repository<ContentInformationEntity>,
  ) {}

  async create(dto: CreateContentInformationDto): Promise<ContentInformationEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(contentId: number, options: PaginationOptionsDto): Promise<PaginatedDetailsContentInformationDto> {
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

  async findOne(id: number): Promise<ContentInformationEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneWithContentId(contentId: number): Promise<ContentInformationEntity | null> {
    return this.repository.findOne({ where: { contentId } });
  }

  async update(id: number, dto: UpdateContentInformationDto): Promise<void> {
    await this.repository.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
