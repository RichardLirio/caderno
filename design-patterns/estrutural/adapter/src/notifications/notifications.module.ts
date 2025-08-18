import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { LegacyEmailProvider } from "./legacy/legacy-email.provider";
import { LegacyEmailAdapter } from "./adapters/legacy-email.adapter";
import { NotificationProvider } from "./contracts/notification-provider.interface";

@Module({
  controllers: [NotificationsController],
  providers: [
    LegacyEmailProvider,
    {
      provide: "NotificationProvider", // token de injeção
      useClass: LegacyEmailAdapter,
    },
    {
      provide: NotificationsService,
      useFactory: (provider: NotificationProvider) =>
        new NotificationsService(provider),
      inject: ["NotificationProvider"],
    },
  ],
})
export class NotificationsModule {}
