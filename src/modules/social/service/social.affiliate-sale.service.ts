import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialAffiliateSaleDto, UpdateSocialAffiliateSaleDto } from '../dto';
import { SocialAffiliateSaleEntity } from '../entity';


@Injectable()
export class SocialAffiliateSaleService {
  constructor(
    @InjectRepository(SocialAffiliateSaleEntity)
    private readonly affiliateSaleRepository: Repository<SocialAffiliateSaleEntity>,
  ) {}

  async create(createDto: CreateSocialAffiliateSaleDto): Promise<SocialAffiliateSaleEntity> {
    const affiliateSale = this.affiliateSaleRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.affiliateSaleRepository.save(affiliateSale);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
    userId: number,
    isSeller: boolean = false
  ): Promise<PaginatedResponseDto<SocialAffiliateSaleEntity>> {
    const queryBuilder = this.affiliateSaleRepository.createQueryBuilder('affiliateSale')
      .where(isSeller ? 'affiliateSale.sellerId = :userId' : 'affiliateSale.buyerId = :userId', { userId })
      .orderBy('affiliateSale.createdAt', 'DESC');

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page
      }
    };
  }

  async findOne(id: number): Promise<SocialAffiliateSaleEntity> {
    return await this.affiliateSaleRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateDto: UpdateSocialAffiliateSaleDto): Promise<SocialAffiliateSaleEntity> {
    await this.affiliateSaleRepository.update(id, {
      ...updateDto,
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.affiliateSaleRepository.delete(id);
  }
}
