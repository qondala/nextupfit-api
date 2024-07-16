import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from "@nestjs/common";
import { CoachSpecializationsService } from "./coachspecializations.service";
import { Request } from "express";
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { CoachSpecialization } from "../../entities/coach-specialization.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreateCoachSpecializationDto } from "./dto/create-coachspecialization.dto";
import { UpdateCoachSpecializationDto } from "./dto/update-coachspecialization.dto";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("CoachSpecializations")
@ApiBearerAuth()
@Controller("coach-specializations")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoachSpecializationsController {
  constructor(
    private readonly coachSpecializationsService: CoachSpecializationsService,
  ) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateCoachSpecializationDto })
  @ApiCreatedResponse({
    description: "Coach specialization created successfully",
    type: CoachSpecialization,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create coach specialization",
  })
  create(
    @Body() createCoachSpecializationDto: CreateCoachSpecializationDto,
    @Req() request: Request,
  ) {
    return this.coachSpecializationsService.create(
      createCoachSpecializationDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all coach specializations",
    type: [CoachSpecialization],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach specializations",
  })
  findAll() {
    return this.coachSpecializationsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the coach specialization",
    type: "number",
  })
  @ApiOkResponse({
    description: "Coach specialization found successfully",
    type: CoachSpecialization,
  })
  @ApiNotFoundResponse({ description: "Coach specialization not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach specialization",
  })
  findOne(@Param("id") id: string) {
    return this.coachSpecializationsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the coach specialization",
    type: "number",
  })
  @ApiBody({ type: UpdateCoachSpecializationDto })
  @ApiOkResponse({
    description: "Coach specialization updated successfully",
    type: CoachSpecialization,
  })
  @ApiNotFoundResponse({ description: "Coach specialization not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update coach specialization",
  })
  update(
    @Param("id") id: string,
    @Body() updateCoachSpecializationDto: UpdateCoachSpecializationDto,
    @Req() request: Request,
  ) {
    return this.coachSpecializationsService.update(
      +id,
      updateCoachSpecializationDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the coach specialization",
    type: "number",
  })
  @ApiOkResponse({ description: "Coach specialization deleted successfully" })
  @ApiNotFoundResponse({ description: "Coach specialization not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete coach specialization",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.coachSpecializationsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of coach specializations matching the search query",
    type: [CoachSpecialization],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search coach specializations",
  })
  searchCoachSpecializations(@Query("query") query: string) {
    return this.coachSpecializationsService.searchCoachSpecializations(query);
  }

  @Get("coach/:coachId")
  @ApiParam({ name: "coachId", description: "ID of the coach", type: "number" })
  @ApiOkResponse({
    description: "List of coach specializations for the coach",
    type: [CoachSpecialization],
  })
  @ApiNotFoundResponse({ description: "Coach not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach specializations for the coach",
  })
  findByCoach(@Param("coachId") coachId: string) {
    return this.coachSpecializationsService.findByCoach(+coachId);
  }
}
