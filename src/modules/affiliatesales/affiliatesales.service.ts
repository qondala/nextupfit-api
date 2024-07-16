import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AffiliateSale } from "../../entities/affiliate-sale.entity";
import { Repository } from "typeorm";
import { CreateAffiliateSaleDto } from "./dto/create-affiliate-sale.dto";
import { UpdateAffiliateSaleDto } from "./dto/update-affiliate-sale.dto";

@Injectable()
export class AffiliateSalesService {
  constructor(
    @InjectRepository(AffiliateSale)
    private affiliateSalesRepository: Repository<AffiliateSale>,
  ) {}

  async create(
    createAffiliateSaleDto: CreateAffiliateSaleDto,
  ): Promise<AffiliateSale> {
    const affiliateSale = this.affiliateSalesRepository.create(
      createAffiliateSaleDto,
    );
    return this.affiliateSalesRepository.save(affiliateSale);
  }

  async findAll(): Promise<AffiliateSale[]> {
    return this.affiliateSalesRepository.find({
      relations: ["affiliateLink"],
    });
  }

  async findOne(id: number): Promise<AffiliateSale> {
    const affiliateSale = await this.affiliateSalesRepository.findOne({
      where: { id },
      relations: ["affiliateLink"],
    });
    if (!affiliateSale) {
      throw new NotFoundException(`Affiliate sale with ID ${id} not found`);
    }
    return affiliateSale;
  }

  async update(
    id: number,
    updateAffiliateSaleDto: UpdateAffiliateSaleDto,
  ): Promise<AffiliateSale> {
    const affiliateSale = await this.affiliateSalesRepository.preload({
      id,
      ...updateAffiliateSaleDto,
    });
    if (!affiliateSale) {
      throw new NotFoundException(`Affiliate sale with ID ${id} not found`);
    }
    return this.affiliateSalesRepository.save(affiliateSale);
  }

  async remove(id: number): Promise<void> {
    const affiliateSale = await this.affiliateSalesRepository.findOne({
      where: { id },
    });
    if (!affiliateSale) {
      throw new NotFoundException(`Affiliate sale with ID ${id} not found`);
    }
    await this.affiliateSalesRepository.delete(id);
  }

  async searchAffiliateSales(query: string): Promise<AffiliateSale[]> {
    const affiliateSales = await this.affiliateSalesRepository.find({
      where: [{ affiliateLink: { generatedLink: `%${query}%` } }],
      relations: ["affiliateLink"],
    });
    return affiliateSales;
  }

  async findByLink(linkId: number): Promise<AffiliateSale[]> {
    const affiliateSales = await this.affiliateSalesRepository.find({
      where: { affiliateLink: { id: linkId } },
      relations: ["affiliateLink"],
    });
    if (!affiliateSales) {
      throw new NotFoundException(
        `Affiliate sales for link ${linkId} not found`,
      );
    }
    return affiliateSales;
  }
}
