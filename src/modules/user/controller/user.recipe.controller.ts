import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";

import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import {
  CreateUserRecipeDto,
  UpdateUserRecipeDto,
  DetailsUserRecipeDto,
  PaginatedDetailsUserRecipeDto
} from "../dto";
import { UserRecipeService } from "../service";

@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/recipe")
export class UserRecipeController {
  constructor(private readonly userRecipeService: UserRecipeService) {}

  @Post()
  @ApiOperation({
    summary: "Create user recipe",
    operationId: "createUserRecipe"
  })
  @ApiBody({
    required: true,
    type: CreateUserRecipeDto
  })
  @ApiCreatedResponse({
    description: "User recipe created successfully.",
    type: DetailsUserRecipeDto,
    status: HttpStatus.CREATED
  })
  async create(@Body() dto: CreateUserRecipeDto): Promise<DetailsUserRecipeDto> {
    return await this.userRecipeService.create(dto);
  }

  @Get("user/:userId")
  @ApiOperation({
    summary: "Get all user recipes",
    operationId: "findAllUserRecipes"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 123
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiOkResponse({
    description: "List of user recipes.",
    type: PaginatedDetailsUserRecipeDto
  })
  async findAll(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto): Promise<PaginatedDetailsUserRecipeDto> {
    return await this.userRecipeService.findAll(userId, pagination);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get user recipe by id",
    operationId: "findUserRecipeById"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiOkResponse({
    description: "User recipe by id.",
    type: DetailsUserRecipeDto
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserRecipeDto> {
    return await this.userRecipeService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update user recipe",
    operationId: "updateUserRecipe"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiBody({
    required: true,
    type: UpdateUserRecipeDto
  })
  @ApiOkResponse({
    description: "Updated user recipe.",
    type: DetailsUserRecipeDto
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserRecipeDto
  ): Promise<DetailsUserRecipeDto> {
    return await this.userRecipeService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete user recipe",
    operationId: "removeUserRecipe"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiOkResponse({
    status: HttpStatus.NO_CONTENT,
    description: "User recipe deleted successfully."
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.userRecipeService.remove(id);
  }
}
