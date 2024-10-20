import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Stripe } from "stripe";
import { Inject } from "@nestjs/common";
import { Payment } from "../../entities/payment.entity";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @Inject(Stripe)
    private stripe: Stripe,
  ) {}

  async create(
    createPaymentDto: CreatePaymentDto,
    userId: number,
    clientSecret: string,
    stripePaymentIntentId: string,
  ): Promise<Payment> {
    const payment = this.paymentsRepository.create({
      ...createPaymentDto,
      amountPaid: createPaymentDto.amount,
      user: { id: userId },
      contents: createPaymentDto.contents.map<{ id: number }>((contentId) => ({
        id: contentId,
      })), // Simplifié
      secret: clientSecret,
      intentId: stripePaymentIntentId,
    });
    return this.paymentsRepository.save(payment);
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginationResult<Payment>> {
    // Pagination par défaut
    const skip = (page - 1) * pageSize;
    const qb = this.paymentsRepository.createQueryBuilder("payment");
    this.addRelations(qb);

    const [items, total] = await qb.skip(skip).take(pageSize).getManyAndCount();
    return { items, total };
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.buildPaymentFindOneQuery(id).getOne();
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  private buildPaymentFindOneQuery(id: number): SelectQueryBuilder<Payment> {
    const qb = this.paymentsRepository.createQueryBuilder("payment");
    this.addRelations(qb);
    return qb.where("payment.id = :id", { id });
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
    userId: number,
  ): Promise<Payment> {
    const payment = await this.paymentsRepository.preload({
      id,
      ...updatePaymentDto,
      amountPaid: updatePaymentDto.amount,
      contents: updatePaymentDto.contents.map<{ id: number }>((contentId) => {
        return { id: contentId };
      }),
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    // Vérifier que l'utilisateur est autorisé à modifier son paiement
    if (payment.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this payment",
      );
    }
    return this.paymentsRepository.save(payment);
  }

  async remove(id: number, userId: number): Promise<void> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    if (payment.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this payment",
      );
    }
    await this.paymentsRepository.delete(id);
  }

  async searchPayments(query: string): Promise<Payment[]> {
    return this.buildPaymentSearchQuery(query).getMany();
  }

  private buildPaymentSearchQuery(query: string): SelectQueryBuilder<Payment> {
    const qb = this.paymentsRepository.createQueryBuilder("payment");
    this.addRelations(qb);

    qb.leftJoinAndSelect("payment.user", "user")
      .leftJoinAndSelect("payment.contents", "content")
      .where("user.firstName LIKE :query", { query: `%${query}%` })
      .orWhere("user.lastName LIKE :query", { query: `%${query}%` })
      .orWhere("user.email LIKE :query", { query: `%${query}%` })
      .orWhere("content.title LIKE :query", { query: `%${query}%` })
      .orWhere("content.description LIKE :query", { query: `%${query}%` });

    return qb;
  }

  async findByUser(userId: number): Promise<Payment[]> {
    return this.buildPaymentFindByUserQuery(userId).getMany();
  }

  private buildPaymentFindByUserQuery(
    userId: number,
  ): SelectQueryBuilder<Payment> {
    const qb = this.paymentsRepository.createQueryBuilder("payment");
    this.addRelations(qb);
    return qb.where("payment.user.id = :userId", { userId });
  }

  async findByContent(contentId: number): Promise<Payment[]> {
    return this.buildPaymentFindByContentQuery(contentId).getMany();
  }

  private buildPaymentFindByContentQuery(
    contentId: number,
  ): SelectQueryBuilder<Payment> {
    const qb = this.paymentsRepository.createQueryBuilder("payment");
    this.addRelations(qb);

    // Jointure explicite et condition WHERE pour la relation ManyToMany
    qb.leftJoin("payment.contents", "content").where(
      "content.id = :contentId",
      { contentId },
    );

    return qb;
  }

  private addRelations(qb: SelectQueryBuilder<Payment>) {
    qb.leftJoinAndSelect("payment.user", "user").leftJoinAndSelect(
      "payment.contents",
      "contents",
    ); // Assurez-vous que 'contents' est un tableau
  }

  async findByContentIds(contentIds: number[]): Promise<Payment[]> {
    const payments = this.paymentsRepository
      .createQueryBuilder("payment")
      .innerJoinAndSelect("payment.contents", "content")
      .where("content.id IN (:...contentIds)", { contentIds })
      .getMany();

    if (!payments) {
      throw new NotFoundException(
        `Payments not found for the provided contentIds`,
      );
    }
    return payments;
  }
}
