// admin-earnings.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "src/entities/payment.entity";
import { Between, Like, Repository } from "typeorm";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { User } from "src/entities/user.entity";
import { Admin } from "src/entities/admin.entity";
import * as argon2 from "argon2";
import { Coach } from "src/entities/coach.entity";
import {
  startOfDay,
  subDays,
  startOfWeek,
  subWeeks,
  startOfMonth,
  subMonths,
  startOfYear,
  subYears,
} from "date-fns";

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
    @InjectRepository(Coach)
    private coachesRepository: Repository<Coach>,
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

  async getDailyUsers(days: number): Promise<number[]> {
    const dailyUsers = [];
    for (let i = 0; i < days; i++) {
      const startDate = startOfDay(subDays(new Date(), i));
      const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000 - 1); //  Fin de la journée

      const count = await this.usersRepository.count({
        where: { createdAt: Between(startDate, endDate) },
      });
      dailyUsers.push(count);
    }
    return dailyUsers.reverse(); // Inverser le tableau pour avoir les dates dans l'ordre croissant
  }

  async getWeeklyUsers(weeks: number): Promise<number[]> {
    const weeklyUsers = [];
    for (let i = 0; i < weeks; i++) {
      const startDate = startOfWeek(subWeeks(new Date(), i));
      const endDate = new Date(
        startDate.getTime() + 7 * 24 * 60 * 60 * 1000 - 1,
      ); // Fin de la semaine

      const count = await this.usersRepository.count({
        where: { createdAt: Between(startDate, endDate) },
      });
      weeklyUsers.push(count);
    }
    return weeklyUsers.reverse();
  }

  async getMonthlyUsers(months: number): Promise<number[]> {
    const monthlyUsers = [];
    for (let i = 0; i < months; i++) {
      const startDate = startOfMonth(subMonths(new Date(), i));
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        0,
        23,
        59,
        59,
      ); // Fin du mois

      const count = await this.usersRepository.count({
        where: { createdAt: Between(startDate, endDate) },
      });
      monthlyUsers.push(count);
    }
    return monthlyUsers.reverse();
  }

  async getYearlyUsers(years: number): Promise<number[]> {
    const yearlyUsers = [];
    for (let i = 0; i < years; i++) {
      const startDate = startOfYear(subYears(new Date(), i));
      const endDate = new Date(startDate.getFullYear() + 1, 0, 0, 23, 59, 59);

      const count = await this.usersRepository.count({
        where: { createdAt: Between(startDate, endDate) },
      });
      yearlyUsers.push(count);
    }
    return yearlyUsers.reverse();
  }

  async getLastYearUsers(years: number): Promise<number[]> {
    const lastYearUsers = [];
    for (let i = 1; i <= years; i++) {
      // Commence à 1 pour l'année précédente
      const startDate = startOfYear(subYears(new Date(), i));
      const endDate = new Date(startDate.getFullYear() + 1, 0, 0, 23, 59, 59);

      const count = await this.usersRepository.count({
        where: { createdAt: Between(startDate, endDate) },
      });
      lastYearUsers.push(count);
    }
    return lastYearUsers.reverse();
  }

  // async getDailyEarnings(days: number): Promise<number[]> {
  //   const dailyEarnings = [];
  //   for (let i = 0; i < days; i++) {
  //     const startDate = startOfDay(subDays(new Date(), i));
  //     const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000 - 1);

  //     const payments = await this.paymentsRepository.find({
  //       where: { paymentDate: Between(startDate, endDate) },
  //     });
  //     const totalEarnings = payments.reduce(
  //       (sum, payment) => sum + payment.amountPaid,
  //       0,
  //     );
  //     dailyEarnings.push(totalEarnings);
  //   }
  //   return dailyEarnings.reverse();
  // }

  async getWeeklyEarnings(weeks: number): Promise<number[]> {
    const weeklyEarnings = [];
    for (let i = 0; i < weeks; i++) {
      const startDate = startOfWeek(subWeeks(new Date(), i));
      const endDate = new Date(
        startDate.getTime() + 7 * 24 * 60 * 60 * 1000 - 1,
      ); // Fin de la semaine

      const payments = await this.paymentsRepository.find({
        where: { paymentDate: Between(startDate, endDate) },
      });
      const totalEarnings = payments.reduce(
        (sum, payment) => sum + payment.amountPaid,
        0,
      );
      weeklyEarnings.push(totalEarnings);
    }
    return weeklyEarnings.reverse();
  }

  // async getMonthlyEarnings(months: number): Promise<number[]> {
  //   const monthlyEarnings = [];
  //   for (let i = 0; i < months; i++) {
  //     const startDate = startOfMonth(subMonths(new Date(), i));
  //     const endDate = new Date(
  //       startDate.getFullYear(),
  //       startDate.getMonth() + 1,
  //       0,
  //       23,
  //       59,
  //       59,
  //     ); // Fin du mois

  //     const payments = await this.paymentsRepository.find({
  //       where: { paymentDate: Between(startDate, endDate) },
  //     });
  //     const totalEarnings = payments.reduce(
  //       (sum, payment) => sum + payment.amountPaid,
  //       0,
  //     );
  //     monthlyEarnings.push(totalEarnings);
  //   }
  //   return monthlyEarnings.reverse();
  // }

  async getAdminBalance(): Promise<number> {
    const payments = await this.paymentsRepository.find();
    const adminCommissionRate = 0.1;
    let adminBalance = 0;
    for (const payment of payments) {
      adminBalance += payment.amountPaid * adminCommissionRate;
    }
    return adminBalance;
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const existingAdmin = await this.adminsRepository.findOne({
      where: { coach: { id: createAdminDto.caochId } },
    });
    if (existingAdmin) {
      throw new BadRequestException("Admin with this email already exists");
    }
    const admin = this.adminsRepository.create({
      coach: { id: createAdminDto.caochId },
    });
    return admin;
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminsRepository.find({
      relations: ["coach", "coach.user"],
    });
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminsRepository.findOne({
      where: { id },
      relations: ["coach", "coach.sessions", "coach.user", "employees"],
    });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    const coach = await this.coachesRepository.findOneBy({
      id: admin.coach.id,
    });

    if (!coach) {
      throw new NotFoundException(`Coach with ID ${admin.coach.id} not found`);
    }

    // Update the admin's data
    Object.assign(coach.user, updateAdminDto);

    // If a new password is provided, hash it
    if (updateAdminDto.password) {
      coach.user.passwordHash = await argon2.hash(updateAdminDto.password);
    }

    await this.coachesRepository.save(coach);

    return admin;
  }

  async remove(id: number): Promise<void> {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    await this.adminsRepository.remove(admin);
  }

  async searchAdmins(query: string): Promise<Admin[]> {
    return await this.adminsRepository.find({
      where: [
        { coach: { user: { firstName: Like(`%${query}%`) } } },
        { coach: { user: { lastName: Like(`%${query}%`) } } },
        { coach: { user: { email: Like(`%${query}%`) } } },
      ],
      relations: ["coach", "coach.user"],
    });
  }
}
