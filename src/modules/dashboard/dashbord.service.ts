import { Injectable, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { Coach } from "../../entities/coach.entity";
import { Content } from "../../entities/content.entity";
import { ScheduleMacroModel } from "../../shared/models/schedule-macro.model";
import { differenceInYears } from "date-fns";
import { Admin } from "src/entities/admin.entity";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UserRole } from "src/shared/constants/roles";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { RolesGuard, Roles } from "src/shared/guards/roles.guards";

@Injectable()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async getAdminInsights(userId: number): Promise<ScheduleMacroModel[]> {
    // 1. Trouver l'admin et ses employés (coachs)
    const admin = await this.adminRepository.findOne({
      where: { coach: { user: { id: userId } } },
      relations: ["employees", "employees.coach"], // Assurez-vous d'avoir la relation "employees" dans l'entité Coach
    });

    if (!admin) {
      throw new Error(`Admin with User ID ${userId} not found`);
    }

    // 2. Récupérer les IDs des coachs (employés de l'admin)
    const coachIds = admin.employees.map((employee) => employee.id);

    // 3. Calculer le nombre total d'utilisateurs qui suivent les coachs de l'admin
    const totalUsers = await this.userRepository.count({
      where: { coach: { id: In(coachIds) } },
    });

    // 4. Calculer le nombre total de coachs (employés de l'admin)
    const totalCoaches = coachIds.length;

    // 5. Calculer le nombre total de nutritionnistes (employés de l'admin)
    const totalNutritionists = await this.coachRepository.count({
      where: { id: In(coachIds), type: "nutritionist" },
    });

    // 6. Calculer l'âge moyen des utilisateurs qui suivent les coachs de l'admin
    const users = await this.userRepository.find({
      where: { coach: { id: In(coachIds) } },
    });
    let totalAge = 0;
    for (const user of users) {
      totalAge += differenceInYears(new Date(), user.createdAt);
    }
    const averageUserAge = totalUsers > 0 ? totalAge / totalUsers : 0;

    // 7. Calculer les gains totaux des coachs de l'admin
    const contents = await this.contentRepository.find({
      where: { coach: { id: In(coachIds) } },
      relations: ["payments"],
    });

    let totalEarnings = 0;
    for (const content of contents) {
      for (const payment of content.payments) {
        totalEarnings += payment.amountPaid;
      }
    }

    // 8. Calculer le nombre total de sessions créées par les coachs de l'admin
    const totalSessions = await this.contentRepository.count({
      where: { coach: { id: In(coachIds) }, contentType: "session" },
    });

    // Construire la liste de statistiques
    return [
      {
        id: 0,
        name: "total_user_lbl",
        iconPath: "userMacroIcon",
        macroValue: totalUsers.toString(),
        macroUnit: "",
        iconColor: "#007bff",
      },
      {
        id: 1,
        name: "total_trainer_lbl",
        iconPath: "trainerMacroIcon",
        macroValue: totalCoaches.toString(),
        macroUnit: "",
        iconColor: "#d81b60",
      },
      {
        id: 2,
        name: "total_nutritionist_lbl",
        iconPath: "nutritionMacroIcon",
        macroValue: totalNutritionists.toString(),
        macroUnit: "",
        iconColor: "#673ab7",
      },
      {
        id: 3,
        name: "user_avg_age_lbl",
        iconPath: "ageMacroIcon",
        macroValue: averageUserAge.toFixed(0), // Ajustez le formatage de l'âge
        macroUnit: "",
        iconColor: "#ffc107",
      },
      {
        id: 4,
        name: "macro_total_earning_lbl",
        iconPath: "earningMacroIcon",
        macroValue: totalEarnings.toFixed(2), // Formatage des gains
        macroUnit: "k",
        iconColor: "#4caf50",
      },
      {
        id: 5,
        name: "total_session_lbl",
        iconPath: "sessionMacroIcon",
        macroValue: totalSessions.toString(),
        macroUnit: "",
        iconColor: "#c7254e",
      },
    ] as ScheduleMacroModel[];
  }
}
