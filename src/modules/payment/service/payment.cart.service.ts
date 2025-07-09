import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { PaymentCartEntity } from "../entity";
import { CreatePaymentCartDto, UpdatePaymentCartDto } from "../dto";

@Injectable()
export class PaymentCartService {
  constructor(
    @InjectRepository(PaymentCartEntity)
    private readonly paymentCartRepository: Repository<PaymentCartEntity>,
  ) {}

  async create(createDto: CreatePaymentCartDto, userId: number): Promise<PaymentCartEntity> {
    const paymentCart = this.paymentCartRepository.create({
      ...createDto,
      userId,
      createdAt: new Date(),
    });
    return await this.paymentCartRepository.save(paymentCart);
  }

  async findAll(
    pagination: PaginationOptionsDto,
    userId: number,
  ): Promise<PaginatedResponseDto<PaymentCartEntity>> {
    const qb = this.paymentCartRepository
      .createQueryBuilder("paymentCart")
      .where("paymentCart.userId = :userId", { userId })
      .orderBy("paymentCart.createdAt", "DESC");

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

  async findOne(id: number): Promise<PaymentCartEntity> {
    return await this.paymentCartRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdatePaymentCartDto, userId: number): Promise<PaymentCartEntity> {
    await this.paymentCartRepository.update({ id, userId }, dto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.paymentCartRepository.delete({ id, userId });
  }
}
