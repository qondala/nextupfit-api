import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
    private stripe: Stripe, // Injectez StripeService
  ) {}

  async create(
    createPaymentDto: CreatePaymentDto,
    userId: number,
    clientSecret: string,
    stripePaymentIntentId: string,
  ): Promise<Payment> {
    const payment = this.paymentsRepository.create({
      ...createPaymentDto,
      user: { id: userId },
      content: { id: createPaymentDto.contentId },
      secret: clientSecret, // Stockez le client_secret de Stripe
      intentId: stripePaymentIntentId, // Stockez l'ID de l'intention de paiement Stripe
    });
    return this.paymentsRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({
      relations: ["user", "content"],
    });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ["user", "content"],
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
    userId: number,
  ): Promise<Payment> {
    const payment = await this.paymentsRepository.preload({
      id,
      ...updatePaymentDto,
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
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer son paiement
    if (payment.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this payment",
      );
    }
    await this.paymentsRepository.delete(id);
  }

  async searchPayments(query: string): Promise<Payment[]> {
    const payments = await this.paymentsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { content: { title: `%${query}%` } },
        { content: { description: `%${query}%` } },
      ],
      relations: ["user", "content"],
    });
    return payments;
  }

  async findByUser(userId: number): Promise<Payment[]> {
    const payments = await this.paymentsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "content"],
    });
    if (!payments) {
      throw new NotFoundException(`Payments for user ${userId} not found`);
    }
    return payments;
  }

  async findByContent(contentId: number): Promise<Payment[]> {
    const payments = await this.paymentsRepository.find({
      where: { content: { id: contentId } },
      relations: ["user", "content"],
    });
    if (!payments) {
      throw new NotFoundException(
        `Payments for content ${contentId} not found`,
      );
    }
    return payments;
  }
}
