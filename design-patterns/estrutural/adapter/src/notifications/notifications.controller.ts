import { Controller, Post, Body } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post("send")
  sendNotification(
    @Body("email") email: string,
    @Body("orderId") orderId: string
  ) {
    return this.notificationsService.sendOrderNotification(email, orderId);
  }
}
