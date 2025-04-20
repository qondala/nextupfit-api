import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as argon2 from "argon2";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { UserEntity } from "../entity";
import { CreateUserDto, UpdateUserDto } from "../dto";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {

    if (await this.userWithEmailExists(createUserDto.email)) {
      throw new ConflictException(`User with email ${createUserDto.email} already exists`);
    }

    const hashedPassword = await argon2.hash(createUserDto.password);

    const user = this.userRepository.create({
      ...createUserDto,
      passwordHash: hashedPassword,
    });


    return await this.userRepository.save(user);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      items: users,
      meta: {
        totalItems: total,
        itemCount: users.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      }
    };
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  async userWithEmailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user != null;
  }


  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository
      .createQueryBuilder("user")
      .where("user.email ILIKE :query OR user.firstName ILIKE :query OR user.lastName ILIKE :query", { query: `%${query}%` })
      .skip(skip)
      .take(limit)
      .orderBy("user.createdAt", "DESC")
      .getManyAndCount();

    return {
      items: users,
      meta: {
        totalItems: total,
        itemCount: users.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      }
    };
  }
}
