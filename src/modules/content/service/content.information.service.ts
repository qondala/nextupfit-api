import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ContentInformationEntity } from "../entity";
import {
  CreateContentInformationDto,
  UpdateContentInformationDto,
  DetailsContentInformationDto,
  PaginatedDetailsContentInformationDto,
} from "../dto";
import { PaginationOptionsDto, PaginatedResponseDto } from "@app/common/dto";

@Injectable()
export class ContentInformationService {
  constructor(
    @InjectRepository(ContentInformationEntity)
    private readonly repository: Repository<ContentInformationEntity>,
  ) {}

  async create(dto: CreateContentInformationDto): Promise<ContentInformationEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedDetailsContentInformationDto> {
    const { page = 1, limit = 10 } = options;
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
    });

    return {
      items: items as unknown as DetailsContentInformationDto[],
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    } as PaginatedDetailsContentInformationDto;
  }

  async findOne(id: number): Promise<ContentInformationEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateContentInformationDto): Promise<void> {
    await this.repository.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
