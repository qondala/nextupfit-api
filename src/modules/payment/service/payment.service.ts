import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreatePaymentDto, UpdatePaymentDto } from '../dto';
import { PaymentEntity } from '../entity';


@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async create(createDto: CreatePaymentDto, userId: number): Promise<PaymentEntity> {
    const payment = this.paymentRepository.create({
      ...createDto,
      userId,
      createdAt: new Date()
    });
    return await this.paymentRepository.save(payment);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
    userId: number
  ): Promise<PaginatedResponseDto<PaymentEntity>> {
    const queryBuilder = this.paymentRepository.createQueryBuilder('payment')
      .where('payment.userId = :userId', { userId })
      .orderBy('payment.createdAt', 'DESC');

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

  async findOne(id: number): Promise<PaymentEntity> {
    return await this.paymentRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDto: UpdatePaymentDto, userId: number): Promise<PaymentEntity> {
    await this.paymentRepository.update(
      { id, userId },
      updateDto
    );
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.paymentRepository.delete({ id, userId });
  }
}
