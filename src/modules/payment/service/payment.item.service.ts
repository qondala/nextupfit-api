import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
    PaginatedResponseDto,
    PaginationOptionsDto,
} from '@app/common/dto';

import { PaymentItemEntity } from '../entity';
import {
    CreatePaymentItemDto,
    UpdatePaymentItemDto,
} from '../dto';


@Injectable()
export class PaymentItemService {
  constructor(
    @InjectRepository(PaymentItemEntity)
    private readonly paymentItemRepository: Repository<PaymentItemEntity>,
  ) {}

  async create(createDto: CreatePaymentItemDto): Promise<PaymentItemEntity> {
    const paymentItem = this.paymentItemRepository.create(createDto);
    const savedItem = await this.paymentItemRepository.save(paymentItem);
    return savedItem;
  }

  async findOne(id: number): Promise<PaymentItemEntity> {
    const paymentItem = await this.paymentItemRepository.findOne({
      where: { id },
      relations: ['cartItem', 'payment']
    });
    return paymentItem;
  }

  async update(
    id: number,
    updateDto: UpdatePaymentItemDto,
  ): Promise<PaymentItemEntity> {
    const paymentItem = await this.paymentItemRepository.preload({
      id,
      ...updateDto,
    });

    await this.paymentItemRepository.save(paymentItem);
    return paymentItem;
  }

  async remove(id: number): Promise<void> {
    await this.paymentItemRepository.delete(id);
  }

  async findAllByPaymentId(
    paymentId: number,
    pagination: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<PaymentItemEntity>> {
    const [items, total] = await this.paymentItemRepository.findAndCount({
      where: { paymentId },
      relations: ['cartItem', 'payment']
    });

    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const paginatedItems = items.slice(skip, skip + limit);
    
    return {
      items: paginatedItems,
      meta: {
        totalItems: total,
        itemCount: paginatedItems.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }
}
