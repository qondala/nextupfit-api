// admin-earnings.controller.ts

import { Controller, UseGuards, Get, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { UserRole } from "src/shared/constants/roles";
import { Roles } from "src/shared/guards/roles.guards";
import { AdminService } from "./admin.service";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";

@ApiTags("Admin")
@Controller("admin")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Roles(UserRole.ADMIN) // Restreindre l'accès aux administrateurs
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("daily")
  @ApiOkResponse({
    type: [Number],
    description: "Successfully retrieved daily earnings",
  })
  getDailyEarnings(@Query("days") days: number = 30): Promise<number[]> {
    return this.adminService.getDailyEarnings(days);
  }

  //   @Get("weekly")
  //   @ApiOkResponse({
  //     type: [Number],
  //     description: "Successfully retrieved weekly earnings",
  //   })
  //   getWeeklyEarnings(@Query("weeks") weeks: number = 7): Promise<number[]> {
  //     return this.adminService.getWeeklyEarnings(weeks);
  //   }

  @Get("monthly")
  @ApiOkResponse({
    type: [Number],
    description: "Successfully retrieved monthly earnings",
  })
  getMonthlyEarnings(@Query("months") months: number = 12): Promise<number[]> {
    return this.adminService.getMonthlyEarnings(months);
  }
}
