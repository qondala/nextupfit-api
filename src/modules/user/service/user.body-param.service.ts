import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { UserBodyParamEntity } from "../entity";
import { CreateUserBodyParamDto, UpdateUserBodyParamDto } from "../dto";
import { ErrorResponseException, ErrorResponseExceptionType, SystemStatusCode } from "@app/common/exceptions";


@Injectable()
export class UserBodyParamService {
  constructor(
    @InjectRepository(UserBodyParamEntity)
    private readonly userBodyParamRepository: Repository<UserBodyParamEntity>
  ) {}

  async create(createUserBodyParamDto: CreateUserBodyParamDto): Promise<UserBodyParamEntity> {
    const userBodyParam = this.userBodyParamRepository.create(createUserBodyParamDto);
    return await this.userBodyParamRepository.save(userBodyParam);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserBodyParamEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, count] = await this.userBodyParamRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      items,
      meta: {
        totalItems: count,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      }
    };
  }

  async findOne(id: number): Promise<UserBodyParamEntity> {
    const userBodyParam = await this.userBodyParamRepository.findOne({ where: { id } });
    if (!userBodyParam) {
      throw new ErrorResponseException(
        ErrorResponseExceptionType.DATABASE,
        `User body param with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
        SystemStatusCode.NOT_FOUND
      );
    }
    return userBodyParam;
  }

  async getUserBodyParams(userId: number): Promise<PaginatedResponseDto<UserBodyParamEntity>> {
    const userBodyParams = await this.userBodyParamRepository.find({ where: { userId } });
    return {
      items: userBodyParams,
      meta: {
        totalItems: userBodyParams.length,
        itemCount: userBodyParams.length,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1
      }
    };
  }

  async update(id: number, updateUserBodyParamDto: UpdateUserBodyParamDto): Promise<UserBodyParamEntity> {
    const userBodyParam = await this.findOne(id);
    Object.assign(userBodyParam, updateUserBodyParamDto);
    return await this.userBodyParamRepository.save(userBodyParam);
  }


  async remove(id: number): Promise<void> {
    const userBodyParam = await this.findOne(id);
    await this.userBodyParamRepository.remove(userBodyParam);
  }

  async findByUserId(userId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserBodyParamEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userBodyParamRepository.findAndCount({
      where: { userId },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      }
    };
  }
}
