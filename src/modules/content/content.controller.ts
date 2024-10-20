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
  DefaultValuePipe,
  ParseIntPipe,
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

interface PaginationResult<T> {
  items: T[];
  total: number;
}

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
  @ApiQuery({
    name: "page",
    description: "Page number",
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: "pageSize",
    description: "Page size",
    required: false,
    type: Number,
    example: 10,
  })
  @ApiOkResponse({
    description: "List of all content",
  })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch content" })
  findAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("pageSize", new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<PaginationResult<Content>> {
    return this.contentService.findAll(page, pageSize);
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
  update(@Param("id") id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(+id, updateContentDto);
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

  @Patch(":id/approve")
  @Roles(UserRole.ADMIN)
  async approveContent(@Param("id") id: string) {
    return this.contentService.update(parseInt(id), { status: "approved" });
  }

  @Patch(":id/reject")
  @Roles(UserRole.ADMIN)
  async rejectContent(@Param("id") id: string) {
    return this.contentService.update(parseInt(id), { status: "rejected" });
  }

  @Get("pending")
  @ApiQuery({
    name: "page",
    description: "Page number",
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: "pageSize",
    description: "Page size",
    required: false,
    type: Number,
    example: 10,
  })
  @Roles(UserRole.ADMIN)
  async findPendingContents(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("pageSize", new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<PaginationResult<Content>> {
    return this.contentService.findPendingContents(page, pageSize);
  }
}
