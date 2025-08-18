// Simula uma dependência de biblioteca externa
export class LegacyEmailProvider {
  sendEmail(to: string, subject: string, body: string): boolean {
    console.log(`📧 [LegacyEmailProvider] Sending email to ${to} - ${subject}`);
    // Simulação de envio
    return true;
  }
}
