import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
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

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<PaginationResult<Coach>> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await this.coachesRepository.findAndCount({
      skip,
      take: pageSize,
    });
    return { items, total };
  }

  async findOne(id: number): Promise<Coach> {
    const coach = await this.buildCoachFindOneQuery(id).getOne();
    if (!coach) {
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }
    return coach;
  }

  private buildCoachFindOneQuery(id: number): SelectQueryBuilder<Coach> {
    const qb = this.coachesRepository.createQueryBuilder("coach");
    this.addRelations(qb);
    return qb.where("coach.id = :id", { id });
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
    await this.coachesRepository.delete(id);
    return { message: "Coach successfully deleted" };
  }

  async searchCoaches(query: string): Promise<Coach[]> {
    return this.buildCoachSearchQuery(query).getMany();
  }

  private buildCoachSearchQuery(query: string): SelectQueryBuilder<Coach> {
    const qb = this.coachesRepository.createQueryBuilder("coach");
    this.addRelations(qb);

    qb.leftJoinAndSelect("coach.user", "users") // Jointure pour accéder aux propriétés de l'utilisateur
      .where("users.firstName LIKE :query", { query: `%${query}%` })
      .orWhere("users.lastName LIKE :query", { query: `%${query}%` })
      .orWhere("users.email LIKE :query", { query: `%${query}%` })
      .orWhere("coach.bio LIKE :query", { query: `%${query}%` });

    return qb;
  }

  private addRelations(qb: SelectQueryBuilder<Coach>) {
    qb.leftJoinAndSelect("coach.user", "user")
      .leftJoinAndSelect("coach.content", "content")
      .leftJoinAndSelect("coach.qualifications", "qualifications")
      .leftJoinAndSelect("coach.specializations", "specializations")
      .leftJoinAndSelect("coach.ratings", "ratings")
      .leftJoinAndSelect("coach.privateDiscussions", "privateDiscussions")
      .leftJoinAndSelect("coach.news", "news")
      .leftJoinAndSelect("coach.recommendations", "recommendations")
      .leftJoinAndSelect("coach.coachFollows", "coachFollows");
  }

  async findByAdmin(adminId: number): Promise<Coach[]> {
    return this.coachesRepository.find({
      where: { manager: { id: adminId } },
      relations: ["user"],
      order: { ratingAvg: "DESC" },
      take: 12,
    });
  }
}
