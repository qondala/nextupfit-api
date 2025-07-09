import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { PaymentCartItemEntity } from "../entity";
import { CreatePaymentCartItemDto, UpdatePaymentCartItemDto } from "../dto";
import { PaymentStatusEnum } from "../types";

@Injectable()
export class PaymentCartItemService {
  constructor(
    @InjectRepository(PaymentCartItemEntity)
    private readonly paymentCartItemRepository: Repository<PaymentCartItemEntity>,
  ) {}

  async create(createDto: CreatePaymentCartItemDto): Promise<PaymentCartItemEntity> {
    const paymentCartItem = this.paymentCartItemRepository.create({
      ...createDto,
      createdAt: new Date(),
    });
    return await this.paymentCartItemRepository.save(paymentCartItem);
  }

  async findAllUserPaymentCartItems(
    userId: number,
    pagination: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<PaymentCartItemEntity>> {
    const qb = this.paymentCartItemRepository
      .createQueryBuilder("paymentCartItem")
      .where("paymentCartItem.userId = :userId", { userId })
      .orderBy("paymentCartItem.createdAt", "DESC");

    const skip = (pagination.page - 1) * pagination.limit;
    const [items, totalItems] = await qb.skip(skip).take(pagination.limit).getManyAndCount();

    const totalPages = Math.ceil(totalItems / pagination.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages,
        currentPage: pagination.page,
      },
    };
  }

  async findAllUserPaymentCartItemsByCartId(
    userId: number,
    paymentCartId: number,
    pagination: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<PaymentCartItemEntity>> {
    const qb = this.paymentCartItemRepository
      .createQueryBuilder("paymentCartItem")
      .where("paymentCartItem.userId = :userId", { userId })
      .andWhere("paymentCartItem.paymentCartId = :paymentCartId", { paymentCartId })
      .orderBy("paymentCartItem.createdAt", "DESC");

    const skip = (pagination.page - 1) * pagination.limit;
    const [items, totalItems] = await qb.skip(skip).take(pagination.limit).getManyAndCount();

    const totalPages = Math.ceil(totalItems / pagination.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages,
        currentPage: pagination.page,
      },
    };
  }


  async findOne(id: number): Promise<PaymentCartItemEntity> {
    return await this.paymentCartItemRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdatePaymentCartItemDto, userId: number): Promise<PaymentCartItemEntity> {
    await this.paymentCartItemRepository.update({ id, userId }, dto);
    return this.findOne(id);
  }

  async updatePayementCartItemStatus(id: number, status: PaymentStatusEnum): Promise<PaymentCartItemEntity> {
    await this.paymentCartItemRepository.update({ id }, { status });
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.paymentCartItemRepository.delete({ id, userId });
  }
}
