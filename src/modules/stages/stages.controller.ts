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
import { StagesService } from "./stages.service";
import { CreateStageDto } from "./dto/create-stage.dto";
import { UpdateStageDto } from "./dto/update-stage.dto";
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
import { Roles, RolesGuard } from "../../shared/guards/roles.guards";
import { Stage } from "../../entities/stage.entity";
import { UserRole } from "../../shared/constants/roles";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("Stages")
@ApiBearerAuth()
@Controller("stages")
@UseGuards(JwtAuthGuard, RolesGuard)
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateStageDto })
  @ApiCreatedResponse({
    description: "Stage created successfully",
    type: Stage,
  })
  @ApiInternalServerErrorResponse({ description: "Failed to create stage" })
  create(@Body() createStageDto: CreateStageDto, @Req() request: Request) {
    return this.stagesService.create(createStageDto, request.user.id);
  }

  @Get()
  @ApiOkResponse({ description: "List of all stages", type: [Stage] })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch stages" })
  findAll() {
    return this.stagesService.findAll();
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "ID of the stage", type: "number" })
  @ApiOkResponse({ description: "Stage found successfully", type: Stage })
  @ApiNotFoundResponse({ description: "Stage not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch stage" })
  findOne(@Param("id") id: string) {
    return this.stagesService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the stage", type: "number" })
  @ApiBody({ type: UpdateStageDto })
  @ApiOkResponse({ description: "Stage updated successfully", type: Stage })
  @ApiNotFoundResponse({ description: "Stage not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to update stage" })
  update(
    @Param("id") id: string,
    @Body() updateStageDto: UpdateStageDto,
    @Req() request: Request,
  ) {
    return this.stagesService.update(+id, updateStageDto, request.user.id);
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the stage", type: "number" })
  @ApiOkResponse({ description: "Stage deleted successfully" })
  @ApiNotFoundResponse({ description: "Stage not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to delete stage" })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.stagesService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of stages matching the search query",
    type: [Stage],
  })
  @ApiInternalServerErrorResponse({ description: "Failed to search stages" })
  searchStages(@Query("query") query: string) {
    return this.stagesService.searchStages(query);
  }

  @Get("content/:contentId")
  @ApiParam({
    name: "contentId",
    description: "ID of the content",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of stages for the content",
    type: [Stage],
  })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch stages for the content",
  })
  findByContent(@Param("contentId") contentId: string) {
    return this.stagesService.findByContent(+contentId);
  }
}
