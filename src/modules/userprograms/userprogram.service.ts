import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserProgram } from "../../entities/user-program.entity";
import { Repository } from "typeorm";
import { CreateUserProgramDto } from "./dto/create-userprogram.dto";
import { UpdateUserProgramDto } from "./dto/update-userprogram.dto";

@Injectable()
export class UserProgramsService {
  constructor(
    @InjectRepository(UserProgram)
    private userProgramsRepository: Repository<UserProgram>,
  ) {}

  async create(
    createUserProgramDto: CreateUserProgramDto,
    userId: number,
  ): Promise<UserProgram> {
    const userProgram = this.userProgramsRepository.create({
      ...createUserProgramDto,
      user: { id: userId },
      content: { id: createUserProgramDto.contentId },
    });
    return this.userProgramsRepository.save(userProgram);
  }

  async findAll(): Promise<UserProgram[]> {
    return this.userProgramsRepository.find({
      relations: ["user", "content", "performanceRecords"],
    });
  }

  async findOne(id: number): Promise<UserProgram> {
    const userProgram = await this.userProgramsRepository.findOne({
      where: { id },
      relations: ["user", "content", "performanceRecords"],
    });
    if (!userProgram) {
      throw new NotFoundException(`User program with ID ${id} not found`);
    }
    return userProgram;
  }

  async update(
    id: number,
    updateUserProgramDto: UpdateUserProgramDto,
    userId: number,
  ): Promise<UserProgram> {
    const userProgram = await this.userProgramsRepository.preload({
      id,
      ...updateUserProgramDto,
    });
    if (!userProgram) {
      throw new NotFoundException(`User program with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier le programme
    if (userProgram.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this user program",
      );
    }
    return this.userProgramsRepository.save(userProgram);
  }

  async remove(id: number, userId: number): Promise<void> {
    const userProgram = await this.userProgramsRepository.findOne({
      where: { id },
    });
    if (!userProgram) {
      throw new NotFoundException(`User program with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer le programme
    if (userProgram.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this user program",
      );
    }
    await this.userProgramsRepository.delete(id);
  }

  async searchUserPrograms(query: string): Promise<UserProgram[]> {
    const userPrograms = await this.userProgramsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { content: { title: `%${query}%` } },
        { content: { description: `%${query}%` } },
      ],
      relations: ["user", "content", "performanceRecords"],
    });
    return userPrograms;
  }

  async findByUser(userId: number): Promise<UserProgram[]> {
    const userPrograms = await this.userProgramsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "content", "performanceRecords"],
    });
    if (!userPrograms) {
      throw new NotFoundException(`User programs for user ${userId} not found`);
    }
    return userPrograms;
  }

  async findByContent(contentId: number): Promise<UserProgram[]> {
    const userPrograms = await this.userProgramsRepository.find({
      where: { content: { id: contentId } },
      relations: ["user", "content", "performanceRecords"],
    });
    if (!userPrograms) {
      throw new NotFoundException(
        `User programs for content ${contentId} not found`,
      );
    }
    return userPrograms;
  }
}
