// admin-earnings.controller.ts

import {
  Controller,
  UseGuards,
  Get,
  Query,
  ParseIntPipe,
  Body,
  Delete,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import { UserRole } from "src/shared/constants/roles";
import { Roles, RolesGuard } from "src/shared/guards/roles.guards";
import { AdminService } from "./admin.service";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { Admin } from "src/entities/admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@ApiTags("Admin")
@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(UserRole.ADMIN) // Restreindre l'accès aux administrateurs
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Get("daily")
  // @ApiOkResponse({
  //   type: [Number],
  //   description: "Successfully retrieved daily earnings",
  // })
  // getDailyEarnings(@Query("days") days: number = 30): Promise<number[]> {
  //   return this.adminService.getDailyEarnings(days);
  // }

  //   @Get("weekly")
  //   @ApiOkResponse({
  //     type: [Number],
  //     description: "Successfully retrieved weekly earnings",
  //   })
  //   getWeeklyEarnings(@Query("weeks") weeks: number = 7): Promise<number[]> {
  //     return this.adminService.getWeeklyEarnings(weeks);
  //   }

  // @Get("monthly")
  // @ApiOkResponse({
  //   type: [Number],
  //   description: "Successfully retrieved monthly earnings",
  // })
  // getMonthlyEarnings(@Query("months") months: number = 12): Promise<number[]> {
  //   return this.adminService.getMonthlyEarnings(months);
  // }

  @Get("users/daily")
  @ApiOkResponse({
    type: [Number],
    description: "Successfully retrieved daily users count",
  })
  getDailyUsers(
    @Query("days", ParseIntPipe) days: number = 30,
  ): Promise<number[]> {
    return this.adminService.getDailyUsers(days);
  }

  @Get("users/weekly")
  @ApiOkResponse({
    type: [Number],
    description: "Successfully retrieved weekly users count",
  })
  getWeeklyUsers(
    @Query("weeks", ParseIntPipe) weeks: number = 7,
  ): Promise<number[]> {
    return this.adminService.getWeeklyUsers(weeks);
  }

  @Get("users/monthly")
  @ApiOkResponse({
    type: [Number],
    description: "Successfully retrieved monthly users count",
  })
  getMonthlyUsers(
    @Query("months", ParseIntPipe) months: number = 12,
  ): Promise<number[]> {
    return this.adminService.getMonthlyUsers(months);
  }

  @Get("users/yearly")
  @ApiOkResponse({
    type: [Number],
    description: "Successfully retrieved yearly users count",
  })
  getYearlyUsers(
    @Query("years", ParseIntPipe) years: number = 5,
  ): Promise<number[]> {
    return this.adminService.getYearlyUsers(years);
  }

  @Get("users/last-year")
  @ApiOkResponse({
    type: [Number],
    description: "Successfully retrieved last year users count",
  })
  getLastYearUsers(
    @Query("years", ParseIntPipe) years: number = 5,
  ): Promise<number[]> {
    return this.adminService.getLastYearUsers(years);
  }

  @Get("earnings/daily")
  @ApiOkResponse({
    type: [Number],
    description: "Successfully retrieved daily earnings",
  })
  getDailyEarnings(
    @Query("days", ParseIntPipe) days: number = 30,
  ): Promise<number[]> {
    return this.adminService.getDailyEarnings(days);
  }

  @Get("earnings/weekly")
  @ApiOkResponse({
    type: [Number],
    description: "Successfully retrieved weekly earnings",
  })
  getWeeklyEarnings(
    @Query("weeks", ParseIntPipe) weeks: number = 7,
  ): Promise<number[]> {
    return this.adminService.getWeeklyEarnings(weeks);
  }

  @Get("earnings/monthly")
  @ApiOkResponse({
    type: [Number],
    description: "Successfully retrieved monthly earnings",
  })
  getMonthlyEarnings(
    @Query("months", ParseIntPipe) months: number = 12,
  ): Promise<number[]> {
    return this.adminService.getMonthlyEarnings(months);
  }

  @Get("balance")
  @ApiOkResponse({
    type: Number,
    description: "Admin balance retrieved successfully",
  })
  getAdminBalance(): Promise<number> {
    return this.adminService.getAdminBalance();
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Create a new admin" })
  @ApiCreatedResponse({
    description: "Admin created successfully",
    type: Admin,
  })
  async create(@Body() createAdminDto: CreateAdminDto) {
    const createdAdmin = await this.adminService.create(createAdminDto);
    return createdAdmin;
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Get all admins" })
  @ApiOkResponse({ description: "List of admins", type: [Admin] })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Get an admin by ID" })
  @ApiOkResponse({ description: "Admin found", type: Admin })
  @ApiNotFoundResponse({ description: "Admin not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.adminService.findOne(id);
  }

  @Patch(":id")
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Update an admin" })
  @ApiOkResponse({ description: "Admin updated successfully", type: Admin })
  @ApiNotFoundResponse({ description: "Admin not found" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(":id")
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Delete an admin" })
  @ApiOkResponse({ description: "Admin deleted successfully" })
  @ApiNotFoundResponse({ description: "Admin not found" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.adminService.remove(id);
  }

  @Get("search")
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Search admins" })
  @ApiOkResponse({
    description: "List of admins matching the search criteria",
    type: [Admin],
  })
  searchAdmins(@Query("query") query: string) {
    return this.adminService.searchAdmins(query);
  }
}
