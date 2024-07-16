import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Coach } from "../../entities/coach.entity";
import { Content } from "../../entities/content.entity";
import { User } from "../../entities/user.entity";
import { ScheduleMacroModel } from "../../shared/models/schedule-macro.model";

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async getAdminInsights(): Promise<ScheduleMacroModel[]> {
    const totalUsers = await this.userRepository.count();
    const totalCoaches = await this.coachRepository.count();
    const totalNutritionists = await this.coachRepository.count({
      where: { type: "nutritionist" }, // Filtrez les coachs par type
    });
    const averageUserAge = await this.userRepository
      .createQueryBuilder("user")
      .select("AVG(YEAR(CURRENT_DATE) - YEAR(user.createdAt))", "averageAge")
      .getRawOne();
    const totalEarnings = await this.contentRepository
      .createQueryBuilder("content")
      .select("SUM(content.price)", "totalEarnings")
      .getRawOne();
    const totalSessions = await this.contentRepository.count({
      where: { contentType: "Session" }, // Filtrez les contenus par type
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
        macroValue: averageUserAge.averageAge.toFixed(0), // Ajustez le formatage de l'âge
        macroUnit: "",
        iconColor: "#ffc107",
      },
      {
        id: 4,
        name: "macro_total_earning_lbl",
        iconPath: "earningMacroIcon",
        macroValue: totalEarnings.totalEarnings.toFixed(2), // Ajustez le formatage des gains
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
