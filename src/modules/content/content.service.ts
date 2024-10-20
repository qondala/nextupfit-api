import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { Content } from "../../entities/content.entity";

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create(
    createContentDto: CreateContentDto,
    coachId: number,
  ): Promise<Content> {
    const content = this.contentRepository.create({
      ...createContentDto,
      coach: { id: coachId },
    });
    return this.contentRepository.save(content);
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<PaginationResult<Content>> {
    const skip = (page - 1) * pageSize;
    const qb = this.contentRepository.createQueryBuilder("content");
    this.addRelations(qb); // Ajoutez les relations nécessaires
    const [items, total] = await qb.skip(skip).take(pageSize).getManyAndCount();
    return { items, total };
  }

  async findOne(id: number): Promise<Content> {
    const content = await this.buildContentFindOneQuery(id).getOne();
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return content;
  }

  private buildContentFindOneQuery(id: number): SelectQueryBuilder<Content> {
    const qb = this.contentRepository.createQueryBuilder("content");
    this.addRelations(qb); // Ajoutez les relations nécessaires
    return qb.where("content.id = :id", { id });
  }

  async update(
    id: number,
    updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    const content = await this.contentRepository.findOne({
      where: { id },
      relations: ["coach"],
    }); // Charger la relation 'coach'
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    // if (content.coach.id !== coachId) {
    //   // Accéder à l'ID du coach via la relation
    //   throw new UnauthorizedException(
    //     "You are not authorized to update this content",
    //   );
    // }

    // Mettre à jour les propriétés du contenu avec updateContentDto
    Object.assign(content, updateContentDto);

    return this.contentRepository.save(content);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const content = await this.contentRepository.findOne({
      where: { id },
      relations: ["coach"],
    });
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    if (content.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this content",
      );
    }
    await this.contentRepository.delete(id);
  }

  async searchContent(query: string): Promise<Content[]> {
    const qb = this.contentRepository.createQueryBuilder("content");
    this.addRelations(qb); // Ajoutez les relations nécessaires

    qb.where("content.title LIKE :query", { query: `%${query}%` })
      .orWhere("content.description LIKE :query", { query: `%${query}%` })
      .orWhere("content.goalSpecifics LIKE :query", { query: `%${query}%` });

    return qb.getMany();
  }

  async findByCategory(categoryId: number): Promise<Content[]> {
    const qb = this.contentRepository.createQueryBuilder("content");
    this.addRelations(qb); // Ajoutez les relations nécessaires
    qb.where("content.categoryId = :categoryId", { categoryId });
    const content = await qb.getMany();

    if (!content.length) {
      // Vérification pour tableau vide
      throw new NotFoundException(
        `Content for category ${categoryId} not found`,
      );
    }

    return content;
  }

  private addRelations(qb: SelectQueryBuilder<Content>) {
    qb.leftJoinAndSelect("content.coach", "coach")
      .leftJoinAndSelect("content.category", "category")
      .leftJoinAndSelect("content.goals", "goals")
      .leftJoinAndSelect("content.ratings", "ratings")
      .leftJoinAndSelect("content.reviews", "reviews")
      .leftJoinAndSelect("content.sessions", "sessions")
      .leftJoinAndSelect("content.affiliatePrograms", "affiliatePrograms")
      .leftJoinAndSelect("content.payments", "payments")
      .leftJoinAndSelect("content.userPrograms", "userPrograms")
      .leftJoinAndSelect("content.trainingContentLinks", "trainingContentLinks")
      .leftJoinAndSelect("content.contentNutrition", "contentNutrition");
  }

  async findPendingContents(
    page: number,
    pageSize: number,
  ): Promise<PaginationResult<Content>> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await this.contentRepository.findAndCount({
      where: { status: "pending" }, // Filtrer par statut 'pending'
      skip,
      take: pageSize,
    });
    return { items, total };
  }
}
