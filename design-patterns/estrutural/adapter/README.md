# 📖 Exercício - Adapter Pattern

## 🎨 Design Patterns

### 🔌 Adapter Pattern - Sistema de Notificações

> Caminho: [`/design-patterns/adapter-pattern`](./design-patterns/estrutural/adapter)

---

## 🚨 Problema (Código Legado)

O sistema de notificações da aplicação estava **altamente acoplado** a um provedor externo (`LegacyEmailProvider`).  

No código legado, o `NotificationsService` instanciava diretamente a classe concreta, sem nenhuma abstração:

```ts
@Injectable()
export class NotificationsService {
  private emailProvider = new LegacyEmailProvider(); // ❌ acoplamento direto

  sendOrderNotification(customerEmail: string, orderId: string) {
    const subject = `Order Confirmation #${orderId}`;
    const body = `Your order ${orderId} has been confirmed. Thank you!`;

    const result = this.emailProvider.sendEmail(customerEmail, subject, body);

    return { email: customerEmail, orderId, sent: result };
  }
}
```

### ⚠️ Problemas Identificados
- **Alto acoplamento** → impossível trocar de provedor sem alterar o `NotificationsService`.  
- **Dificuldade de testes** → não é possível mockar facilmente o envio de e-mail.  
- **Violação do DIP (Dependency Inversion Principle)** → o service depende de uma classe concreta em vez de uma abstração.  

---

## ✅ Refatoração com Adapter Pattern

Para resolver esses problemas, aplicamos o **Adapter Pattern**:

1. Criamos uma **interface** genérica para provedores de notificação:

```ts
export interface NotificationProvider {
  send(to: string, subject: string, body: string): boolean;
}
```

2. Implementamos um **Adapter** que encapsula o `LegacyEmailProvider`:

```ts
@Injectable()
export class LegacyEmailAdapter implements NotificationProvider {
  constructor(private readonly legacyProvider: LegacyEmailProvider) {}

  send(to: string, subject: string, body: string): boolean {
    return this.legacyProvider.sendEmail(to, subject, body);
  }
}
```

3. Alteramos o `NotificationsService` para depender apenas da **abstração**:

```ts
@Injectable()
export class NotificationsService {
  constructor(
    @Inject('NotificationProvider')
    private readonly notificationProvider: NotificationProvider,
  ) {}

  sendOrderNotification(customerEmail: string, orderId: string) {
    const subject = `Order Confirmation #${orderId}`;
    const body = `Your order ${orderId} has been confirmed. Thank you!`;

    const result = this.notificationProvider.send(customerEmail, subject, body);

    return {
      email: customerEmail,
      orderId,
      sent: result,
      provider: 'Adapter Pattern in use',
    };
  }
}
```

4. Ajustamos o **módulo** para registrar o Adapter no container de injeção:

```ts
@Module({
  controllers: [NotificationsController],
  providers: [
    LegacyEmailProvider,
    {
      provide: 'NotificationProvider', // token da abstração
      useClass: LegacyEmailAdapter,    // implementação concreta
    },
    NotificationsService,
  ],
})
export class NotificationsModule {}
```

---

## 🎯 Benefícios da Refatoração
- 🔄 **Flexibilidade** → podemos trocar facilmente de provedor (`SendGridAdapter`, `AWSSESAdapter`, etc.).  
- 🧪 **Testabilidade** → podemos mockar a interface `NotificationProvider` em testes unitários.  
- 🏗️ **SOLID** → agora seguimos o **Dependency Inversion Principle**.  
- 🚀 **Extensibilidade** → podemos adicionar novos adaptadores sem alterar o `NotificationsService`.  

---

## 📌 Exercício Proposto
1. Crie um novo adapter chamado `SmsAdapter` que implemente a interface `NotificationProvider`.  
2. Ajuste o `NotificationsModule` para alternar entre `LegacyEmailAdapter` e `SmsAdapter`.  
3. Teste o envio de notificações chamando a rota:  

```http
POST http://localhost:3000/notifications/send
Content-Type: application/json

{
  "email": "customer@example.com",
  "orderId": "12345"
}
```

---

👉 Agora este projeto serve como base prática para treinar a refatoração de sistemas legados usando o **Adapter Pattern** no NestJS.  
