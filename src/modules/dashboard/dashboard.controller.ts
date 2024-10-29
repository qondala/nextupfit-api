import { Controller, Get, Req } from "@nestjs/common";
import { ScheduleMacroModel } from "src/shared/models/schedule-macro.model";
import { DashboardService } from "./dashbord.service";
import { Request } from "express";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("admin")
  async getAdminInsights(
    @Req() request: Request,
  ): Promise<ScheduleMacroModel[]> {
    const insights = await this.dashboardService.getAdminInsights(
      request.user.id,
    );
    return insights;
  }
}
