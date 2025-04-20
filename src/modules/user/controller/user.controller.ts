import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiCreatedResponse,
  ApiOkResponse
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { UserService } from "../service";
import {
  DetailsUserDto,
  CreateUserDto,
  UpdateUserDto,
  PaginatedDetailsUserDto
} from "../dto";



@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    operationId: "createUser",
    summary: "Create a new user"
  })
  @ApiCreatedResponse({
    description: "The user has been successfully created.",
    type: DetailsUserDto,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<DetailsUserDto> {
    return this.userService.create(createUserDto);
  }


  @Get()
  @ApiOperation({
    operationId: "getAllUsers",
    summary: "Get all users with pagination"
  })
  @ApiOkResponse({
    description: "Return all users with pagination.",
    type: PaginatedDetailsUserDto,
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsUserDto> {
    return this.userService.findAll(options);
  }


  @Get("search")
  @ApiOperation({
    operationId: "searchUsers",
    summary: "Search users by email, first name, or last name"
  })
  @ApiOkResponse({
    description: "Return users matching the search query.",
    type: PaginatedDetailsUserDto,
  })
  search(
    @Query("query") query: string,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsUserDto> {
    return this.userService.search(query, options);
  }


  @Get(":id")
  @ApiOperation({
    operationId: "getUserById",
    summary: "Get a user by id"
  })
  @ApiOkResponse({
    description: "Return the user.",
    type: DetailsUserDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserDto> {
    return this.userService.findOne(id);
  }


  @Patch(":id")
  @ApiOperation({
    operationId: "updateUser",
    summary: "Update a user"
  })
  @ApiOkResponse({
    description: "The user has been successfully updated.",
    type: DetailsUserDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<DetailsUserDto> {
    return this.userService.update(id, updateUserDto);
  }


  @Delete(":id")
  @ApiOperation({ 
    operationId: "deleteUser",
    summary: "Delete a user"
  })
  @ApiNoContentResponse({
    description: "The user has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
