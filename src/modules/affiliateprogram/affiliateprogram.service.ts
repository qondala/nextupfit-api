import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AffiliateProgram } from "../../entities/affiliate-program.entity";
import { Repository } from "typeorm";
import { CreateAffiliateProgramDto } from "./dto/create-affiliate-program.dto";
import { UpdateAffiliateProgramDto } from "./dto/uptate-affiliate-program.dto";

@Injectable()
export class AffiliateProgramsService {
  constructor(
    @InjectRepository(AffiliateProgram)
    private affiliateProgramsRepository: Repository<AffiliateProgram>,
  ) {}

  async create(
    createAffiliateProgramDto: CreateAffiliateProgramDto,
    coachId: number,
  ): Promise<AffiliateProgram> {
    const affiliateProgram = this.affiliateProgramsRepository.create({
      ...createAffiliateProgramDto,
      content: { id: createAffiliateProgramDto.contentId },
    });
    return this.affiliateProgramsRepository.save(affiliateProgram);
  }

  async findAll(): Promise<AffiliateProgram[]> {
    return this.affiliateProgramsRepository.find({
      relations: ["content", "affiliateLinks"],
    });
  }

  async findOne(id: number): Promise<AffiliateProgram> {
    const affiliateProgram = await this.affiliateProgramsRepository.findOne({
      where: { id },
      relations: ["content", "affiliateLinks"],
    });
    if (!affiliateProgram) {
      throw new NotFoundException(`Affiliate program with ID ${id} not found`);
    }
    return affiliateProgram;
  }

  async update(
    id: number,
    updateAffiliateProgramDto: UpdateAffiliateProgramDto,
    coachId: number,
  ): Promise<AffiliateProgram> {
    const affiliateProgram = await this.affiliateProgramsRepository.preload({
      id,
      ...updateAffiliateProgramDto,
    });
    if (!affiliateProgram) {
      throw new NotFoundException(`Affiliate program with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à modifier le programme d'affiliation
    if (affiliateProgram.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this affiliate program",
      );
    }
    return this.affiliateProgramsRepository.save(affiliateProgram);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const affiliateProgram = await this.affiliateProgramsRepository.findOne({
      where: { id },
    });
    if (!affiliateProgram) {
      throw new NotFoundException(`Affiliate program with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à supprimer le programme d'affiliation
    if (affiliateProgram.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this affiliate program",
      );
    }
    await this.affiliateProgramsRepository.delete(id);
  }

  async searchAffiliatePrograms(query: string): Promise<AffiliateProgram[]> {
    const affiliatePrograms = await this.affiliateProgramsRepository.find({
      where: [
        { content: { title: `%${query}%` } },
        { content: { description: `%${query}%` } },
        { programDescription: `%${query}%` },
      ],
      relations: ["content", "affiliateLinks"],
    });
    return affiliatePrograms;
  }

  async findByContent(contentId: number): Promise<AffiliateProgram[]> {
    const affiliatePrograms = await this.affiliateProgramsRepository.find({
      where: { content: { id: contentId } },
      relations: ["content", "affiliateLinks"],
    });
    if (!affiliatePrograms) {
      throw new NotFoundException(
        `Affiliate programs for content ${contentId} not found`,
      );
    }
    return affiliatePrograms;
  }
}
