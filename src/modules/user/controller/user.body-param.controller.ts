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
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiParam
} from "@nestjs/swagger";

import { PaginationOptionsDto } from "@app/common/dto";

import { UserBodyParamService } from "../service";
import {
  CreateUserBodyParamDto,
  UpdateUserBodyParamDto,
  DetailsUserBodyParamDto,
  PaginatedDetailsUserBodyParamDto,
} from "../dto";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";



@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/body-param")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserBodyParamController {
  constructor(private readonly userBodyParamService: UserBodyParamService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new user body param",
    operationId: "createUserBodyParam"
  })
  @ApiBody({
    required: true,
    type: CreateUserBodyParamDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The user body param has been successfully created.",
    type: DetailsUserBodyParamDto,
  })
  create(@Body() createUserBodyParamDto: CreateUserBodyParamDto): Promise<DetailsUserBodyParamDto> {
    return this.userBodyParamService.create(createUserBodyParamDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all user body params with pagination",
    operationId: "findAllUserBodyParams"
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number for pagination"
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user body params with pagination.",
    type: PaginatedDetailsUserBodyParamDto,
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsUserBodyParamDto> {
    return this.userBodyParamService.findAll(options);
  }

  @Get("user/:userId")
  @ApiOperation({
    summary: "Get all user body params for a specific user",
    operationId: "findByUserId"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user body params for the specified user.",
    type: PaginatedDetailsUserBodyParamDto,
  })
  findByUserId(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsUserBodyParamDto> {
    return this.userBodyParamService.findByUserId(userId, options);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a user body param by id",
    operationId: "findOneUserBodyParam"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User body param ID"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the user body param.",
    type: DetailsUserBodyParamDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserBodyParamDto> {
    return this.userBodyParamService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a user body param",
    operationId: "updateUserBodyParam"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User body param ID"
  })
  @ApiBody({
    required: true,
    type: UpdateUserBodyParamDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The user body param has been successfully updated.",
    type: DetailsUserBodyParamDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserBodyParamDto: UpdateUserBodyParamDto
  ): Promise<DetailsUserBodyParamDto> {
    return this.userBodyParamService.update(id, updateUserBodyParamDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a user body param",
    operationId: "removeUserBodyParam"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The user body param has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.userBodyParamService.remove(id);
  }

}
