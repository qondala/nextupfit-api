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
  ParseEnumPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiQuery,
} from "@nestjs/swagger";

import { PaginationOptionsDto } from "@app/common/dto";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";


import { UserSubscriptionPlanService } from "../service";
import {
  CreateUserSubscriptionPlanDto,
  DetailsUserSubscriptionPlanDto,
  PaginatedDetailsUserSubscriptionPlanDto,
  UpdateUserSubscriptionPlanDto,
} from "../dto";
import { BaseSubscriptionPlanItemEnum } from "@app/module/base/types";
import { SwaggerType } from "@app/common/types";



@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/subscription-plan")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserSubscriptionPlanController {
  constructor(private readonly userSubscriptionPlanService: UserSubscriptionPlanService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new user subscription plan",
    description: "Create a new user subscription plan.",
    operationId: "createUserSubscriptionPlan",
  })
  @ApiBody({
    type: CreateUserSubscriptionPlanDto,
    description: "The user subscription plan to create.",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The user subscription plan has been successfully created.",
    type: DetailsUserSubscriptionPlanDto,
  })
  async create(@Body() createUserSubscriptionPlanDto: CreateUserSubscriptionPlanDto): Promise<DetailsUserSubscriptionPlanDto> {
    return await this.userSubscriptionPlanService.create(createUserSubscriptionPlanDto);
  }

  @Get("user/:userId")
  @ApiOperation({
    summary: "Get all user subscription plans with pagination",
    description: "Get all user subscription plans with pagination.",
    operationId: "findAllUserSubscriptionPlans",
  })
  @ApiParam({
    name: "userId",
    description: "The user id.",
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: "page",
    description: "The page number.",
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: "limit",
    description: "The number of items per page.",
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user subscription plans with pagination.",
    type: PaginatedDetailsUserSubscriptionPlanDto,
  })
  async findAll(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() options: PaginationOptionsDto): Promise<PaginatedDetailsUserSubscriptionPlanDto> {
    return await this.userSubscriptionPlanService.findAll(userId, options);
  }

  @Get("user/:userId/item/:itemType")
  @ApiOperation({
    summary: "Get all user subscription plans for a specific item",
    description: "Get all user subscription plans for a specific item.",
    operationId: "findByItemIdUserSubscriptionPlans",
  })
  @ApiParam({
    name: "userId",
    description: "The user id.",
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiParam({
    name: "itemType",
    description: "The type of the item to retrieve user subscription plans for.",
    required: true,
    enum: BaseSubscriptionPlanItemEnum,
    enumName: "BaseSubscriptionPlanItemEnum",
    example: BaseSubscriptionPlanItemEnum.program,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user subscription plans for the specified item.",
    type: PaginatedDetailsUserSubscriptionPlanDto,
  })
  async findByItemType(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("itemType", new ParseEnumPipe(BaseSubscriptionPlanItemEnum)) itemType: BaseSubscriptionPlanItemEnum,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsUserSubscriptionPlanDto> {
    return await this.userSubscriptionPlanService.findByItemType(userId, itemType, options);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a user subscription plan by id",
    description: "Get a user subscription plan by id.",
    operationId: "findOneUserSubscriptionPlan",
  })
  @ApiParam({
    name: "id",
    description: "The ID of the user subscription plan to retrieve.",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the user subscription plan.",
    type: DetailsUserSubscriptionPlanDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserSubscriptionPlanDto> {
    return await this.userSubscriptionPlanService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a user subscription plan",
    description: "Update a user subscription plan.",
    operationId: "updateUserSubscriptionPlan",
  })
  @ApiParam({
    name: "id",
    description: "The ID of the user subscription plan to update.",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateUserSubscriptionPlanDto,
    description: "The user subscription plan to update.",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The user subscription plan has been successfully updated.",
    type: DetailsUserSubscriptionPlanDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserSubscriptionPlanDto: UpdateUserSubscriptionPlanDto
  ): Promise<DetailsUserSubscriptionPlanDto> {
    return await this.userSubscriptionPlanService.update(id, updateUserSubscriptionPlanDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a user subscription plan",
    description: "Delete a user subscription plan.",
    operationId: "removeUserSubscriptionPlan",
  })
  @ApiParam({
    name: "id",
    description: "The ID of the user subscription plan to delete.",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The user subscription plan has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.userSubscriptionPlanService.remove(id);
  }
}
