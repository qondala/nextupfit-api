import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { BaseCurrencyEntity } from "../entity";
import { CreateBaseCurrencyDto, UpdateBaseCurrencyDto } from "../dto";

@Injectable()
export class BaseCurrencyService {
  constructor(
    @InjectRepository(BaseCurrencyEntity)
    private readonly baseCurrencyRepository: Repository<BaseCurrencyEntity>,
  ) {}

  async create(createDto: CreateBaseCurrencyDto): Promise<BaseCurrencyEntity> {
    const newCurrency = this.baseCurrencyRepository.create(createDto);
    return this.baseCurrencyRepository.save(newCurrency);
  }

  async findAll(
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<BaseCurrencyEntity>> {
    const [items, total] = await this.baseCurrencyRepository.findAndCount({
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { id: "DESC" },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page,
      },
    };
  }

  async search(
    query: string,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<BaseCurrencyEntity>> {
    const searchTerm = `%${query}%`;
    const [items, total] = await this.baseCurrencyRepository.findAndCount({
      where: [
        { symbol: Like(searchTerm) },
        { acronym: Like(searchTerm) },
        { name: Like(searchTerm) },
      ],
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { id: "DESC" },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page,
      },
    };
  }

  async findOne(id: number): Promise<BaseCurrencyEntity | null> {
    return this.baseCurrencyRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateDto: UpdateBaseCurrencyDto,
  ): Promise<BaseCurrencyEntity | null> {
    const result = await this.baseCurrencyRepository.update(id, updateDto);
    if (result.affected === 0) {
      return null;
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseCurrencyRepository.delete(id);
    return result.affected > 0;
  }
}
