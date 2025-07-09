import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseSociologyGroupEntity } from '../entity';
import { CreateBaseSociologyGroupDto, UpdateBaseSociologyGroupDto } from '../dto';

@Injectable()
export class BaseSociologyGroupService {
  constructor(
    @InjectRepository(BaseSociologyGroupEntity)
    private readonly repository: Repository<BaseSociologyGroupEntity>,
  ) {}

  async create(dto: CreateBaseSociologyGroupDto): Promise<BaseSociologyGroupEntity> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseSociologyGroupEntity>> {
    const qb = this.repository.createQueryBuilder('group');

    qb.skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('group.id', 'DESC');

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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseSociologyGroupEntity>> {
    const searchTerm = `%${query}%`;

    const [items, total] = await this.repository.findAndCount({
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

  async findOne(id: number): Promise<BaseSociologyGroupEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateBaseSociologyGroupDto): Promise<BaseSociologyGroupEntity | null> {
    const result = await this.repository.update(id, dto);
    if (result.affected === 0) return null;
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const res = await this.repository.delete(id);
    return res.affected > 0;
  }
}
