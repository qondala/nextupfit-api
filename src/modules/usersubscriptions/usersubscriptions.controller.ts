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
import { UserSubscriptionsService } from "./usersubscriptions.service";
import { CreateUserSubscriptionDto } from "./dto/create-usersubscription.dto";
import { UpdateUserSubscriptionDto } from "./dto/update-usersubscription.dto";
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
import { UserSubscription } from "../../entities/user-subscription.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("UserSubscriptions")
@ApiBearerAuth()
@Controller("user-subscriptions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserSubscriptionsController {
  constructor(
    private readonly userSubscriptionsService: UserSubscriptionsService,
  ) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateUserSubscriptionDto })
  @ApiCreatedResponse({
    description: "User subscription created successfully",
    type: UserSubscription,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create user subscription",
  })
  create(
    @Body() createUserSubscriptionDto: CreateUserSubscriptionDto,
    @Req() request: Request,
  ) {
    return this.userSubscriptionsService.create(
      createUserSubscriptionDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all user subscriptions",
    type: [UserSubscription],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user subscriptions",
  })
  findAll() {
    return this.userSubscriptionsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the user subscription",
    type: "number",
  })
  @ApiOkResponse({
    description: "User subscription found successfully",
    type: UserSubscription,
  })
  @ApiNotFoundResponse({ description: "User subscription not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user subscription",
  })
  findOne(@Param("id") id: string) {
    return this.userSubscriptionsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the user subscription",
    type: "number",
  })
  @ApiBody({ type: UpdateUserSubscriptionDto })
  @ApiOkResponse({
    description: "User subscription updated successfully",
    type: UserSubscription,
  })
  @ApiNotFoundResponse({ description: "User subscription not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update user subscription",
  })
  update(
    @Param("id") id: string,
    @Body() updateUserSubscriptionDto: UpdateUserSubscriptionDto,
    @Req() request: Request,
  ) {
    return this.userSubscriptionsService.update(
      +id,
      updateUserSubscriptionDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the user subscription",
    type: "number",
  })
  @ApiOkResponse({ description: "User subscription deleted successfully" })
  @ApiNotFoundResponse({ description: "User subscription not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete user subscription",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.userSubscriptionsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of user subscriptions matching the search query",
    type: [UserSubscription],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search user subscriptions",
  })
  searchUserSubscriptions(@Query("query") query: string) {
    return this.userSubscriptionsService.searchUserSubscriptions(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of user subscriptions for the user",
    type: [UserSubscription],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user subscriptions for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.userSubscriptionsService.findByUser(+userId);
  }

  @Get("plan/:planId")
  @ApiParam({
    name: "planId",
    description: "ID of the subscription plan",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of user subscriptions for the plan",
    type: [UserSubscription],
  })
  @ApiNotFoundResponse({ description: "Subscription plan not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch user subscriptions for the plan",
  })
  findByPlan(@Param("planId") planId: string) {
    return this.userSubscriptionsService.findByPlan(+planId);
  }
}
