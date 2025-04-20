import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';
import { EcommerceCartItem } from '../entity';
import { CreateEcommerceCartItemDTO, UpdateEcommerceCartItemDTO } from '../dto';

@Injectable()
export class EcommerceCartItemService {
  constructor(
    @InjectRepository(EcommerceCartItem)
    private readonly cartItemRepository: Repository<EcommerceCartItem>,
  ) {}

  async create(createDto: CreateEcommerceCartItemDTO): Promise<EcommerceCartItem> {
    const cartItem = this.cartItemRepository.create(createDto);
    return await this.cartItemRepository.save(cartItem);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
    userId: number
  ): Promise<PaginatedResponseDto<EcommerceCartItem>> {
    const queryBuilder = this.cartItemRepository.createQueryBuilder('cart_item')
      .where('cart_item.userId = :userId', { userId })
      .orderBy('cart_item.createdAt', 'DESC');

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

  async findOne(id: number): Promise<EcommerceCartItem> {
    return await this.cartItemRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateDto: UpdateEcommerceCartItemDTO): Promise<EcommerceCartItem> {
    await this.cartItemRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cartItemRepository.delete(id);
  }
}
