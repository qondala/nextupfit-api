import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { Notification } from "../../entities/notification.entity";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const notification = this.notificationsRepository.create(
      createNotificationDto,
    );
    return this.notificationsRepository.save(notification);
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationsRepository.find({
      relations: ["user"],
    });
  }

  async findOne(id: number): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    const notification = await this.notificationsRepository.preload({
      id,
      ...updateNotificationDto,
    });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return this.notificationsRepository.save(notification);
  }

  async remove(id: number): Promise<void> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
    });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    await this.notificationsRepository.delete(id);
  }

  async searchNotifications(query: string): Promise<Notification[]> {
    const notifications = await this.notificationsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { message: `%${query}%` },
      ],
      relations: ["user"],
    });
    return notifications;
  }

  async findByUser(userId: number): Promise<Notification[]> {
    const notifications = await this.notificationsRepository.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });
    if (!notifications) {
      throw new NotFoundException(`Notifications for user ${userId} not found`);
    }
    return notifications;
  }

  async findUnreadNotifications(userId: number): Promise<Notification[]> {
    const notifications = await this.notificationsRepository.find({
      where: { user: { id: userId }, isRead: false },
      relations: ["user"],
    });
    return notifications;
  }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
    });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    notification.isRead = true;
    return this.notificationsRepository.save(notification);
  }
}
