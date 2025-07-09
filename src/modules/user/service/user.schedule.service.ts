
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";
import { PaginatedResponseDto } from "@app/common/dto";

import { CreateUserScheduleDto, UpdateUserScheduleDto } from "../dto";
import { UserScheduleEntity } from "../entity";

@Injectable()
export class UserScheduleService {

  constructor(
    @InjectRepository(UserScheduleEntity)
    private readonly userScheduleRepository: Repository<UserScheduleEntity>,
  ) {}
  
  async create(createUserScheduleDto: CreateUserScheduleDto): Promise<UserScheduleEntity> {
    const userSchedule = this.userScheduleRepository.create(createUserScheduleDto);
    return await this.userScheduleRepository.save(userSchedule);
  }

  async findAll(userId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserScheduleEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [userSchedules, total] = await this.userScheduleRepository.findAndCount({
      where: { userId },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      items: userSchedules,
      meta: {
        totalItems: total,
        itemCount: userSchedules.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      }
    };
  }

  async findOne(id: number): Promise<UserScheduleEntity> {
    const userSchedule = await this.userScheduleRepository.findOne({ where: { id } });
    if (!userSchedule) {
      throw new Error(`User schedule with ID ${id} not found`);
    }
    return userSchedule;
  }

  async update(id: number, updateUserScheduleDto: UpdateUserScheduleDto): Promise<UserScheduleEntity> {
    const userSchedule = await this.findOne(id);
    this.userScheduleRepository.merge(userSchedule, updateUserScheduleDto);
    return await this.userScheduleRepository.save(userSchedule);
  }

  async delete(id: number): Promise<void> {
    await this.userScheduleRepository.delete(id);
  }
}