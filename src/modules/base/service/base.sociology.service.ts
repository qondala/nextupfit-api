import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseSociologyEntity } from '../entity';
import { CreateBaseSociologyDto, UpdateBaseSociologyDto } from '../dto';

@Injectable()
export class BaseSociologyService {
  constructor(
    @InjectRepository(BaseSociologyEntity)
    private readonly baseSociologyRepository: Repository<BaseSociologyEntity>,
  ) {}

  async create(createDto: CreateBaseSociologyDto): Promise<BaseSociologyEntity> {
    const entity = this.baseSociologyRepository.create(createDto);
    return this.baseSociologyRepository.save(entity);
  }

  async findAll(
    options: PaginationOptionsDto,
    createdByUserId?: number,
  ): Promise<PaginatedResponseDto<BaseSociologyEntity>> {
    const qb = this.baseSociologyRepository.createQueryBuilder('sociology');

    if (createdByUserId) {
      qb.where('sociology.createdByUserId = :createdByUserId', { createdByUserId });
    }

    qb.skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('sociology.id', 'DESC');

    const [items, total] = await qb.getManyAndCount();

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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseSociologyEntity>> {
    const searchTerm = `%${query}%`;

    const [items, total] = await this.baseSociologyRepository.findAndCount({
      where: [
        { name: Like(searchTerm) },
        { code: Like(searchTerm) },
        { description: Like(searchTerm) },
      ],
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { id: 'DESC' },
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

  async findOne(id: number): Promise<BaseSociologyEntity | null> {
    return this.baseSociologyRepository.findOneBy({ id });
  }

  async findByCode(code: string): Promise<BaseSociologyEntity | null> {
    return this.baseSociologyRepository.findOneBy({ code });
  }

  async update(id: number, updateDto: UpdateBaseSociologyDto): Promise<BaseSociologyEntity | null> {
    const result = await this.baseSociologyRepository.update(id, updateDto);

    if (result.affected === 0) {
      return null;
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseSociologyRepository.delete(id);
    return result.affected > 0;
  }
}
