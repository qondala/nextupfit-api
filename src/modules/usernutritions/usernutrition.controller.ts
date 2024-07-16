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
import { CreateUserNutritionDto } from "./dto/create-usernutrition.dto";
import { UpdateUserNutritionDto } from "./dto/update-usernutrition.dto";
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
import { UserNutrition } from "../../entities/user-nutrition.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { UserNutritionService } from "./usernutrition.service";
import { Request } from "express";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("UserNutrition")
@ApiBearerAuth()
@Controller("user-nutrition")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserNutritionController {
  constructor(private readonly userNutritionService: UserNutritionService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateUserNutritionDto })
  @ApiCreatedResponse({
    description: "User nutrition created successfully",
    type: UserNutrition,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create user nutrition",
  })
  create(
    @Body() createUserNutritionDto: CreateUserNutritionDto,
    @Req() request: Request,
  ) {
    return this.userNutritionService.create(
      createUserNutritionDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all user nutrition",
    type: [UserNutrition],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user nutrition",
  })
  findAll() {
    return this.userNutritionService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the user nutrition",
    type: "number",
  })
  @ApiOkResponse({
    description: "User nutrition found successfully",
    type: UserNutrition,
  })
  @ApiNotFoundResponse({ description: "User nutrition not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user nutrition",
  })
  findOne(@Param("id") id: string) {
    return this.userNutritionService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the user nutrition",
    type: "number",
  })
  @ApiBody({ type: UpdateUserNutritionDto })
  @ApiOkResponse({
    description: "User nutrition updated successfully",
    type: UserNutrition,
  })
  @ApiNotFoundResponse({ description: "User nutrition not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update user nutrition",
  })
  update(
    @Param("id") id: string,
    @Body() updateUserNutritionDto: UpdateUserNutritionDto,
    @Req() request: Request,
  ) {
    return this.userNutritionService.update(
      +id,
      updateUserNutritionDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the user nutrition",
    type: "number",
  })
  @ApiOkResponse({ description: "User nutrition deleted successfully" })
  @ApiNotFoundResponse({ description: "User nutrition not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete user nutrition",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.userNutritionService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of user nutrition matching the search query",
    type: [UserNutrition],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search user nutrition",
  })
  searchUserNutrition(@Query("query") query: string) {
    return this.userNutritionService.searchUserNutrition(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of user nutrition for the user",
    type: [UserNutrition],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user nutrition for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.userNutritionService.findByUser(+userId);
  }

  @Get("program/:programId")
  @ApiParam({
    name: "programId",
    description: "ID of the nutrition program",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of user nutrition for the program",
    type: [UserNutrition],
  })
  @ApiNotFoundResponse({ description: "Nutrition program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user nutrition for the program",
  })
  findByProgram(@Param("programId") programId: string) {
    return this.userNutritionService.findByProgram(+programId);
  }
}
