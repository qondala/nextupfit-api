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
import { SubscriptionPlansService } from "./subscriptionplans.service";
import { CreateSubscriptionPlanDto } from "./dto/create-subscriptionplan.dto";
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
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { UpdateSubscriptionPlanDto } from "./dto/uptade-subscriptionplan.dto";
import { SubscriptionPlan } from "../../entities/subscription-plan.entity";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("SubscriptionPlans")
@ApiBearerAuth()
@Controller("subscription-plans")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubscriptionPlansController {
  constructor(
    private readonly subscriptionPlansService: SubscriptionPlansService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiBody({ type: CreateSubscriptionPlanDto })
  @ApiCreatedResponse({
    description: "Subscription plan created successfully",
    type: SubscriptionPlan,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create subscription plan",
  })
  create(@Body() createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    return this.subscriptionPlansService.create(createSubscriptionPlanDto);
  }

  @Get()
  @ApiOkResponse({
    description: "List of all subscription plans",
    type: [SubscriptionPlan],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch subscription plans",
  })
  findAll() {
    return this.subscriptionPlansService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the subscription plan",
    type: "number",
  })
  @ApiOkResponse({
    description: "Subscription plan found successfully",
    type: SubscriptionPlan,
  })
  @ApiNotFoundResponse({ description: "Subscription plan not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch subscription plan",
  })
  findOne(@Param("id") id: string) {
    return this.subscriptionPlansService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.ADMIN)
  @ApiParam({
    name: "id",
    description: "ID of the subscription plan",
    type: "number",
  })
  @ApiBody({ type: UpdateSubscriptionPlanDto })
  @ApiOkResponse({
    description: "Subscription plan updated successfully",
    type: SubscriptionPlan,
  })
  @ApiNotFoundResponse({ description: "Subscription plan not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update subscription plan",
  })
  update(
    @Param("id") id: string,
    @Body() updateSubscriptionPlanDto: UpdateSubscriptionPlanDto,
  ) {
    return this.subscriptionPlansService.update(+id, updateSubscriptionPlanDto);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN)
  @ApiParam({
    name: "id",
    description: "ID of the subscription plan",
    type: "number",
  })
  @ApiOkResponse({ description: "Subscription plan deleted successfully" })
  @ApiNotFoundResponse({ description: "Subscription plan not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete subscription plan",
  })
  remove(@Param("id") id: string) {
    return this.subscriptionPlansService.remove(+id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of subscription plans matching the search query",
    type: [SubscriptionPlan],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search subscription plans",
  })
  searchSubscriptionPlans(@Query("query") query: string) {
    return this.subscriptionPlansService.searchSubscriptionPlans(query);
  }
}
