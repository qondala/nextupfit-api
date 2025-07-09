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

import { UserCommitmentCompletedItemService } from "../service";
import {
  CreateUserCommitmentCompletedItemDto,
  UpdateUserCommitmentCompletedItemDto,
  DetailsUserCommitmentCompletedItemDto,
  PaginatedDetailsUserCommitmentCompletedItemDto,
} from "../dto";

@ApiTags("User module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("user/commitment-completed-item")
export class UserCommitmentCompletedItemController {
  constructor(private readonly service: UserCommitmentCompletedItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create a user commitment completed item",
    operationId: "createUserCommitmentCompletedItem"
  })
  @ApiBody({ required: true, type: CreateUserCommitmentCompletedItemDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Created successfully",
    type: DetailsUserCommitmentCompletedItemDto
  })
  create(@Body() dto: CreateUserCommitmentCompletedItemDto): Promise<DetailsUserCommitmentCompletedItemDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all user commitment completed items",
    operationId: "findAllUserCommitmentCompletedItems"
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Retrieved successfully",
    type: PaginatedDetailsUserCommitmentCompletedItemDto
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsUserCommitmentCompletedItemDto> {
    return this.service.findAll(options);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a user commitment completed item",
    operationId: "findUserCommitmentCompletedItem"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Retrieved successfully",
    type: DetailsUserCommitmentCompletedItemDto
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserCommitmentCompletedItemDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a user commitment completed item",
    operationId: "updateUserCommitmentCompletedItem"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    example: 1
  })
  @ApiBody({
    type: UpdateUserCommitmentCompletedItemDto,
    required: true,
    description: "User commitment completed item update payload"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated successfully",
    type: DetailsUserCommitmentCompletedItemDto
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserCommitmentCompletedItemDto
  ): Promise<DetailsUserCommitmentCompletedItemDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a user commitment completed item",
    operationId: "deleteUserCommitmentCompletedItem"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Deleted successfully"
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
