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
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
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
import { Notification } from "../../entities/notification.entity";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("Notifications")
@ApiBearerAuth()
@Controller("notifications")
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @Roles(UserRole.ADMIN) // On suppose que seul l'administrateur peut créer des notifications
  @ApiBody({ type: CreateNotificationDto })
  @ApiCreatedResponse({
    description: "Notification created successfully",
    type: Notification,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create notification",
  })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOkResponse({
    description: "List of all notifications",
    type: [Notification],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch notifications",
  })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the notification",
    type: "number",
  })
  @ApiOkResponse({
    description: "Notification found successfully",
    type: Notification,
  })
  @ApiNotFoundResponse({ description: "Notification not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch notification",
  })
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.ADMIN) // On suppose que seul l'administrateur peut mettre à jour des notifications
  @ApiParam({
    name: "id",
    description: "ID of the notification",
    type: "number",
  })
  @ApiBody({ type: UpdateNotificationDto })
  @ApiOkResponse({
    description: "Notification updated successfully",
    type: Notification,
  })
  @ApiNotFoundResponse({ description: "Notification not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update notification",
  })
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN) // On suppose que seul l'administrateur peut supprimer des notifications
  @ApiParam({
    name: "id",
    description: "ID of the notification",
    type: "number",
  })
  @ApiOkResponse({ description: "Notification deleted successfully" })
  @ApiNotFoundResponse({ description: "Notification not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete notification",
  })
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(+id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of notifications matching the search query",
    type: [Notification],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search notifications",
  })
  searchNotifications(@Query("query") query: string) {
    return this.notificationsService.searchNotifications(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of notifications for the user",
    type: [Notification],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch notifications for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.notificationsService.findByUser(+userId);
  }

  @Get("unread")
  @ApiOkResponse({
    description: "List of unread notifications for the current user",
    type: [Notification],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch unread notifications for the user",
  })
  findUnreadNotifications(@Req() request: Request) {
    return this.notificationsService.findUnreadNotifications(request.user.id);
  }

  @Get("read/:id")
  @ApiParam({
    name: "id",
    description: "ID of the notification",
    type: "number",
  })
  @ApiOkResponse({
    description: "Notification marked as read successfully",
    type: Notification,
  })
  @ApiNotFoundResponse({ description: "Notification not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to mark notification as read",
  })
  markAsRead(@Param("id") id: string) {
    return this.notificationsService.markAsRead(+id);
  }
}
