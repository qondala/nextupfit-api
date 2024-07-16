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
import { PrivateDiscussionsService } from "./privatediscussions.service";
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
import { PrivateDiscussion } from "../../entities/private-discussion.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreatePrivateDiscussionDto } from "./dto/create-privatediscussion";
import { UpdatePrivateDiscussionDto } from "./dto/update-privatediscussion.dto";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("PrivateDiscussions")
@ApiBearerAuth()
@Controller("private-discussions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PrivateDiscussionsController {
  constructor(
    private readonly privateDiscussionsService: PrivateDiscussionsService,
  ) {}

  @Post()
  @Roles(UserRole.USER, UserRole.COACH)
  @ApiBody({ type: CreatePrivateDiscussionDto })
  @ApiCreatedResponse({
    description: "Private discussion created successfully",
    type: PrivateDiscussion,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create private discussion",
  })
  create(
    @Body() createPrivateDiscussionDto: CreatePrivateDiscussionDto,
    @Req() request: Request,
  ) {
    return this.privateDiscussionsService.create(
      createPrivateDiscussionDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all private discussions",
    type: [PrivateDiscussion],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch private discussions",
  })
  findAll() {
    return this.privateDiscussionsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the private discussion",
    type: "number",
  })
  @ApiOkResponse({
    description: "Private discussion found successfully",
    type: PrivateDiscussion,
  })
  @ApiNotFoundResponse({ description: "Private discussion not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch private discussion",
  })
  findOne(@Param("id") id: string) {
    return this.privateDiscussionsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER, UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the private discussion",
    type: "number",
  })
  @ApiBody({ type: UpdatePrivateDiscussionDto })
  @ApiOkResponse({
    description: "Private discussion updated successfully",
    type: PrivateDiscussion,
  })
  @ApiNotFoundResponse({ description: "Private discussion not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update private discussion",
  })
  update(
    @Param("id") id: string,
    @Body() updatePrivateDiscussionDto: UpdatePrivateDiscussionDto,
    @Req() request: Request,
  ) {
    return this.privateDiscussionsService.update(
      +id,
      updatePrivateDiscussionDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER, UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the private discussion",
    type: "number",
  })
  @ApiOkResponse({ description: "Private discussion deleted successfully" })
  @ApiNotFoundResponse({ description: "Private discussion not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete private discussion",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.privateDiscussionsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of private discussions matching the search query",
    type: [PrivateDiscussion],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search private discussions",
  })
  searchPrivateDiscussions(@Query("query") query: string) {
    return this.privateDiscussionsService.searchPrivateDiscussions(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of private discussions for the user",
    type: [PrivateDiscussion],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch private discussions for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.privateDiscussionsService.findByUser(+userId);
  }

  @Get("coach/:coachId")
  @ApiParam({ name: "coachId", description: "ID of the coach", type: "number" })
  @ApiOkResponse({
    description: "List of private discussions for the coach",
    type: [PrivateDiscussion],
  })
  @ApiNotFoundResponse({ description: "Coach not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch private discussions for the coach",
  })
  findByCoach(@Param("coachId") coachId: string) {
    return this.privateDiscussionsService.findByCoach(+coachId);
  }
}
