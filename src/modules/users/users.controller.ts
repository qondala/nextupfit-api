import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  Query,
} from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
} from "@nestjs/swagger";
import { Roles, RolesGuard } from "../../shared/guards/roles.guards";
import { UsersService } from "./users.service";
import { User } from "../../entities/user.entity";
import { UserRole } from "../../shared/constants/roles";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: "User created successfully", type: User })
  @ApiInternalServerErrorResponse({ description: "Failed to create user" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ description: "List of all users", type: [User] })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch users" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "ID of the user", type: "number" })
  @ApiOkResponse({ description: "User found successfully", type: User })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch user" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER, UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the user", type: "number" })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: "User updated successfully", type: User })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to update user" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN)
  @ApiParam({ name: "id", description: "ID of the user", type: "number" })
  @ApiOkResponse({ description: "User deleted successfully" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to delete user" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Get("me")
  @Roles(UserRole.USER, UserRole.COACH)
  @ApiParam({ name: "id", description: "ID of the user", type: "number" })
  @ApiOkResponse({ description: "Current user details", type: User })
  getMe(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of users matching the search query",
    type: [User],
  })
  @ApiInternalServerErrorResponse({ description: "Failed to search users" })
  searchUsers(@Query("query") query: string) {
    return this.usersService.searchUsers(query);
  }

  @Post("coach")
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: "Coach created successfully", type: User })
  @ApiInternalServerErrorResponse({ description: "Failed to create coach" })
  createCoach(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createCoach(createUserDto);
  }
}
