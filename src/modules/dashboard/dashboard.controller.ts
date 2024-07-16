import { Controller, Get } from "@nestjs/common";
import { ScheduleMacroModel } from "src/shared/models/schedule-macro.model";
import { DashboardService } from "./dashbord.service";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("admin")
  async getAdminInsights(): Promise<ScheduleMacroModel[]> {
    const insights = await this.dashboardService.getAdminInsights();
    return insights;
  }
}
