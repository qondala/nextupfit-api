import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ContentInstructionsEntity } from "../entity";
import {
  CreateContentInstructionsDto,
  UpdateContentInstructionsDto,
  DetailsContentInstructionsDto,
  PaginatedDetailsContentInstructionsDto,
} from "../dto";
import { PaginationOptionsDto, PaginatedResponseDto } from "@app/common/dto";

@Injectable()
export class ContentInstructionsService {
  constructor(
    @InjectRepository(ContentInstructionsEntity)
    private readonly repository: Repository<ContentInstructionsEntity>,
  ) {}

  async create(dto: CreateContentInstructionsDto): Promise<ContentInstructionsEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedDetailsContentInstructionsDto> {
    const { page = 1, limit = 10 } = options;
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
    });

    return {
      items: items as unknown as DetailsContentInstructionsDto[],
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    } as PaginatedDetailsContentInstructionsDto;
  }

  async findOne(id: number): Promise<ContentInstructionsEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateContentInstructionsDto): Promise<void> {
    await this.repository.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
