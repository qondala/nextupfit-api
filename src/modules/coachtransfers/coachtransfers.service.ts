import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inject } from "@nestjs/common";
import { Stripe } from "stripe";
import { CoachTransfer } from "src/entities/coach-transfer.entity";
import { Coach } from "src/entities/coach.entity";
import { CreateCoachTransferDto } from "./dto/create-coachtransfer.dto";

@Injectable()
export class CoachTransfersService {
  constructor(
    @InjectRepository(CoachTransfer)
    private coachTransferRepository: Repository<CoachTransfer>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    @Inject(Stripe) private stripe: Stripe,
  ) {}

  async create(
    createCoachTransferDto: CreateCoachTransferDto,
    coachId: number,
  ): Promise<CoachTransfer> {
    const coach = await this.coachRepository.findOne({
      where: { id: coachId },
      relations: ["user"],
    });
    if (!coach) {
      throw new NotFoundException(`Coach with ID ${coachId} not found`);
    }

    try {
      // 1. Créer un token de compte bancaire ou de carte
      const accountToken = await this.stripe.tokens.create({
        bank_account: createCoachTransferDto.bankAccount, // Pour les virements bancaires
        card: createCoachTransferDto.card, // Pour les transferts vers une carte
      });

      // 2. Créer un transfert Stripe
      const transfer = await this.stripe.payouts.create({
        amount: createCoachTransferDto.amount * 100,
        currency: createCoachTransferDto.currency,
        // destination:  Plus besoin de destination, car on utilise un token
        destination: accountToken.id, // Si virement bancaire
        // OU
        metadata: {
          coachId: coachId,
        },
      });

      // Enregistrer le transfert dans la base de données
      const coachTransfer = this.coachTransferRepository.create({
        ...createCoachTransferDto,
        coach: { id: coachId },
        stripeTransferId: transfer.id,
      });

      return await this.coachTransferRepository.save(coachTransfer);
    } catch (error) {
      // Gérer les erreurs Stripe
      console.error("Error creating Stripe transfer:", error);
      throw new BadRequestException("Failed to create transfer.");
    }
  }

  async findAll(): Promise<CoachTransfer[]> {
    return this.coachTransferRepository.find({ relations: ["coach"] });
  }

  async findOne(id: number): Promise<CoachTransfer> {
    const coachTransfer = await this.coachTransferRepository.findOne({
      where: { id },
      relations: ["coach"],
    });
    if (!coachTransfer) {
      throw new NotFoundException(`CoachTransfer with ID ${id} not found`);
    }
    return coachTransfer;
  }

  async findByCoach(coachId: number): Promise<CoachTransfer> {
    const coachTransfer = await this.coachTransferRepository.findOne({
      where: { coach: { id: coachId } },
      relations: ["coach"],
    });
    if (!coachTransfer) {
      throw new NotFoundException(`CoachTransfer with ID ${coachId} not found`);
    }
    return coachTransfer;
  }
}
