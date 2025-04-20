import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreatePaymentTransferDto, UpdatePaymentTransferDto } from '../dto';
import { PaymentTransferEntity } from '../entity';


@Injectable()
export class PaymentTransferService {
  constructor(
    @InjectRepository(PaymentTransferEntity)
    private readonly paymentTransferRepository: Repository<PaymentTransferEntity>,
  ) {}

  async create(createDto: CreatePaymentTransferDto, userId: number): Promise<PaymentTransferEntity> {
    const paymentTransfer = this.paymentTransferRepository.create({
      ...createDto,
      senderUserId: userId,
      createdAt: new Date()
    });
    return await this.paymentTransferRepository.save(paymentTransfer);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
    userId: number
  ): Promise<PaginatedResponseDto<PaymentTransferEntity>> {
    const queryBuilder = this.paymentTransferRepository.createQueryBuilder('paymentTransfer')
      .where('paymentTransfer.senderUserId = :userId OR paymentTransfer.receiverUserId = :userId', { userId })
      .orderBy('paymentTransfer.createdAt', 'DESC');

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

  async findOne(id: number): Promise<PaymentTransferEntity> {
    return await this.paymentTransferRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDto: UpdatePaymentTransferDto, userId: number): Promise<PaymentTransferEntity> {
    await this.paymentTransferRepository.update(
      { id, senderUserId: userId },
      updateDto
    );
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.paymentTransferRepository.delete({ id, senderUserId: userId });
  }
}
