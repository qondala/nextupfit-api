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
import { Challenge } from "../../entities/challenge.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { ChallengesService } from "./challenges.service";
import { CreateChallengeDto } from "./dto/create-challenge.dto";
import { UpdateChallengeDto } from "./dto/update-challenge.dto";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("Challenges")
@ApiBearerAuth()
@Controller("challenges")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateChallengeDto })
  @ApiCreatedResponse({
    description: "Challenge created successfully",
    type: Challenge,
  })
  @ApiInternalServerErrorResponse({ description: "Failed to create challenge" })
  create(
    @Body() createChallengeDto: CreateChallengeDto,
    @Req() request: Request,
  ) {
    return this.challengesService.create(createChallengeDto, request.user.id);
  }

  @Get()
  @ApiOkResponse({ description: "List of all challenges", type: [Challenge] })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch challenges" })
  findAll() {
    return this.challengesService.findAll();
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "ID of the challenge", type: "number" })
  @ApiOkResponse({
    description: "Challenge found successfully",
    type: Challenge,
  })
  @ApiNotFoundResponse({ description: "Challenge not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch challenge" })
  findOne(@Param("id") id: string) {
    return this.challengesService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the challenge", type: "number" })
  @ApiBody({ type: UpdateChallengeDto })
  @ApiOkResponse({
    description: "Challenge updated successfully",
    type: Challenge,
  })
  @ApiNotFoundResponse({ description: "Challenge not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to update challenge" })
  update(
    @Param("id") id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
    @Req() request: Request,
  ) {
    return this.challengesService.update(
      +id,
      updateChallengeDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the challenge", type: "number" })
  @ApiOkResponse({ description: "Challenge deleted successfully" })
  @ApiNotFoundResponse({ description: "Challenge not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to delete challenge" })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.challengesService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of challenges matching the search query",
    type: [Challenge],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search challenges",
  })
  searchChallenges(@Query("query") query: string) {
    return this.challengesService.searchChallenges(query);
  }

  @Get("content/:contentId")
  @ApiParam({
    name: "contentId",
    description: "ID of the content",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of challenges for the content",
    type: [Challenge],
  })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch challenges for the content",
  })
  findByContent(@Param("contentId") contentId: string) {
    return this.challengesService.findByContent(+contentId);
  }


  @Get("category/:categoryId")
  @ApiParam({
    name: "categoryId",
    description: "ID of the category",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of challenges for the category",
    type: [Challenge],
  })
  @ApiNotFoundResponse({ description: "category not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch challenges for the category",
  })
  findByCategory(@Param("contentId") contentId: string) {
    return this.challengesService.findByCategory(+contentId);
  }
}
