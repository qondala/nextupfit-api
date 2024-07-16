import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as argon2 from "argon2";
import { User } from "../../entities/user.entity";
import { Coach } from "../../entities/coach.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await argon2.hash(createUserDto.password);
    const user = this.usersRepository.create({
      ...createUserDto,
      passwordHash: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: [
        "coach",
        "goals",
        "bodyMeasurements",
        "contentRatings",
        "contentReviews",
        "notifications",
        "coachFollows",
        "recommendations",
        "userPrograms",
        "trainingSessions",
        "userNutrition",
        "userNutritionProgress",
        "affiliateLinks",
        "payments",
        "userSubscriptions",
        "sessionReviews",
        "nutritionProgramReviews",
      ],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async searchUsers(query: string): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: [
        { firstName: `%${query}%` },
        { lastName: `%${query}%` },
        { email: `%${query}%` },
      ],
      relations: [
        "coach",
        "goals",
        "bodyMeasurements",
        "contentRatings",
        "contentReviews",
        "notifications",
        "coachFollows",
        "recommendations",
        "userPrograms",
        "trainingSessions",
        "userNutrition",
        "userNutritionProgress",
        "affiliateLinks",
        "payments",
        "userSubscriptions",
        "sessionReviews",
        "nutritionProgramReviews",
      ],
    });
    return users;
  }

  async createCoach(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await argon2.hash(createUserDto.password);
    const user = this.usersRepository.create({
      ...createUserDto,
      passwordHash: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);

    const coach = this.coachRepository.create({
      user: savedUser,
    });

    await this.coachRepository.save(coach);
    return savedUser;
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
