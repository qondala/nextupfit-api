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
import { NewsService } from "./news.service";
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
import { News } from "../../entities/news.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreateNewsDto } from "./dto/creat-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("News")
@ApiBearerAuth()
@Controller("news")
@UseGuards(JwtAuthGuard, RolesGuard)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateNewsDto })
  @ApiCreatedResponse({ description: "News created successfully", type: News })
  @ApiInternalServerErrorResponse({ description: "Failed to create news" })
  create(@Body() createNewsDto: CreateNewsDto, @Req() request: Request) {
    return this.newsService.create(createNewsDto, request.user.id);
  }

  @Get()
  @ApiOkResponse({ description: "List of all news", type: [News] })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch news" })
  findAll() {
    return this.newsService.findAll();
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "ID of the news", type: "number" })
  @ApiOkResponse({ description: "News found successfully", type: News })
  @ApiNotFoundResponse({ description: "News not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch news" })
  findOne(@Param("id") id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the news", type: "number" })
  @ApiBody({ type: UpdateNewsDto })
  @ApiOkResponse({ description: "News updated successfully", type: News })
  @ApiNotFoundResponse({ description: "News not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to update news" })
  update(
    @Param("id") id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @Req() request: Request,
  ) {
    return this.newsService.update(+id, updateNewsDto, request.user.id);
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the news", type: "number" })
  @ApiOkResponse({ description: "News deleted successfully" })
  @ApiNotFoundResponse({ description: "News not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to delete news" })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.newsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of news matching the search query",
    type: [News],
  })
  @ApiInternalServerErrorResponse({ description: "Failed to search news" })
  searchNews(@Query("query") query: string) {
    return this.newsService.searchNews(query);
  }

  @Get("coach/:coachId")
  @ApiParam({ name: "coachId", description: "ID of the coach", type: "number" })
  @ApiOkResponse({ description: "List of news for the coach", type: [News] })
  @ApiNotFoundResponse({ description: "Coach not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch news for the coach",
  })
  findByCoach(@Param("coachId") coachId: string) {
    return this.newsService.findByCoach(+coachId);
  }
}
