import { Injectable } from "@nestjs/common";
import { NotificationProvider } from "../contracts/notification-provider.interface";
import { LegacyEmailProvider } from "../legacy/legacy-email.provider";

@Injectable()
export class LegacyEmailAdapter implements NotificationProvider {
  constructor(private readonly legacyEmailProvider: LegacyEmailProvider) {}

  generate(customerEmail: string, subject: string, body: string): boolean {
    // Acoplamento direto ao provedor
    return this.legacyEmailProvider.sendEmail(customerEmail, subject, body);
  }
}
