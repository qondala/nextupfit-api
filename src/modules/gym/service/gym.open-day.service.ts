import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGymOpenDayDto, UpdateGymOpenDayDto } from '../dto';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';
import { GymOpenDayEntity } from '../entity';
import { BaseWeekDaysEnum } from '@app/module/base/types';

@Injectable()
export class GymOpenDayService {
  constructor(
    @InjectRepository(GymOpenDayEntity)
    private readonly gymOpenDayRepository: Repository<GymOpenDayEntity>,
  ) {}

  async create(createDto: CreateGymOpenDayDto): Promise<GymOpenDayEntity> {

    if (await this.isOpeningDay(createDto.gymId, createDto.day)) {
      throw new ConflictException(`${createDto.day} is already an opening day in Gym ${createDto.gymId}`);
    }

    const membership = this.gymOpenDayRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.gymOpenDayRepository.save(membership);
  }

  async findOne(id: number): Promise<GymOpenDayEntity> {
    return await this.gymOpenDayRepository.findOne({
      where: { id }
    });
  }

  async isOpeningDay(gymId: number, day: BaseWeekDaysEnum): Promise<boolean> {
    const openings = await this.gymOpenDayRepository.find({
      where: { gymId, day }
    });
    return openings.length > 0;
  }

  async findByGym(
    gymId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymOpenDayEntity>> {
        const queryBuilder = this.gymOpenDayRepository
      .createQueryBuilder('openDay')
      .where('openDay.gymId = :gymId', { gymId })
      .orderBy('openDay.createdAt', 'DESC');

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
        currentPage: paginationOptions.page,
      },
    };
  }

  async update(id: number, updateDto: UpdateGymOpenDayDto): Promise<GymOpenDayEntity> {

    if (await this.isOpeningDay(updateDto.gymId, updateDto.day)) {
      throw new ConflictException(`${updateDto.day} is already an opening day in Gym ${updateDto.gymId}`);
    }

    await this.gymOpenDayRepository.update(
      { id },
      updateDto
    );
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.gymOpenDayRepository.delete({ id });
  }
}
