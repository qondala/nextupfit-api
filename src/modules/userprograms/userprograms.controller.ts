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
import { UserProgram } from "../../entities/user-program.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreateUserProgramDto } from "./dto/create-userprogram.dto";
import { UpdateUserProgramDto } from "./dto/update-userprogram.dto";
import { UserProgramsService } from "./userprogram.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("UserPrograms")
@ApiBearerAuth()
@Controller("user-programs")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserProgramsController {
  constructor(private readonly userProgramsService: UserProgramsService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateUserProgramDto })
  @ApiCreatedResponse({
    description: "User program created successfully",
    type: UserProgram,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create user program",
  })
  create(
    @Body() createUserProgramDto: CreateUserProgramDto,
    @Req() request: Request,
  ) {
    return this.userProgramsService.create(
      createUserProgramDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all user programs",
    type: [UserProgram],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user programs",
  })
  findAll() {
    return this.userProgramsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the user program",
    type: "number",
  })
  @ApiOkResponse({
    description: "User program found successfully",
    type: UserProgram,
  })
  @ApiNotFoundResponse({ description: "User program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user program",
  })
  findOne(@Param("id") id: string) {
    return this.userProgramsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the user program",
    type: "number",
  })
  @ApiBody({ type: UpdateUserProgramDto })
  @ApiOkResponse({
    description: "User program updated successfully",
    type: UserProgram,
  })
  @ApiNotFoundResponse({ description: "User program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update user program",
  })
  update(
    @Param("id") id: string,
    @Body() updateUserProgramDto: UpdateUserProgramDto,
    @Req() request: Request,
  ) {
    return this.userProgramsService.update(
      +id,
      updateUserProgramDto,
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
    return this.userProgramsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of user programs matching the search query",
    type: [UserProgram],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search user programs",
  })
  searchUserPrograms(@Query("query") query: string) {
    return this.userProgramsService.searchUserPrograms(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of user programs for the user",
    type: [UserProgram],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user programs for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.userProgramsService.findByUser(+userId);
  }

  @Get("content/:contentId")
  @ApiParam({
    name: "contentId",
    description: "ID of the content",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of user programs for the content",
    type: [UserProgram],
  })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user programs for the content",
  })
  findByContent(@Param("contentId") contentId: string) {
    return this.userProgramsService.findByContent(+contentId);
  }
}
