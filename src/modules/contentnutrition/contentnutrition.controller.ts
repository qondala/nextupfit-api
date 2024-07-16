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
import { ContentNutrition } from "../../entities/content-nutrition.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreateContentNutritionDto } from "./dto/create-contentnutrition.dto";
import { ContentNutritionService } from "./contentnutrition.service";
import { UpdateContentNutritionDto } from "./dto/update-contentnutrition.dto";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("ContentNutrition")
@ApiBearerAuth()
@Controller("content-nutrition")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentNutritionController {
  constructor(
    private readonly contentNutritionService: ContentNutritionService,
  ) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateContentNutritionDto })
  @ApiCreatedResponse({
    description: "Content nutrition created successfully",
    type: ContentNutrition,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create content nutrition",
  })
  create(
    @Body() createContentNutritionDto: CreateContentNutritionDto,
    @Req() request: Request,
  ) {
    return this.contentNutritionService.create(
      createContentNutritionDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all content nutrition",
    type: [ContentNutrition],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content nutrition",
  })
  findAll() {
    return this.contentNutritionService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the content nutrition",
    type: "number",
  })
  @ApiOkResponse({
    description: "Content nutrition found successfully",
    type: ContentNutrition,
  })
  @ApiNotFoundResponse({ description: "Content nutrition not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content nutrition",
  })
  findOne(@Param("id") id: string) {
    return this.contentNutritionService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the content nutrition",
    type: "number",
  })
  @ApiBody({ type: UpdateContentNutritionDto })
  @ApiOkResponse({
    description: "Content nutrition updated successfully",
    type: ContentNutrition,
  })
  @ApiNotFoundResponse({ description: "Content nutrition not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update content nutrition",
  })
  update(
    @Param("id") id: string,
    @Body() updateContentNutritionDto: UpdateContentNutritionDto,
    @Req() request: Request,
  ) {
    return this.contentNutritionService.update(
      +id,
      updateContentNutritionDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the content nutrition",
    type: "number",
  })
  @ApiOkResponse({ description: "Content nutrition deleted successfully" })
  @ApiNotFoundResponse({ description: "Content nutrition not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete content nutrition",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.contentNutritionService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of content nutrition matching the search query",
    type: [ContentNutrition],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search content nutrition",
  })
  searchContentNutrition(@Query("query") query: string) {
    return this.contentNutritionService.searchContentNutrition(query);
  }

  @Get("content/:contentId")
  @ApiParam({
    name: "contentId",
    description: "ID of the content",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of content nutrition for the content",
    type: [ContentNutrition],
  })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content nutrition for the content",
  })
  findByContent(@Param("contentId") contentId: string) {
    return this.contentNutritionService.findByContent(+contentId);
  }

  @Get("program/:programId")
  @ApiParam({
    name: "programId",
    description: "ID of the nutrition program",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of content nutrition for the program",
    type: [ContentNutrition],
  })
  @ApiNotFoundResponse({ description: "Nutrition program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch content nutrition for the program",
  })
  findByProgram(@Param("programId") programId: string) {
    return this.contentNutritionService.findByProgram(+programId);
  }
}
