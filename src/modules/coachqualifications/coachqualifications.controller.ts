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
import { CreateCoachQualificationDto } from "./dto/create-coachqualification.dto";
import { UpdateCoachQualificationDto } from "./dto/update-coachqualification.dto";
import {} from "@nestjs/passport";
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
import { CoachQualificationsService } from "./coachqualifications.servive";
import { CoachQualification } from "../../entities/coach-qualification.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { Request } from "express";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("CoachQualifications")
@ApiBearerAuth()
@Controller("coach-qualifications")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoachQualificationsController {
  constructor(
    private readonly coachQualificationsService: CoachQualificationsService,
  ) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateCoachQualificationDto })
  @ApiCreatedResponse({
    description: "Coach qualification created successfully",
    type: CoachQualification,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create coach qualification",
  })
  create(
    @Body() createCoachQualificationDto: CreateCoachQualificationDto,
    @Req() request: Request,
  ) {
    return this.coachQualificationsService.create(
      createCoachQualificationDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all coach qualifications",
    type: [CoachQualification],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach qualifications",
  })
  findAll() {
    return this.coachQualificationsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the coach qualification",
    type: "number",
  })
  @ApiOkResponse({
    description: "Coach qualification found successfully",
    type: CoachQualification,
  })
  @ApiNotFoundResponse({ description: "Coach qualification not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach qualification",
  })
  findOne(@Param("id") id: string) {
    return this.coachQualificationsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the coach qualification",
    type: "number",
  })
  @ApiBody({ type: UpdateCoachQualificationDto })
  @ApiOkResponse({
    description: "Coach qualification updated successfully",
    type: CoachQualification,
  })
  @ApiNotFoundResponse({ description: "Coach qualification not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update coach qualification",
  })
  update(
    @Param("id") id: string,
    @Body() updateCoachQualificationDto: UpdateCoachQualificationDto,
    @Req() request: Request,
  ) {
    return this.coachQualificationsService.update(
      +id,
      updateCoachQualificationDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the coach qualification",
    type: "number",
  })
  @ApiOkResponse({ description: "Coach qualification deleted successfully" })
  @ApiNotFoundResponse({ description: "Coach qualification not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete coach qualification",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.coachQualificationsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of coach qualifications matching the search query",
    type: [CoachQualification],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search coach qualifications",
  })
  searchCoachQualifications(@Query("query") query: string) {
    return this.coachQualificationsService.searchCoachQualifications(query);
  }

  @Get("coach/:coachId")
  @ApiParam({ name: "coachId", description: "ID of the coach", type: "number" })
  @ApiOkResponse({
    description: "List of coach qualifications for the coach",
    type: [CoachQualification],
  })
  @ApiNotFoundResponse({ description: "Coach not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach qualifications for the coach",
  })
  findByCoach(@Param("coachId") coachId: string) {
    return this.coachQualificationsService.findByCoach(+coachId);
  }
}
