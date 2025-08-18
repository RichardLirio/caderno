import { Injectable } from "@nestjs/common";
import { NotificationProvider } from "./contracts/notification-provider.interface";

@Injectable()
export class NotificationsService {
  constructor(private readonly NotificationProvider: NotificationProvider) {}

  sendOrderNotification(customerEmail: string, orderId: string) {
    const subject = `Order Confirmation #${orderId}`;
    const body = `Your order ${orderId} has been confirmed. Thank you!`;

    const result = this.NotificationProvider.generate(
      customerEmail,
      subject,
      body
    );

    return {
      email: customerEmail,
      orderId,
      sent: result,
      provider: "Adapter Pattern (decoupled)",
    };
  }
}
