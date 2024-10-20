// src/admin-transfers/admin-transfers.service.ts
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminTransfer } from "src/entities/admin-transfer.entity";
import { Repository } from "typeorm";
import { CreateAdminTransferDto } from "./dto/create-admintransfer.dto";
import { Payment } from "src/entities/payment.entity";
import Stripe from "stripe";

@Injectable()
export class AdminTransfersService {
  constructor(
    @InjectRepository(AdminTransfer)
    private adminTransfersRepository: Repository<AdminTransfer>,
    @InjectRepository(AdminTransfer)
    private paymentsRepository: Repository<Payment>,
    @Inject(Stripe) private stripe: Stripe,
  ) {}

  async create(
    createAdminTransferDto: CreateAdminTransferDto,
    coachId: number,
  ): Promise<AdminTransfer> {
    try {
      // 1. Créer un token de compte bancaire ou de carte
      const accountToken = await this.stripe.tokens.create({
        bank_account: createAdminTransferDto.bankAccount, // Pour les virements bancaires
        card: createAdminTransferDto.card, // Pour les transferts vers une carte
      });

      // 2. Créer un transfert Stripe
      const transfer = await this.stripe.payouts.create({
        amount: createAdminTransferDto.amount * 100,
        currency: createAdminTransferDto.currency,
        // destination:  Plus besoin de destination, car on utilise un token
        destination: accountToken.id, // Si virement bancaire
        // OU
        metadata: {
          coachId: coachId,
        },
      });

      // Enregistrer le transfert dans la base de données
      const adminTransfer = this.adminTransfersRepository.create({
        ...createAdminTransferDto,
        stripeTransferId: transfer.id,
      });

      return await this.adminTransfersRepository.save(adminTransfer);
    } catch (error) {
      // Gérer les erreurs Stripe
      console.error("Error creating Stripe transfer:", error);
      throw new BadRequestException("Failed to create transfer.");
    }
  }
  async findAll(): Promise<AdminTransfer[]> {
    return this.adminTransfersRepository.find();
  }

  async findOne(id: number): Promise<AdminTransfer> {
    const adminTransfer = await this.adminTransfersRepository.findOne({
      where: { id },
    });
    if (!adminTransfer) {
      throw new NotFoundException(`Admin transfer with ID ${id} not found`);
    }
    return adminTransfer;
  }

  async findByAdmin(adminId: number): Promise<AdminTransfer> {
    const adminTransfer = await this.adminTransfersRepository.findOne({
      where: { admin: { id: adminId } },
    });
    if (!adminTransfer) {
      throw new NotFoundException(
        `Admin transfer with ID ${adminId} not found`,
      );
    }
    return adminTransfer;
  }

  // Cette méthode calcule le solde de l'administrateur
  async getAdminBalance(): Promise<number> {
    const transfers = await this.paymentsRepository.find();
    const adminCommissionRate = parseFloat(process.env.COMMISSION_RATE); // Taux de commission de l'admin (10% par exemple)
    let adminBalance = 0;
    for (const transfer of transfers) {
      adminBalance += transfer.amountPaid * adminCommissionRate;
    }
    return adminBalance;
  }
}
