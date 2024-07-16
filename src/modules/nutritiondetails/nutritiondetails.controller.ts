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
import { NutritionDetailsService } from "./nutritiondetails.service";
import { CreateNutritionDetailDto } from "./dto/create-nutritiondetail.dto";
import { UpdateNutritionDetailDto } from "./dto/update-nutritiondetail.dto";
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
import { NutritionDetail } from "../../entities/nutrition-detail.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("NutritionDetails")
@ApiBearerAuth()
@Controller("nutrition-details")
@UseGuards(JwtAuthGuard, RolesGuard)
export class NutritionDetailsController {
  constructor(
    private readonly nutritionDetailsService: NutritionDetailsService,
  ) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateNutritionDetailDto })
  @ApiCreatedResponse({
    description: "Nutrition detail created successfully",
    type: NutritionDetail,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create nutrition detail",
  })
  create(
    @Body() createNutritionDetailDto: CreateNutritionDetailDto,
    @Req() request: Request,
  ) {
    return this.nutritionDetailsService.create(
      createNutritionDetailDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all nutrition details",
    type: [NutritionDetail],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch nutrition details",
  })
  findAll() {
    return this.nutritionDetailsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the nutrition detail",
    type: "number",
  })
  @ApiOkResponse({
    description: "Nutrition detail found successfully",
    type: NutritionDetail,
  })
  @ApiNotFoundResponse({ description: "Nutrition detail not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch nutrition detail",
  })
  findOne(@Param("id") id: string) {
    return this.nutritionDetailsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the nutrition detail",
    type: "number",
  })
  @ApiBody({ type: UpdateNutritionDetailDto })
  @ApiOkResponse({
    description: "Nutrition detail updated successfully",
    type: NutritionDetail,
  })
  @ApiNotFoundResponse({ description: "Nutrition detail not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update nutrition detail",
  })
  update(
    @Param("id") id: string,
    @Body() updateNutritionDetailDto: UpdateNutritionDetailDto,
    @Req() request: Request,
  ) {
    return this.nutritionDetailsService.update(
      +id,
      updateNutritionDetailDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the nutrition detail",
    type: "number",
  })
  @ApiOkResponse({ description: "Nutrition detail deleted successfully" })
  @ApiNotFoundResponse({ description: "Nutrition detail not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete nutrition detail",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.nutritionDetailsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of nutrition details matching the search query",
    type: [NutritionDetail],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search nutrition details",
  })
  searchNutritionDetails(@Query("query") query: string) {
    return this.nutritionDetailsService.searchNutritionDetails(query);
  }

  @Get("program/:programId")
  @ApiParam({
    name: "programId",
    description: "ID of the nutrition program",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of nutrition details for the program",
    type: [NutritionDetail],
  })
  @ApiNotFoundResponse({ description: "Nutrition program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch nutrition details for the program",
  })
  findByProgram(@Param("programId") programId: string) {
    return this.nutritionDetailsService.findByProgram(+programId);
  }
}
