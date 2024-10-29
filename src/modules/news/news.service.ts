import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "../../entities/news.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateNewsDto } from "./dto/creat-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto, coachId: number): Promise<News> {
    const news = this.newsRepository.create({
      ...createNewsDto,
      coach: { id: coachId },
    });
    return this.newsRepository.save(news);
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginationResult<News>> {
    const skip = (page - 1) * pageSize;
    const qb = this.newsRepository.createQueryBuilder("news");
    this.addRelations(qb);
    const [items, total] = await qb.skip(skip).take(pageSize).getManyAndCount();
    return { items, total };
  }

  async findOne(id: number): Promise<News> {
    const news = await this.buildNewsFindOneQuery(id).getOne();
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  private buildNewsFindOneQuery(id: number): SelectQueryBuilder<News> {
    const qb = this.newsRepository.createQueryBuilder("news");
    this.addRelations(qb); // add relations
    return qb.where("news.id = :id", { id });
  }

  async update(
    id: number,
    updateNewsDto: UpdateNewsDto,
    coachId: number,
  ): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ["coach"],
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    if (news.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this news",
      );
    }
    Object.assign(news, updateNewsDto);
    return this.newsRepository.save(news);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ["coach"],
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    if (news.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this news",
      );
    }
    await this.newsRepository.delete(id);
  }

  async searchNews(query: string): Promise<News[]> {
    const qb = this.newsRepository.createQueryBuilder("news");
    this.addRelations(qb);

    qb.leftJoinAndSelect("news.coach", "coach")
      .leftJoinAndSelect("coach.user", "user") // Jointure pour accéder aux propriétés de l'utilisateur
      .where("user.firstName LIKE :query", { query: `%${query}%` })
      .orWhere("user.lastName LIKE :query", { query: `%${query}%` })
      .orWhere("user.email LIKE :query", { query: `%${query}%` })
      .orWhere("news.title LIKE :query", { query: `%${query}%` })
      .orWhere("news.content LIKE :query", { query: `%${query}%` });

    return qb.getMany();
  }

  async findByCoach(
    coachId: number,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginationResult<News>> {
    const skip = (page - 1) * pageSize;

    const qb = this.newsRepository.createQueryBuilder("news");
    this.addRelations(qb);
    qb.where("news.coach.id = :coachId", { coachId });

    const [items, total] = await qb.skip(skip).take(pageSize).getManyAndCount();
    return { items, total };
  }

  private addRelations(qb: SelectQueryBuilder<News>) {
    qb.leftJoinAndSelect("news.coach", "coach")
      .leftJoinAndSelect("coach.user", "user")
      .leftJoinAndSelect("news.content", "content")
      .leftJoinAndSelect("content.reviews", "reviews")
      .leftJoinAndSelect("content.ratings", "ratings")
      .leftJoinAndSelect("content.category", "category")
      .leftJoinAndSelect("reviews.user", "reviewuser")
      .leftJoinAndSelect("ratings.user", "ratinguser");
  }
}
