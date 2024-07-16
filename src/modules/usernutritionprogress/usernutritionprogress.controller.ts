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
import { UserNutritionProgressService } from "./usernutritionprogress.service";
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
import { UserNutritionProgress } from "../../entities/user-nutrition-progress.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreateUserNutritionProgressDto } from "./dto/create-usernutritionprogram.dto";
import { UpdateUserNutritionProgressDto } from "./dto/update-usernutritionprogram";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("UserNutritionProgress")
@ApiBearerAuth()
@Controller("user-nutrition-progress")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserNutritionProgressController {
  constructor(
    private readonly userNutritionProgressService: UserNutritionProgressService,
  ) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateUserNutritionProgressDto })
  @ApiCreatedResponse({
    description: "User nutrition progress created successfully",
    type: UserNutritionProgress,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create user nutrition progress",
  })
  create(
    @Body() createUserNutritionProgressDto: CreateUserNutritionProgressDto,
    @Req() request: Request,
  ) {
    return this.userNutritionProgressService.create(
      createUserNutritionProgressDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all user nutrition progress",
    type: [UserNutritionProgress],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user nutrition progress",
  })
  findAll() {
    return this.userNutritionProgressService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the user nutrition progress",
    type: "number",
  })
  @ApiOkResponse({
    description: "User nutrition progress found successfully",
    type: UserNutritionProgress,
  })
  @ApiNotFoundResponse({ description: "User nutrition progress not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user nutrition progress",
  })
  findOne(@Param("id") id: string) {
    return this.userNutritionProgressService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the user nutrition progress",
    type: "number",
  })
  @ApiBody({ type: UpdateUserNutritionProgressDto })
  @ApiOkResponse({
    description: "User nutrition progress updated successfully",
    type: UserNutritionProgress,
  })
  @ApiNotFoundResponse({ description: "User nutrition progress not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update user nutrition progress",
  })
  update(
    @Param("id") id: string,
    @Body() updateUserNutritionProgressDto: UpdateUserNutritionProgressDto,
    @Req() request: Request,
  ) {
    return this.userNutritionProgressService.update(
      +id,
      updateUserNutritionProgressDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the user nutrition progress",
    type: "number",
  })
  @ApiOkResponse({
    description: "User nutrition progress deleted successfully",
  })
  @ApiNotFoundResponse({ description: "User nutrition progress not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete user nutrition progress",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.userNutritionProgressService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of user nutrition progress matching the search query",
    type: [UserNutritionProgress],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search user nutrition progress",
  })
  searchUserNutritionProgress(@Query("query") query: string) {
    return this.userNutritionProgressService.searchUserNutritionProgress(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of user nutrition progress for the user",
    type: [UserNutritionProgress],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user nutrition progress for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.userNutritionProgressService.findByUser(+userId);
  }

  @Get("program/:programId")
  @ApiParam({
    name: "programId",
    description: "ID of the nutrition program",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of user nutrition progress for the program",
    type: [UserNutritionProgress],
  })
  @ApiNotFoundResponse({ description: "Nutrition program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user nutrition progress for the program",
  })
  findByProgram(@Param("programId") programId: string) {
    return this.userNutritionProgressService.findByProgram(+programId);
  }
}
