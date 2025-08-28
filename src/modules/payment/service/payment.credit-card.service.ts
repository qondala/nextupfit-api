import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
    PaginatedResponseDto,
    PaginationOptionsDto,
} from '@app/common/dto';

import { PaymentCreditCardEntity } from '../entity';
import {
    CreatePaymentCreditCardDto,
    UpdatePaymentCreditCardDto,
} from '../dto';

@Injectable()
export class PaymentCreditCardService {
  constructor(
    @InjectRepository(PaymentCreditCardEntity)
    private readonly paymentCreditCardRepository: Repository<PaymentCreditCardEntity>,
  ) {}

  async create(createDto: CreatePaymentCreditCardDto): Promise<PaymentCreditCardEntity> {
    const paymentCreditCard = this.paymentCreditCardRepository.create(createDto);
    const saved = await this.paymentCreditCardRepository.save(paymentCreditCard);
    return saved;
  }

  async findOne(id: number): Promise<PaymentCreditCardEntity> {
    const creditCard = await this.paymentCreditCardRepository.findOne({
      where: { id },
    });
    return creditCard;
  }

  async update(
    id: number,
    updateDto: UpdatePaymentCreditCardDto,
  ): Promise<PaymentCreditCardEntity> {
    await this.paymentCreditCardRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.paymentCreditCardRepository.delete(id);
  }

  async findAllByUserId(
    userId: number,
    pagination: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<PaymentCreditCardEntity>> {
    const [items, total] = await this.paymentCreditCardRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
    });
    
    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages: Math.ceil(total / pagination.limit),
        currentPage: pagination.page,
      },
    };
  }
}
