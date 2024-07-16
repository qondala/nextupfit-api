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
import { ContentReviewsService } from "./contentreviews.service";
import { CreateContentReviewDto } from "./dto/create-contentreview.dto";
import { UpdateContentReviewDto } from "./dto/update-contentreview.dto";

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
import { ContentReview } from "../../entities/content-review.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { Request } from "express";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("ContentReviews")
@ApiBearerAuth()
@Controller("content-reviews")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentReviewsController {
  constructor(private readonly contentReviewsService: ContentReviewsService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateContentReviewDto })
  @ApiCreatedResponse({
    description: "Content review created successfully",
    type: ContentReview,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create content review",
  })
  create(
    @Body() createContentReviewDto: CreateContentReviewDto,
    @Req() request: Request,
  ) {
    return this.contentReviewsService.create(
      createContentReviewDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all content reviews",
    type: [ContentReview],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content reviews",
  })
  findAll() {
    return this.contentReviewsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the content review",
    type: "number",
  })
  @ApiOkResponse({
    description: "Content review found successfully",
    type: ContentReview,
  })
  @ApiNotFoundResponse({ description: "Content review not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content review",
  })
  findOne(@Param("id") id: string) {
    return this.contentReviewsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the content review",
    type: "number",
  })
  @ApiBody({ type: UpdateContentReviewDto })
  @ApiOkResponse({
    description: "Content review updated successfully",
    type: ContentReview,
  })
  @ApiNotFoundResponse({ description: "Content review not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update content review",
  })
  update(
    @Param("id") id: string,
    @Body() updateContentReviewDto: UpdateContentReviewDto,
    @Req() request: Request,
  ) {
    return this.contentReviewsService.update(
      +id,
      updateContentReviewDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the content review",
    type: "number",
  })
  @ApiOkResponse({ description: "Content review deleted successfully" })
  @ApiNotFoundResponse({ description: "Content review not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete content review",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.contentReviewsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of content reviews matching the search query",
    type: [ContentReview],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search content reviews",
  })
  searchContentReviews(@Query("query") query: string) {
    return this.contentReviewsService.searchContentReviews(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of content reviews for the user",
    type: [ContentReview],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content reviews for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.contentReviewsService.findByUser(+userId);
  }

  @Get("content/:contentId")
  @ApiParam({
    name: "contentId",
    description: "ID of the content",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of content reviews for the content",
    type: [ContentReview],
  })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content reviews for the content",
  })
  findByContent(@Param("contentId") contentId: string) {
    return this.contentReviewsService.findByContent(+contentId);
  }
}
