import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AffiliateLink } from "../../entities/affiliate-link.entity";
import { Repository } from "typeorm";
import { CreateAffiliateLinkDto } from "./dto/create-affiliate-links.dto";
import { UpdateAffiliateLinkDto } from "./dto/update-affiliate-links.dto";

@Injectable()
export class AffiliateLinksService {
  constructor(
    @InjectRepository(AffiliateLink)
    private affiliateLinksRepository: Repository<AffiliateLink>,
  ) {}

  async create(
    createAffiliateLinkDto: CreateAffiliateLinkDto,
    userId: number,
  ): Promise<AffiliateLink> {
    const affiliateLink = this.affiliateLinksRepository.create({
      ...createAffiliateLinkDto,
      user: { id: userId },
      affiliateProgram: { id: createAffiliateLinkDto.affiliateProgramId },
    });
    return this.affiliateLinksRepository.save(affiliateLink);
  }

  async findAll(): Promise<AffiliateLink[]> {
    return this.affiliateLinksRepository.find({
      relations: ["user", "affiliateProgram", "affiliateSales"],
    });
  }

  async findOne(id: number): Promise<AffiliateLink> {
    const affiliateLink = await this.affiliateLinksRepository.findOne({
      where: { id },
      relations: ["user", "affiliateProgram", "affiliateSales"],
    });
    if (!affiliateLink) {
      throw new NotFoundException(`Affiliate link with ID ${id} not found`);
    }
    return affiliateLink;
  }

  async update(
    id: number,
    updateAffiliateLinkDto: UpdateAffiliateLinkDto,
    userId: number,
  ): Promise<AffiliateLink> {
    const affiliateLink = await this.affiliateLinksRepository.preload({
      id,
      ...updateAffiliateLinkDto,
    });
    if (!affiliateLink) {
      throw new NotFoundException(`Affiliate link with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier le lien d'affiliation
    if (affiliateLink.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this affiliate link",
      );
    }
    return this.affiliateLinksRepository.save(affiliateLink);
  }

  async remove(id: number, userId: number): Promise<void> {
    const affiliateLink = await this.affiliateLinksRepository.findOne({
      where: { id },
    });
    if (!affiliateLink) {
      throw new NotFoundException(`Affiliate link with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer le lien d'affiliation
    if (affiliateLink.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this affiliate link",
      );
    }
    await this.affiliateLinksRepository.delete(id);
  }

  async searchAffiliateLinks(query: string): Promise<AffiliateLink[]> {
    const affiliateLinks = await this.affiliateLinksRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { generatedLink: `%${query}%` },
      ],
      relations: ["user", "affiliateProgram", "affiliateSales"],
    });
    return affiliateLinks;
  }

  async findByUser(userId: number): Promise<AffiliateLink[]> {
    const affiliateLinks = await this.affiliateLinksRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "affiliateProgram", "affiliateSales"],
    });
    if (!affiliateLinks) {
      throw new NotFoundException(
        `Affiliate links for user ${userId} not found`,
      );
    }
    return affiliateLinks;
  }

  async findByProgram(programId: number): Promise<AffiliateLink[]> {
    const affiliateLinks = await this.affiliateLinksRepository.find({
      where: { affiliateProgram: { id: programId } },
      relations: ["user", "affiliateProgram", "affiliateSales"],
    });
    if (!affiliateLinks) {
      throw new NotFoundException(
        `Affiliate links for program ${programId} not found`,
      );
    }
    return affiliateLinks;
  }
}
