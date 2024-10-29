import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Get,
  ParseIntPipe,
} from "@nestjs/common";
import { Request } from "express";
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { CoachTransfer } from "src/entities/coach-transfer.entity";
import { UserRole } from "src/shared/constants/roles";
import { Roles } from "src/shared/guards/roles.guards";
import { CoachTransfersService } from "./coachtransfers.service";
import { CreateCoachTransferDto } from "./dto/create-coachtransfer.dto";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";

@ApiTags("Coach Transfers")
@ApiBearerAuth()
@Controller("coach-transfers") // Mettez à jour le chemin de la route
@UseGuards(JwtAuthGuard)
export class CoachTransfersController {
  constructor(private readonly coachTransfersService: CoachTransfersService) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateCoachTransferDto })
  @ApiCreatedResponse({
    description: "Transfer request created successfully.",
    type: CoachTransfer,
  })
  create(
    @Body() createCoachTransferDto: CreateCoachTransferDto,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    return this.coachTransfersService.create(createCoachTransferDto, userId);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({
    description: "Successfully retrieved all transfer requests.",
    type: [CoachTransfer],
  })
  findAll(): Promise<CoachTransfer[]> {
    return this.coachTransfersService.findAll();
  }

  @Get(":id")
  @Roles(UserRole.ADMIN, UserRole.COACH) // Les coachs peuvent voir leurs propres transferts
  @ApiOkResponse({
    description: "Successfully retrieved transfer requests.",
    type: CoachTransfer,
  })
  findOne(@Param("id") id: string): Promise<CoachTransfer> {
    return this.coachTransfersService.findOne(+id);
  }

  @Get("coach/:coachId")
  @Roles(UserRole.ADMIN, UserRole.COACH) // Les coachs peuvent voir leurs propres transferts
  @ApiOkResponse({
    description: "Successfully retrieved transfer requests.",
    type: CoachTransfer,
  })
  findByCoach(
    @Param("coachId", ParseIntPipe) coachId: number,
  ): Promise<CoachTransfer> {
    return this.coachTransfersService.findByCoach(+coachId);
  }
}
