import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from "@nestjs/common";

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
import { CoachesService } from "./coaches.service";
import { Coach } from "../../entities/coach.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreateCoachDto } from "./dto/create-coach.dto";
import { UpdateCoachDto } from "./dto/update-coach.dto";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("Coaches")
@ApiBearerAuth()
@Controller("coaches")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoachesController {
  constructor(private readonly coachesService: CoachesService) {}

  @Post()
  @ApiBody({ type: CreateCoachDto })
  @ApiCreatedResponse({
    description: "Coach created successfully",
    type: Coach,
  })
  @ApiInternalServerErrorResponse({ description: "Failed to create coach" })
  create(@Body() createCoachDto: CreateCoachDto) {
    return this.coachesService.create(createCoachDto);
  }

  @Get()
  @ApiOkResponse({ description: "List of all coaches", type: [Coach] })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch coaches" })
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
  findAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("pageSize", new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<PaginationResult<Coach>> {
    return this.coachesService.findAll(page, pageSize);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of coaches matching the search query",
    type: [Coach],
  })
  @ApiInternalServerErrorResponse({ description: "Failed to search coaches" })
  searchCoaches(@Query("query") query: string) {
    return this.coachesService.searchCoaches(query);
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "ID of the coach", type: "number" })
  @ApiOkResponse({ description: "Coach found successfully", type: Coach })
  @ApiNotFoundResponse({ description: "Coach not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch coach" })
  findOne(@Param("id") id: string) {
    return this.coachesService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the coach", type: "number" })
  @ApiBody({ type: UpdateCoachDto })
  @ApiOkResponse({ description: "Coach updated successfully", type: Coach })
  @ApiNotFoundResponse({ description: "Coach not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to update coach" })
  update(@Param("id") id: string, @Body() updateCoachDto: UpdateCoachDto) {
    return this.coachesService.update(+id, updateCoachDto);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN)
  @ApiParam({ name: "id", description: "ID of the coach", type: "number" })
  @ApiOkResponse({ description: "Coach deleted successfully" })
  @ApiNotFoundResponse({ description: "Coach not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to delete coach" })
  remove(@Param("id") id: string) {
    return this.coachesService.remove(+id);
  }
}
