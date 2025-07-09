import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymHasManagerDto, UpdateGymHasManagerDto } from '../dto';
import { GymHasManagerEntity } from '../entity';
import { GymManagerRoleEnum, GymManagerSpecialityEnum, GymManagerStatusEnum } from '../types';

@Injectable()
export class GymHasManagerService {
  constructor(
    @InjectRepository(GymHasManagerEntity)
    private readonly gymHasManagerRepository: Repository<GymHasManagerEntity>,
  ) {}

  async create(createDto: CreateGymHasManagerDto): Promise<GymHasManagerEntity> {
    const entity = this.gymHasManagerRepository.create(createDto);
    return await this.gymHasManagerRepository.save(entity);
  }


  async findAllGymManagers(
    gymId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymHasManagerEntity>> {
    const queryBuilder = this.gymHasManagerRepository.createQueryBuilder('gymHasManager')
      .where('gymHasManager.gymId = :gymId', { gymId })
      .orderBy('gymHasManager.createdAt', 'DESC');

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

  async findAllManagerGyms(
    managerId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymHasManagerEntity>> {
    const queryBuilder = this.gymHasManagerRepository.createQueryBuilder('manager')
      .where('manager.managerId = :managerId', { managerId })
      .orderBy('manager.createdAt', 'DESC');

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


  async findOne(id: number): Promise<GymHasManagerEntity> {
    return await this.gymHasManagerRepository.findOne({
      where: { id },
      relations: [
        'gym',
        'manager',
      ]
    });
  }

  async findOneByManagerIdAndGymId(
    managerId: number,
    gymId: number
  ): Promise<GymHasManagerEntity> {
    return await this.gymHasManagerRepository.findOne({
      where: { managerId, gymId },
      relations: [
        'gym',
        'manager',
      ]
    });
  }

  async update(
    id: number,
    updateDto: UpdateGymHasManagerDto,
    gymId: number
  ): Promise<GymHasManagerEntity> {
    await this.gymHasManagerRepository.update(
      { id, gymId },
      updateDto
    );
    return this.findOne(id);
  }

  async updateByManagerIdAndGymId(
    managerId: number,
    gymId: number,
    updateDto: UpdateGymHasManagerDto
  ): Promise<GymHasManagerEntity> {
    await this.gymHasManagerRepository.update(
      { gymId, managerId },
      updateDto
    );
    return this.findOneByManagerIdAndGymId(managerId, gymId);
  }

  async updateStatus(id: number, status: GymManagerStatusEnum): Promise<void> {
    await this.gymHasManagerRepository.update(id, { status, lastStatusUpdate: new Date(), updatedAt: new Date() });
    return;
  }

  async updateStatusByManagerIdAndGymId(
    managerId: number,
    gymId: number,
    status: GymManagerStatusEnum
  ): Promise<void> {
    await this.gymHasManagerRepository.update(
      { gymId, managerId },
      { status, lastStatusUpdate: new Date(), updatedAt: new Date() }
    );
    return;
  }

  async updateRole(id: number, role: GymManagerRoleEnum): Promise<void> {
    await this.gymHasManagerRepository.update(id, { role, updatedAt: new Date() });
    return;
  }

  async updateRoleByManagerIdAndGymId(
    managerId: number,
    gymId: number,
    role: GymManagerRoleEnum
  ): Promise<void> {
    await this.gymHasManagerRepository.update(
      { gymId, managerId },
      { role, updatedAt: new Date() }
    );
    return;
  }
}
