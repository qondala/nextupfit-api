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
import { CreateCoachFollowDto } from "./dto/create-coachfollow.dto";
import { UpdateCoachFollowDto } from "./dto/update-coachfollow.dto";

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
import { CoachFollow } from "../../entities/coach-follow.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CoachFollowsService } from "./caochfollows.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("CoachFollows")
@ApiBearerAuth()
@Controller("coach-follows")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoachFollowsController {
  constructor(private readonly coachFollowsService: CoachFollowsService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateCoachFollowDto })
  @ApiCreatedResponse({
    description: "Coach rating created successfully",
    type: CoachFollow,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create coach rating",
  })
  create(
    @Body() createCoachFollowDto: CreateCoachFollowDto,
    @Req() request: Request,
  ) {
    return this.coachFollowsService.create(
      createCoachFollowDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all coach ratings",
    type: [CoachFollow],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach ratings",
  })
  findAll() {
    return this.coachFollowsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the coach rating",
    type: "number",
  })
  @ApiOkResponse({
    description: "Coach rating found successfully",
    type: CoachFollow,
  })
  @ApiNotFoundResponse({ description: "Coach rating not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach rating",
  })
  findOne(@Param("id") id: string) {
    return this.coachFollowsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the coach rating",
    type: "number",
  })
  @ApiBody({ type: UpdateCoachFollowDto })
  @ApiOkResponse({
    description: "Coach rating updated successfully",
    type: CoachFollow,
  })
  @ApiNotFoundResponse({ description: "Coach rating not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update coach rating",
  })
  update(
    @Param("id") id: string,
    @Body() updateCoachFollowDto: UpdateCoachFollowDto,
    @Req() request: Request,
  ) {
    return this.coachFollowsService.update(
      +id,
      updateCoachFollowDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the coach rating",
    type: "number",
  })
  @ApiOkResponse({ description: "Coach rating deleted successfully" })
  @ApiNotFoundResponse({ description: "Coach rating not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete coach rating",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.coachFollowsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of coach ratings matching the search query",
    type: [CoachFollow],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search coach ratings",
  })
  searchCoachFollows(@Query("query") query: string) {
    return this.coachFollowsService.searchCoachFollows(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of coach ratings for the user",
    type: [CoachFollow],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach ratings for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.coachFollowsService.findByUser(+userId);
  }

  @Get("coach/:coachId")
  @ApiParam({ name: "coachId", description: "ID of the coach", type: "number" })
  @ApiOkResponse({
    description: "List of coach ratings for the coach",
    type: [CoachFollow],
  })
  @ApiNotFoundResponse({ description: "Coach not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch coach ratings for the coach",
  })
  findByCoach(@Param("coachId") coachId: string) {
    return this.coachFollowsService.findByCoach(+coachId);
  }
}
