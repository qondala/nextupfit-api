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
import { ContentService } from "./content.service";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
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
import { Content } from "../../entities/content.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("Content")
@ApiBearerAuth()
@Controller("content")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateContentDto })
  @ApiCreatedResponse({
    description: "Content created successfully",
    type: Content,
  })
  @ApiInternalServerErrorResponse({ description: "Failed to create content" })
  create(@Body() createContentDto: CreateContentDto, @Req() request: Request) {
    return this.contentService.create(createContentDto, request.user.id);
  }

  @Get()
  @ApiOkResponse({ description: "List of all content", type: [Content] })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch content" })
  findAll() {
    return this.contentService.findAll();
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "ID of the content", type: "number" })
  @ApiOkResponse({ description: "Content found successfully", type: Content })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch content" })
  findOne(@Param("id") id: string) {
    return this.contentService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the content", type: "number" })
  @ApiBody({ type: UpdateContentDto })
  @ApiOkResponse({ description: "Content updated successfully", type: Content })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to update content" })
  update(
    @Param("id") id: string,
    @Body() updateContentDto: UpdateContentDto,
    @Req() request: Request,
  ) {
    return this.contentService.update(+id, updateContentDto, request.user.id);
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the content", type: "number" })
  @ApiOkResponse({ description: "Content deleted successfully" })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to delete content" })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.contentService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of content matching the search query",
    type: [Content],
  })
  @ApiInternalServerErrorResponse({ description: "Failed to search content" })
  searchContent(@Query("query") query: string) {
    return this.contentService.searchContent(query);
  }

  @Get("category/:categoryId")
  @ApiParam({
    name: "categoryId",
    description: "ID of the category",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of content for the category",
    type: [Content],
  })
  @ApiNotFoundResponse({ description: "Category not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content for the category",
  })
  findByCategory(@Param("categoryId") categoryId: string) {
    return this.contentService.findByCategory(+categoryId);
  }
}
