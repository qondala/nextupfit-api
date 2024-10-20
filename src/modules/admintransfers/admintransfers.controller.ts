// src/admin-transfers/admin-transfers.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  ParseIntPipe,
  Req,
} from "@nestjs/common";

import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { UserRole } from "src/shared/constants/roles";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { Roles } from "src/shared/guards/roles.guards";
import { AdminTransfersService } from "./admintransfers.service";
import { CreateAdminTransferDto } from "./dto/create-admintransfer.dto";
import { Request } from "express";

@ApiTags("Admin Transfers")
@Controller("admin-transfers")
@UseGuards(JwtAuthGuard) // Protéger les routes avec l'authentification JWT
@ApiBearerAuth()
export class AdminTransfersController {
  constructor(private readonly adminTransfersService: AdminTransfersService) {}

  @Post()
  @Roles(UserRole.ADMIN) // Restreindre l'accès aux administrateurs
  @ApiCreatedResponse({ description: "Admin transfer created successfully" })
  create(
    @Body() createAdminTransferDto: CreateAdminTransferDto,
    @Req() request: Request,
  ) {
    return this.adminTransfersService.create(
      createAdminTransferDto,
      request.user.id,
    );
  }

  @Get()
  @Roles(UserRole.ADMIN) // Restreindre l'accès aux administrateurs
  @ApiOkResponse({ description: "List of all admin transfers" })
  findAll() {
    return this.adminTransfersService.findAll();
  }

  @Get("balance")
  @Roles(UserRole.ADMIN) // Restreindre l'accès aux administrateurs
  @ApiOkResponse({ description: "Admin balance retrieved successfully" })
  getAdminBalance() {
    return this.adminTransfersService.getAdminBalance();
  }

  @Get(":id")
  @Roles(UserRole.ADMIN) // Restreindre l'accès aux administrateurs
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.adminTransfersService.findOne(id);
  }

  @Get("admin/:adminId")
  @Roles(UserRole.ADMIN) // Restreindre l'accès aux administrateurs
  findByAdmin(@Param("adminId", ParseIntPipe) adminId) {
    return this.adminTransfersService.findByAdmin(adminId);
  }
}
