import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCoachDto } from "./dto/create-coach.dto";
import { UpdateCoachDto } from "./dto/update-coach.dto";
import { Coach } from "../../entities/coach.entity";

@Injectable()
export class CoachesService {
  constructor(
    @InjectRepository(Coach)
    private coachesRepository: Repository<Coach>,
  ) {}

  async create(createCoachDto: CreateCoachDto): Promise<Coach> {
    const coach = this.coachesRepository.create(createCoachDto);
    return this.coachesRepository.save(coach);
  }

  async findAll(): Promise<Coach[]> {
    return this.coachesRepository.find({
      relations: [
        "user",
        "content",
        "qualifications",
        "specializations",
        "ratings",
        "privateDiscussions",
        "news",
        "recommendations",
        "coachFollows",
      ],
    });
  }

  async findOne(id: number): Promise<Coach> {
    const coach = await this.coachesRepository.findOne({
      where: { id },
      relations: [
        "user",
        "content",
        "qualifications",
        "specializations",
        "ratings",
        "privateDiscussions",
        "news",
        "recommendations",
        "coachFollows",
      ],
    });
    if (!coach) {
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }
    return coach;
  }

  async update(id: number, updateCoachDto: UpdateCoachDto): Promise<Coach> {
    const coach = await this.coachesRepository.preload({
      id,
      ...updateCoachDto,
    });
    if (!coach) {
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }
    return this.coachesRepository.save(coach);
  }

  async remove(id: number) {
    return this.coachesRepository.delete(id);
  }

  async searchCoaches(query: string): Promise<Coach[]> {
    const coaches = await this.coachesRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { bio: `%${query}%` },
      ],
      relations: [
        "user",
        "content",
        "qualifications",
        "specializations",
        "ratings",
        "privateDiscussions",
        "news",
        "recommendations",
        "coachFollows",
      ],
    });
    return coaches;
  }
}
