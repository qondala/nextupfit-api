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
  UseGuards,
  ParseIntPipe,
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

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import {
  CreateSocialNotificationDto,
  UpdateSocialNotificationDto,
  DetailsSocialNotificationDto,
  PaginatedDetailsSocialNotificationDto,
} from "../dto";
import { SocialNotificationService } from "../service";

@ApiTags("Social module endpoints")
@ApiBearerAuth()
@Controller("social/notification")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialNotificationController {
  constructor(private readonly notificationService: SocialNotificationService) {}

  @Post()
  @ApiOperation({
    summary: "Create a notification",
    operationId: "createSocialNotification",
  })
  @ApiBody({
    type: CreateSocialNotificationDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsSocialNotificationDto,
    description: "Notification created successfully",
  })
  async create(
    @Body() createDto: CreateSocialNotificationDto,
  ): Promise<DetailsSocialNotificationDto> {
    return await this.notificationService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all notifications",
    operationId: "findAllSocialNotifications",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsSocialNotificationDto,
    description: "Notifications found successfully",
  })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsSocialNotificationDto> {
    return await this.notificationService.findAll(paginationOptions);
  }

  @Get("user/:userId")
  @ApiOperation({
    summary: "Get notifications by user id",
    operationId: "findByUserIdSocialNotifications",
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsSocialNotificationDto,
    description: "Notifications found successfully",
  })
  async findByUserId(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsSocialNotificationDto> {
    return await this.notificationService.findByUserId(userId, paginationOptions);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get notification by id",
    operationId: "findSocialNotificationById",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsSocialNotificationDto,
    description: "Notification found successfully",
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.notificationService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update notification",
    operationId: "updateSocialNotification",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateSocialNotificationDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsSocialNotificationDto,
    description: "Notification updated successfully",
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateSocialNotificationDto
  ) {
    return this.notificationService.update(id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete notification",
    operationId: "removeSocialNotification",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Notification deleted successfully",
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.notificationService.remove(id);
  }
}
