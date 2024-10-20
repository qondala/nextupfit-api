// admin-earnings.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "src/entities/payment.entity";
import { Like, Not, Repository } from "typeorm";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { User } from "src/entities/user.entity";
import { Admin } from "src/entities/admin.entity";
import * as argon2 from "argon2";

@Injectable()
export class AdminService {
  private commissionRate: number;
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private configService: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
  ) {
    // Récupérer le pourcentage de commission depuis les variables d'environnement
    this.commissionRate = parseFloat(
      this.configService.get("COMMISSION_RATE") || "0.10",
    ); //  Par défaut 10%
    console.log("Commission rate: ", this.commissionRate);
  }
  async getDailyEarnings(days: number = 30): Promise<number[]> {
    const dailyEarnings = await this.paymentsRepository
      .createQueryBuilder("payment")
      .select("SUM(payment.amountPaid * :commissionRate)", "total") // Appliquer le taux de commission
      .addSelect("DATE(payment.paymentDate)", "date")
      .setParameters({ commissionRate: this.commissionRate }) //  Définir le paramètre
      .groupBy("date")
      .orderBy("date", "DESC")
      .limit(days)
      .getRawMany();

    const earningsMap = new Map<string, number>();
    for (const earning of dailyEarnings) {
      earningsMap.set(earning.date, earning.total);
    }

    const today = new Date();
    const earnings: number[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = this.formatDate(date);
      earnings.push(earningsMap.get(dateStr) || 0);
    }
    return earnings.reverse();
  }

  async getMonthlyEarnings(months: number = 12): Promise<number[]> {
    const monthlyEarnings = await this.paymentsRepository
      .createQueryBuilder("payment")
      .select("SUM(payment.amountPaid * :commissionRate)", "total")
      .addSelect("MONTH(payment.paymentDate)", "month")
      .addSelect("YEAR(payment.paymentDate)", "year") // Ajouter l'année pour gérer les changements d'année
      .setParameters({ commissionRate: this.commissionRate })
      .groupBy("year, month")
      .orderBy("year", "DESC")
      .addOrderBy("month", "DESC")
      .limit(months)
      .getRawMany();

    const earningsMap = new Map<string, number>();
    for (const earning of monthlyEarnings) {
      const key = `${earning.year}-${earning.month}`;
      earningsMap.set(key, earning.total);
    }

    const today = new Date();
    const earnings: number[] = [];
    for (let i = 0; i < months; i++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i); //  Soustraire i mois
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Les mois sont indexés à partir de 0
      const key = `${year}-${month}`;
      earnings.push(earningsMap.get(key) || 0);
    }

    return earnings.reverse();
  }

  // Fonction utilitaire pour obtenir le numéro de semaine ISO 8601
  private getWeekNumber(date: Date): number {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = new String(date.getMonth() + 1).padStart(2, "0");
    const day = new String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async create(createAdminDto: CreateAdminDto) {
    const existingAdmin = await this.usersRepository.findOne({
      where: { email: createAdminDto.email },
    });
    if (existingAdmin) {
      throw new BadRequestException("Admin with this email already exists");
    }
    const passwordHash = await argon2.hash(createAdminDto.password);

    const user = this.usersRepository.create({
      ...createAdminDto,
      passwordHash,
    });
    return this.adminsRepository.create({ user });
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminsRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminsRepository.findOne({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const user = await this.usersRepository.findOneBy({ admin: { id } });
    if (!user) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    // Update the admin's data
    Object.assign(user, updateAdminDto);

    // If a new password is provided, hash it
    if (updateAdminDto.password) {
      user.passwordHash = await argon2.hash(updateAdminDto.password);
    }

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    await this.adminsRepository.remove(admin);
  }

  async searchAdmins(query: string): Promise<Admin[]> {
    const users = await this.usersRepository.find({
      where: [
        { firstName: Like(`%${query}%`) },
        { lastName: Like(`%${query}%`) },
        { email: Like(`%${query}%`) },
        { admin: Not(null) },
      ],
      relations: ["admin"],
    });
    return users.map((u) => u.admin);
  }
}
