import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";
import { BaseSubscriptionPlanItemEnum } from "@app/module/base/types";

import { CreatePaymentDto, UpdatePaymentDto } from "../dto";
import { PaymentEntity } from "../entity";
import {
  PaymentPayableItemEnum,
  PaymentScopeEnum,
  PaymentStatusEnum,
} from "../types";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async create(
    createDto: CreatePaymentDto,
    userId: number,
  ): Promise<PaymentEntity> {
    const payment = this.paymentRepository.create({
      ...createDto,
      userId,
      createdAt: new Date(),
    });
    return await this.paymentRepository.save(payment);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
    userId: number,
  ): Promise<PaginatedResponseDto<PaymentEntity>> {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder("payment")
      .where("payment.userId = :userId", { userId })
      .orderBy("payment.createdAt", "DESC");

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
        currentPage: paginationOptions.page,
      },
    };
  }

  async findAllPaymentsReceivedByGym(
    gymId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<PaymentEntity>> {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder("payment")
      .where("payment.receiverGymId = :gymId", { gymId })
      .orderBy("payment.createdAt", "DESC");

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
        currentPage: paginationOptions.page,
      },
    };
  }

  async findAllPaymentsReceivedByManager(
    managerId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<PaymentEntity>> {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder("payment")
      .where("payment.receiverGymId = :managerId", { managerId })
      .orderBy("payment.createdAt", "DESC");

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
        currentPage: paginationOptions.page,
      },
    };
  }

  async userGymMembershipPlanPayments(
    userId: number,
    gymId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<PaymentEntity>> {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder("payment")
      .where("payment.userId = :userId", { userId })
      .andWhere("payment.receiverGymId = :gymId", { gymId })
      .andWhere("payment.itemType = :itemType", {
        itemType: PaymentPayableItemEnum.membership,
      })
      .andWhere("payment.subscriptionType = :subscriptionType", {
        subscriptionType: BaseSubscriptionPlanItemEnum.gym,
      })
      .orderBy("payment.createdAt", "DESC");

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
        currentPage: paginationOptions.page,
      },
    };
  }

  async userProgramSubscriptionPayments(
    userId: number,
    programId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<PaymentEntity>> {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder("payment")
      .where("payment.userId = :userId", { userId })
      .andWhere("payment.itemId = :programId", { programId })
      .andWhere("payment.itemType = :itemType", {
        itemType: PaymentPayableItemEnum.program,
      })
      .orderBy("payment.createdAt", "DESC");

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
        currentPage: paginationOptions.page,
      },
    };
  }

  async userPaymentPerCartId(
    userId: number,
    paymentCartId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<PaymentEntity>> {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder("payment")
      .where("payment.userId = :userId", { userId })
      .andWhere("payment.paymentCartId = :paymentCartId", { paymentCartId })
      .orderBy("payment.createdAt", "DESC");

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
        currentPage: paginationOptions.page,
      },
    };
  }

  async userActivityPayments(
    userId: number,
    activityId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<PaymentEntity>> {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder("payment")
      .where("payment.userId = :userId", { userId })
      .andWhere("payment.itemId = :activityId", { activityId })
      .andWhere("payment.itemType = :itemType", {
        itemType: PaymentPayableItemEnum.activity,
      })
      .orderBy("payment.createdAt", "DESC");

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
        currentPage: paginationOptions.page,
      },
    };
  }

  async userProgramSubscriptionPlanPayments(
    userId: number,
    programSubscriptionPlanId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<PaymentEntity>> {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder("payment")
      .where("payment.userId = :userId", { userId })
      .andWhere(
        "payment.programSubscriptionPlanId = :programSubscriptionPlanId",
        { programSubscriptionPlanId },
      )
      .orderBy("payment.createdAt", "DESC");

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
        currentPage: paginationOptions.page,
      },
    };
  }

  async userGymMembershipPlanIdPayments(
    userId: number,
    gymMembershipPlanId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<PaymentEntity>> {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder("payment")
      .where("payment.userId = :userId", { userId })
      .andWhere("payment.gymMembershipPlanId = :gymMembershipPlanId", {
        gymMembershipPlanId,
      })
      .orderBy("payment.createdAt", "DESC");

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
        currentPage: paginationOptions.page,
      },
    };
  }

  async findOne(id: number): Promise<PaymentEntity> {
    return await this.paymentRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateDto: UpdatePaymentDto,
    userId: number,
  ): Promise<PaymentEntity> {
    await this.paymentRepository.update({ id, userId }, updateDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.paymentRepository.delete({ id, userId });
  }

  async countUserGymMembershipPlanPaymentsWithinPeriod(
    userId: number,
    gymMembershipPlanId: number,
    gymId: number,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<number> {
    return await this.paymentRepository.count({
      where: {
        userId,
        gymMembershipPlanId,
        receiverGymId: gymId,
        subscriptionType: BaseSubscriptionPlanItemEnum.gym,
        paymentScope: PaymentScopeEnum.subscription,
        status: PaymentStatusEnum.done,
        createdAt: Between(dateStart, dateEnd),
      },
    });
  }

  async countUserProgramSubscriptionPlanPaymentsWithinPeriod(
    userId: number,
    programSubscriptionPlanId: number,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<number> {
    return await this.paymentRepository.count({
      where: {
        userId,
        programSubscriptionPlanId,
        subscriptionType: BaseSubscriptionPlanItemEnum.program,
        paymentScope: PaymentScopeEnum.subscription,
        status: PaymentStatusEnum.done,
        createdAt: Between(dateStart, dateEnd),
      },
    });
  }

  async getUserLastPaymentForGymMembershipPlan(
    userId: number,
    gymMembershipPlanId: number,
    gymId: number,
  ): Promise<PaymentEntity> {
    return this.paymentRepository.findOne({
      where: {
        userId,
        gymMembershipPlanId,
        receiverGymId: gymId,
        subscriptionType: BaseSubscriptionPlanItemEnum.gym,
        paymentScope: PaymentScopeEnum.subscription,
        status: PaymentStatusEnum.done,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  async getUserLastPaymentForProgramSubscriptionPlan(
    subscriberUserId: number,
    programSubscriptionPlanId: number,
  ): Promise<PaymentEntity | null> {
    return this.paymentRepository.findOne({
      where: {
        userId: subscriberUserId,
        programSubscriptionPlanId,
        subscriptionType: BaseSubscriptionPlanItemEnum.program,
        paymentScope: PaymentScopeEnum.subscription,
        status: PaymentStatusEnum.done,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }
}
