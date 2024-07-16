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
import { SessionReviewsService } from "./sessionreviews.service";
import { CreateSessionReviewDto } from "./dto/create-sessionreview.dto";
import { UpdateSessionReviewDto } from "./dto/update-sessionreview.dto";
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
import { SessionReview } from "../../entities/session-review.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("SessionReviews")
@ApiBearerAuth()
@Controller("session-reviews")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SessionReviewsController {
  constructor(private readonly sessionReviewsService: SessionReviewsService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateSessionReviewDto })
  @ApiCreatedResponse({
    description: "Session review created successfully",
    type: SessionReview,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create session review",
  })
  create(
    @Body() createSessionReviewDto: CreateSessionReviewDto,
    @Req() request: Request,
  ) {
    return this.sessionReviewsService.create(
      createSessionReviewDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all session reviews",
    type: [SessionReview],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch session reviews",
  })
  findAll() {
    return this.sessionReviewsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the session review",
    type: "number",
  })
  @ApiOkResponse({
    description: "Session review found successfully",
    type: SessionReview,
  })
  @ApiNotFoundResponse({ description: "Session review not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch session review",
  })
  findOne(@Param("id") id: string) {
    return this.sessionReviewsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the session review",
    type: "number",
  })
  @ApiBody({ type: UpdateSessionReviewDto })
  @ApiOkResponse({
    description: "Session review updated successfully",
    type: SessionReview,
  })
  @ApiNotFoundResponse({ description: "Session review not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update session review",
  })
  update(
    @Param("id") id: string,
    @Body() updateSessionReviewDto: UpdateSessionReviewDto,
    @Req() request: Request,
  ) {
    return this.sessionReviewsService.update(
      +id,
      updateSessionReviewDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the session review",
    type: "number",
  })
  @ApiOkResponse({ description: "Session review deleted successfully" })
  @ApiNotFoundResponse({ description: "Session review not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete session review",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.sessionReviewsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of session reviews matching the search query",
    type: [SessionReview],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search session reviews",
  })
  searchSessionReviews(@Query("query") query: string) {
    return this.sessionReviewsService.searchSessionReviews(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of session reviews for the user",
    type: [SessionReview],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch session reviews for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.sessionReviewsService.findByUser(+userId);
  }

  @Get("session/:sessionId")
  @ApiParam({
    name: "sessionId",
    description: "ID of the session",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of session reviews for the session",
    type: [SessionReview],
  })
  @ApiNotFoundResponse({ description: "Session not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch session reviews for the session",
  })
  findBySession(@Param("sessionId") sessionId: string) {
    return this.sessionReviewsService.findBySession(+sessionId);
  }
}
