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
  Session,
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
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
import { SessionsService } from "./sessions.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("Sessions")
@ApiBearerAuth()
@Controller("sessions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateSessionDto })
  @ApiCreatedResponse({
    description: "Session created successfully",
    type: Session,
  })
  @ApiInternalServerErrorResponse({ description: "Failed to create session" })
  create(@Body() createSessionDto: CreateSessionDto, @Req() request: Request) {
    return this.sessionsService.create(createSessionDto, request.user.id);
  }

  @Get()
  @ApiOkResponse({ description: "List of all sessions", type: [Session] })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch sessions" })
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "ID of the session", type: "number" })
  @ApiOkResponse({ description: "Session found successfully", type: Session })
  @ApiNotFoundResponse({ description: "Session not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch session" })
  findOne(@Param("id") id: string) {
    return this.sessionsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the session", type: "number" })
  @ApiBody({ type: UpdateSessionDto })
  @ApiOkResponse({ description: "Session updated successfully", type: Session })
  @ApiNotFoundResponse({ description: "Session not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to update session" })
  update(
    @Param("id") id: string,
    @Body() updateSessionDto: UpdateSessionDto,
    @Req() request: Request,
  ) {
    return this.sessionsService.update(+id, updateSessionDto, request.user.id);
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the session", type: "number" })
  @ApiOkResponse({ description: "Session deleted successfully" })
  @ApiNotFoundResponse({ description: "Session not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to delete session" })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.sessionsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of sessions matching the search query",
    type: [Session],
  })
  @ApiInternalServerErrorResponse({ description: "Failed to search sessions" })
  searchSessions(@Query("query") query: string) {
    return this.sessionsService.searchSessions(query);
  }

  @Get("content/:contentId")
  @ApiParam({
    name: "contentId",
    description: "ID of the content",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of sessions for the content",
    type: [Session],
  })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch sessions for the content",
  })
  findByContent(@Param("contentId") contentId: string) {
    return this.sessionsService.findByContent(+contentId);
  }
}
