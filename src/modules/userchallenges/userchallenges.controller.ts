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
import { UserChallenge } from "../../entities/user-challenge.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreateUserChallengeDto } from "./dto/create-userchallenge.dto";
import { UpdateUserChallengeDto } from "./dto/update-userchallenge.dto";
import { UserChallengesService } from "./userchallenges.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("UserChallenges")
@ApiBearerAuth()
@Controller("user-challenges")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserChallengesController {
  constructor(private readonly userChallengesService: UserChallengesService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateUserChallengeDto })
  @ApiCreatedResponse({
    description: "User program created successfully",
    type: UserChallenge,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create user program",
  })
  create(
    @Body() createUserChallengeDto: CreateUserChallengeDto,
    @Req() request: Request,
  ) {
    return this.userChallengesService.create(
      createUserChallengeDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all user programs",
    type: [UserChallenge],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user programs",
  })
  findAll() {
    return this.userChallengesService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the user program",
    type: "number",
  })
  @ApiOkResponse({
    description: "User program found successfully",
    type: UserChallenge,
  })
  @ApiNotFoundResponse({ description: "User program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user program",
  })
  findOne(@Param("id") id: string) {
    return this.userChallengesService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the user program",
    type: "number",
  })
  @ApiBody({ type: UpdateUserChallengeDto })
  @ApiOkResponse({
    description: "User program updated successfully",
    type: UserChallenge,
  })
  @ApiNotFoundResponse({ description: "User program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update user program",
  })
  update(
    @Param("id") id: string,
    @Body() updateUserChallengeDto: UpdateUserChallengeDto,
    @Req() request: Request,
  ) {
    return this.userChallengesService.update(
      +id,
      updateUserChallengeDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the user program",
    type: "number",
  })
  @ApiOkResponse({ description: "User program deleted successfully" })
  @ApiNotFoundResponse({ description: "User program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete user program",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.userChallengesService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of user programs matching the search query",
    type: [UserChallenge],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search user programs",
  })
  searchUserChallenges(@Query("query") query: string) {
    return this.userChallengesService.searchUserChallenges(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of user programs for the user",
    type: [UserChallenge],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user programs for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.userChallengesService.findByUser(+userId);
  }

  @Get("content/:contentId")
  @ApiParam({
    name: "contentId",
    description: "ID of the content",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of user programs for the content",
    type: [UserChallenge],
  })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user programs for the content",
  })
  findByChallenge(@Param("contentId") contentId: string) {
    return this.userChallengesService.findByChallenge(+contentId);
  }
}
