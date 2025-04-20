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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

import { PaginationOptionsDto } from "@app/common/dto";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";


import { UserSubscriptionPlanEntity } from "../entity";
import { UserSubscriptionPlanService } from "../service";
import { CreateUserSubscriptionPlanDto, DetailsUserSubscriptionPlanDto, UpdateUserSubscriptionPlanDto } from "../dto";



@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/subscription-plan")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserSubscriptionPlanController {
  constructor(private readonly userSubscriptionPlanService: UserSubscriptionPlanService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user subscription plan" })
  @ApiResponse({
    status: 201,
    description: "The user subscription plan has been successfully created.",
    type: DetailsUserSubscriptionPlanDto,
  })
  create(@Body() createUserSubscriptionPlanDto: CreateUserSubscriptionPlanDto): Promise<DetailsUserSubscriptionPlanDto> {
    return this.userSubscriptionPlanService.create(createUserSubscriptionPlanDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all user subscription plans with pagination" })
  @ApiResponse({
    status: 200,
    description: "Return all user subscription plans with pagination.",
    type: [DetailsUserSubscriptionPlanDto],
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<[DetailsUserSubscriptionPlanDto[], number]> {
    return this.userSubscriptionPlanService.findAll(options);
  }

  @Get("item/:itemId")
  @ApiOperation({ summary: "Get all user subscription plans for a specific item" })
  @ApiResponse({
    status: 200,
    description: "Return all user subscription plans for the specified item.",
    type: [DetailsUserSubscriptionPlanDto],
  })
  findByItemId(
    @Param("itemId", ParseIntPipe) itemId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<[DetailsUserSubscriptionPlanDto[], number]> {
    return this.userSubscriptionPlanService.findByItemId(itemId, options);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user subscription plan by id" })
  @ApiResponse({
    status: 200,
    description: "Return the user subscription plan.",
    type: DetailsUserSubscriptionPlanDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserSubscriptionPlanDto> {
    return this.userSubscriptionPlanService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user subscription plan" })
  @ApiResponse({
    status: 200,
    description: "The user subscription plan has been successfully updated.",
    type: DetailsUserSubscriptionPlanDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserSubscriptionPlanDto: UpdateUserSubscriptionPlanDto
  ): Promise<DetailsUserSubscriptionPlanDto> {
    return this.userSubscriptionPlanService.update(id, updateUserSubscriptionPlanDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user subscription plan" })
  @ApiResponse({
    status: 200,
    description: "The user subscription plan has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.userSubscriptionPlanService.remove(id);
  }
}
