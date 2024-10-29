import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
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
    return this.usersRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.coach", "coach")
      .getMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.buildUserFindOneQuery(id).getOne();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  private buildUserFindOneQuery(id: number): SelectQueryBuilder<User> {
    return this.usersRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.trainingSessions", "trainingSessions")
      .leftJoinAndSelect("user.coach", "coachs")
      .leftJoinAndSelect("trainingSessions.session", "session")
      .leftJoinAndSelect("user.challenges", "challenges")
      .leftJoinAndSelect(
        "challenges.challenge",
        "challenge",
        "challenge.id = challenges.challengeId",
      )
      .leftJoinAndSelect("challenge.sessions", "challengeSessions")
      .leftJoinAndSelect("challenge.coach", "coach")
      .leftJoinAndSelect("user.coachFollows", "coachFollows")
      .leftJoinAndSelect("coachFollows.coach", "coaches")
      .leftJoinAndSelect("user.coachRatings", "coachRatings")
      .leftJoinAndSelect("user.bodyMeasurements", "bodyMeasurements")
      .leftJoinAndSelect("user.userSubscriptions", "userSubscriptions")
      .leftJoinAndSelect("user.affiliateLinks", "affiliateLinks")
      .leftJoinAndSelect("user.userNutritionProgress", "userNutritionProgress")
      .leftJoinAndSelect("user.userNutrition", "userNutrition")
      .leftJoinAndSelect("user.userPrograms", "userPrograms")
      .leftJoinAndSelect("user.payments", "payments")
      .leftJoinAndSelect("payments.contents", "contents")
      .where("user.id = :id", { id });
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
    await this.usersRepository.delete(id); // Utilisez `await` pour attendre la suppression
    return { message: "User successfully deleted" }; // Renvoyez un message de succès
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.buildUserSearchQuery(query).getMany();
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

  private buildUserSearchQuery(query: string): SelectQueryBuilder<User> {
    const qb = this.usersRepository.createQueryBuilder("user");

    qb.leftJoinAndSelect("user.coach", "coach");

    qb.where("user.firstName LIKE :query", { query: `%${query}%` })
      .orWhere("user.lastName LIKE :query", { query: `%${query}%` })
      .orWhere("user.email LIKE :query", { query: `%${query}%` });

    return qb;
  }
}
