import { Injectable } from "@nestjs/common";
import { LegacyEmailProvider } from "./legacy/legacy-email.provider";

@Injectable()
export class NotificationsService {
  private emailProvider = new LegacyEmailProvider();

  sendOrderNotification(customerEmail: string, orderId: string) {
    const subject = `Order Confirmation #${orderId}`;
    const body = `Your order ${orderId} has been confirmed. Thank you!`;

    // Acoplamento direto ao provedor
    const result = this.emailProvider.sendEmail(customerEmail, subject, body);

    return {
      email: customerEmail,
      orderId,
      sent: result,
      provider: "LegacyEmailProvider (hardcoded)",
    };
  }
}
