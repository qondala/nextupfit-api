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
import { CreateTrainingContentLinkDto } from "./dto/create-trainingcontentlink.dto";
import { UpdateTrainingContentLinkDto } from "./dto/update-trainingcontentlink.dto";

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
import { TrainingContentLink } from "../../entities/training-content-link.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { TrainingContentLinksService } from "./trainingcontentlinks.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("TrainingContentLinks")
@ApiBearerAuth()
@Controller("training-content-links")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TrainingContentLinksController {
  constructor(
    private readonly trainingContentLinksService: TrainingContentLinksService,
  ) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateTrainingContentLinkDto })
  @ApiCreatedResponse({
    description: "Training content link created successfully",
    type: TrainingContentLink,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create training content link",
  })
  create(
    @Body() createTrainingContentLinkDto: CreateTrainingContentLinkDto,
    @Req() request: Request,
  ) {
    return this.trainingContentLinksService.create(
      createTrainingContentLinkDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all training content links",
    type: [TrainingContentLink],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch training content links",
  })
  findAll() {
    return this.trainingContentLinksService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the training content link",
    type: "number",
  })
  @ApiOkResponse({
    description: "Training content link found successfully",
    type: TrainingContentLink,
  })
  @ApiNotFoundResponse({ description: "Training content link not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch training content link",
  })
  findOne(@Param("id") id: string) {
    return this.trainingContentLinksService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the training content link",
    type: "number",
  })
  @ApiBody({ type: UpdateTrainingContentLinkDto })
  @ApiOkResponse({
    description: "Training content link updated successfully",
    type: TrainingContentLink,
  })
  @ApiNotFoundResponse({ description: "Training content link not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update training content link",
  })
  update(
    @Param("id") id: string,
    @Body() updateTrainingContentLinkDto: UpdateTrainingContentLinkDto,
    @Req() request: Request,
  ) {
    return this.trainingContentLinksService.update(
      +id,
      updateTrainingContentLinkDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the training content link",
    type: "number",
  })
  @ApiOkResponse({ description: "Training content link deleted successfully" })
  @ApiNotFoundResponse({ description: "Training content link not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete training content link",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.trainingContentLinksService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of training content links matching the search query",
    type: [TrainingContentLink],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search training content links",
  })
  searchTrainingContentLinks(@Query("query") query: string) {
    return this.trainingContentLinksService.searchTrainingContentLinks(query);
  }

  @Get("session/:sessionId")
  @ApiParam({
    name: "sessionId",
    description: "ID of the session",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of training content links for the session",
    type: [TrainingContentLink],
  })
  @ApiNotFoundResponse({ description: "Session not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch training content links for the session",
  })
  findBySession(@Param("sessionId") sessionId: string) {
    return this.trainingContentLinksService.findBySession(+sessionId);
  }

  @Get("content/:contentId")
  @ApiParam({
    name: "contentId",
    description: "ID of the content",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of training content links for the content",
    type: [TrainingContentLink],
  })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch training content links for the content",
  })
  findByContent(@Param("contentId") contentId: string) {
    return this.trainingContentLinksService.findByContent(+contentId);
  }
}
