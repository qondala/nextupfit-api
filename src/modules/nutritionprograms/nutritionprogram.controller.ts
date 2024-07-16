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
import { NutritionProgram } from "../../entities/nutrition-program.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreateNutritionProgramDto } from "./dto/create-userprogram.dto";
import { UpdateNutritionProgramDto } from "./dto/update-userprogram.dto";
import { NutritionProgramsService } from "./nutritionprogram.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("NutritionPrograms")
@ApiBearerAuth()
@Controller("nutrition-programs")
@UseGuards(JwtAuthGuard, RolesGuard)
export class NutritionProgramsController {
  constructor(
    private readonly nutritionProgramsService: NutritionProgramsService,
  ) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateNutritionProgramDto })
  @ApiCreatedResponse({
    description: "Nutrition program created successfully",
    type: NutritionProgram,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create nutrition program",
  })
  create(
    @Body() createNutritionProgramDto: CreateNutritionProgramDto,
    @Req() request: Request,
  ) {
    return this.nutritionProgramsService.create(
      createNutritionProgramDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all nutrition programs",
    type: [NutritionProgram],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch nutrition programs",
  })
  findAll() {
    return this.nutritionProgramsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the nutrition program",
    type: "number",
  })
  @ApiOkResponse({
    description: "Nutrition program found successfully",
    type: NutritionProgram,
  })
  @ApiNotFoundResponse({ description: "Nutrition program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch nutrition program",
  })
  findOne(@Param("id") id: string) {
    return this.nutritionProgramsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the nutrition program",
    type: "number",
  })
  @ApiBody({ type: UpdateNutritionProgramDto })
  @ApiOkResponse({
    description: "Nutrition program updated successfully",
    type: NutritionProgram,
  })
  @ApiNotFoundResponse({ description: "Nutrition program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update nutrition program",
  })
  update(
    @Param("id") id: string,
    @Body() updateNutritionProgramDto: UpdateNutritionProgramDto,
    @Req() request: Request,
  ) {
    return this.nutritionProgramsService.update(
      +id,
      updateNutritionProgramDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the nutrition program",
    type: "number",
  })
  @ApiOkResponse({ description: "Nutrition program deleted successfully" })
  @ApiNotFoundResponse({ description: "Nutrition program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete nutrition program",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.nutritionProgramsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of nutrition programs matching the search query",
    type: [NutritionProgram],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search nutrition programs",
  })
  searchNutritionPrograms(@Query("query") query: string) {
    return this.nutritionProgramsService.searchNutritionPrograms(query);
  }
}
