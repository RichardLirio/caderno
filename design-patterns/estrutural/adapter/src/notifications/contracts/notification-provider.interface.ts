export interface NotificationProvider {
  generate(customerEmail: string, subject: string, body: string): boolean;
}
