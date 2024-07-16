import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "../../entities/news.entity";
import { Repository } from "typeorm";
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

  async findAll(): Promise<News[]> {
    return this.newsRepository.find({
      relations: ["coach"],
    });
  }

  async findOne(id: number): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ["coach"],
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async update(
    id: number,
    updateNewsDto: UpdateNewsDto,
    coachId: number,
  ): Promise<News> {
    const news = await this.newsRepository.preload({
      id,
      ...updateNewsDto,
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à modifier son actualité
    if (news.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this news",
      );
    }
    return this.newsRepository.save(news);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const news = await this.newsRepository.findOne({
      where: { id },
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à supprimer son actualité
    if (news.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this news",
      );
    }
    await this.newsRepository.delete(id);
  }

  async searchNews(query: string): Promise<News[]> {
    const news = await this.newsRepository.find({
      where: [
        { coach: { user: { firstName: `%${query}%` } } },
        { coach: { user: { lastName: `%${query}%` } } },
        { coach: { user: { email: `%${query}%` } } },
        { title: `%${query}%` },
        { content: `%${query}%` },
      ],
      relations: ["coach"],
    });
    return news;
  }

  async findByCoach(coachId: number): Promise<News[]> {
    const news = await this.newsRepository.find({
      where: { coach: { id: coachId } },
      relations: ["coach"],
    });
    if (!news) {
      throw new NotFoundException(`News for coach ${coachId} not found`);
    }
    return news;
  }
}
