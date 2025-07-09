import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { PaginationOptionsDto } from "@app/common/dto";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";

import { UserCommitmentService } from "../service";
import {
  CreateUserCommitmentDto,
  UpdateUserCommitmentDto,
  DetailsUserCommitmentDto,
  PaginatedDetailsUserCommitmentDto,
} from "../dto";

@ApiTags("User module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("user/commitment")
export class UserCommitmentController {
  constructor(private readonly userCommitmentService: UserCommitmentService) {}

  @Post()
  @ApiOperation({
    summary: "Create a user commitment",
    operationId: "createUserCommitment",
  })
  @ApiBody({
    required: true,
    type: CreateUserCommitmentDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User commitment created successfully",
    type: DetailsUserCommitmentDto,
  })
  create(@Body() dto: CreateUserCommitmentDto): Promise<DetailsUserCommitmentDto> {
    return this.userCommitmentService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all user commitments",
    operationId: "findAllUserCommitments",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of user commitments.",
    type: PaginatedDetailsUserCommitmentDto,
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsUserCommitmentDto> {
    return this.userCommitmentService.findAll(options);
  }

  @Get("user/:userId")
  @ApiOperation({
    summary: "Get user commitments by user id",
    operationId: "getUserCommitmentsByUserId"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 123
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of user commitments by user id.",
    type: PaginatedDetailsUserCommitmentDto
  })
  getUserCommitments(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsUserCommitmentDto> {
    return this.userCommitmentService.getUserCommitments(userId, options);
  }


  @Get(":id")
  @ApiOperation({
    summary: "Get user commitment by id",
    operationId: "findUserCommitmentById",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User commitment id",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User commitment by id.",
    type: DetailsUserCommitmentDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserCommitmentDto> {
    return this.userCommitmentService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update user commitment",
    operationId: "updateUserCommitment",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User commitment id",
    example: 1,
  })
  @ApiBody({
    required: true,
    type: UpdateUserCommitmentDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated user commitment.",
    type: DetailsUserCommitmentDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserCommitmentDto
  ): Promise<DetailsUserCommitmentDto> {
    return this.userCommitmentService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete user commitment",
    operationId: "removeUserCommitment",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User commitment id",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "User commitment deleted successfully.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.userCommitmentService.remove(id);
  }
}
