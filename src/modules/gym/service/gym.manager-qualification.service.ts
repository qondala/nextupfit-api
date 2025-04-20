import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymManagerQualificationDto, UpdateGymManagerQualificationDto } from '../dto';
import { GymManagerQualificationEntity } from '../entity';

@Injectable()
export class GymManagerQualificationService {
  constructor(
    @InjectRepository(GymManagerQualificationEntity)
    private readonly gymManagerQualificationRepository: Repository<GymManagerQualificationEntity>,
  ) {}

  async create(createDto: CreateGymManagerQualificationDto): Promise<GymManagerQualificationEntity> {
    const qualification = this.gymManagerQualificationRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.gymManagerQualificationRepository.save(qualification);
  }

  async findByManager(
    managerId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerQualificationEntity>> {
    const queryBuilder = this.gymManagerQualificationRepository.createQueryBuilder('qualification')
      .where('qualification.managerId = :managerId', { managerId })
      .orderBy('qualification.yearObtained', 'DESC');

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page
      }
    };
  }

  async findOne(id: number): Promise<GymManagerQualificationEntity> {
    return await this.gymManagerQualificationRepository.findOne({
      where: { id },
      relations: ['manager']
    });
  }

  async update(id: number, updateDto: UpdateGymManagerQualificationDto): Promise<GymManagerQualificationEntity> {
    await this.gymManagerQualificationRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.gymManagerQualificationRepository.delete(id);
  }
}
