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
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiConflictResponse,
  ApiInternalServerErrorResponse
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
import { SwaggerType } from "@app/common/types";
import {
  ErrorResponseException,
  ErrorResponseExceptionType,
  SystemStatusCode,
} from "@app/common/exceptions";



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
  @ApiBody({
    required: true,
    type: CreateUserDto
  })
  @ApiCreatedResponse({
    description: "The user has been successfully created.",
    type: DetailsUserDto,
  })
  @ApiConflictResponse({
    type: ErrorResponseException,
    description: "A user with the same email already exists.",
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponseException,
    description: "An error occurred while creating the user.",
  })
  create(@Body() createUserDto: CreateUserDto): Promise<DetailsUserDto> {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(
          new ErrorResponseException(
            ErrorResponseExceptionType.DATABASE,
            error.message,
            HttpStatus.CONFLICT,
            SystemStatusCode.CONFLICT
          )
        );
      }
      throw new InternalServerErrorException(
        new ErrorResponseException(
          ErrorResponseExceptionType.DATABASE,
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
          SystemStatusCode.GENERIC
        )
      );
    }
  }


  @Get()
  @ApiOperation({
    operationId: "getAllUsers",
    summary: "Get all users with pagination"
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
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
  @ApiQuery({
    name: "query",
    required: true,
    type: SwaggerType.STRING,
    description: "Search query",
    example: "john"
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
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
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 1
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
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 1
  })
  @ApiBody({
    required: true,
    type: UpdateUserDto
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
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 1
  })
  @ApiNoContentResponse({
    description: "The user has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
