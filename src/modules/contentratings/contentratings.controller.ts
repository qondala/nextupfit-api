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
import { ContentRatingsService } from "./contentratings.service";
import { CreateContentRatingDto } from "./dto/create-contentrating.dto";
import { UpdateContentRatingDto } from "./dto/update-contentrating.dto";
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
import { ContentRating } from "../../entities/content-rating.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("ContentRatings")
@ApiBearerAuth()
@Controller("content-ratings")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentRatingsController {
  constructor(private readonly contentRatingsService: ContentRatingsService) {}

  @Post()
  @Roles(UserRole.USER, UserRole.COACH, UserRole.ADMIN)
  @ApiBody({ type: CreateContentRatingDto })
  @ApiCreatedResponse({
    description: "Content rating created successfully",
    type: ContentRating,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create content rating",
  })
  create(
    @Body() createContentRatingDto: CreateContentRatingDto,
    @Req() request: Request,
  ) {
    return this.contentRatingsService.create(
      createContentRatingDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all content ratings",
    type: [ContentRating],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content ratings",
  })
  findAll() {
    return this.contentRatingsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the content rating",
    type: "number",
  })
  @ApiOkResponse({
    description: "Content rating found successfully",
    type: ContentRating,
  })
  @ApiNotFoundResponse({ description: "Content rating not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content rating",
  })
  findOne(@Param("id") id: string) {
    return this.contentRatingsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER, UserRole.COACH, UserRole.ADMIN)
  @ApiParam({
    name: "id",
    description: "ID of the content rating",
    type: "number",
  })
  @ApiBody({ type: UpdateContentRatingDto })
  @ApiOkResponse({
    description: "Content rating updated successfully",
    type: ContentRating,
  })
  @ApiNotFoundResponse({ description: "Content rating not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update content rating",
  })
  update(
    @Param("id") id: string,
    @Body() updateContentRatingDto: UpdateContentRatingDto,
    @Req() request: Request,
  ) {
    return this.contentRatingsService.update(
      +id,
      updateContentRatingDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER, UserRole.COACH, UserRole.ADMIN)
  @ApiParam({
    name: "id",
    description: "ID of the content rating",
    type: "number",
  })
  @ApiOkResponse({ description: "Content rating deleted successfully" })
  @ApiNotFoundResponse({ description: "Content rating not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete content rating",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.contentRatingsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of content ratings matching the search query",
    type: [ContentRating],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search content ratings",
  })
  searchContentRatings(@Query("query") query: string) {
    return this.contentRatingsService.searchContentRatings(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of content ratings for the user",
    type: [ContentRating],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content ratings for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.contentRatingsService.findByUser(+userId);
  }

  @Get("content/:contentId")
  @ApiParam({
    name: "contentId",
    description: "ID of the content",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of content ratings for the content",
    type: [ContentRating],
  })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content ratings for the content",
  })
  findByContent(@Param("contentId") contentId: string) {
    return this.contentRatingsService.findByContent(+contentId);
  }
}
