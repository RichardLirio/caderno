# 🔁 Idempotência em APIs HTTP com Node.js + Redis

Este repositório demonstra o **conceito de idempotência** na prática utilizando **Node.js**, **Fastify**, e **Redis**. Aqui você encontrará uma explicação teórica clara, acompanhada de um exemplo funcional para simular o reprocessamento seguro de requisições, como pagamentos ou criação de pedidos.

---

## 📘 O que é Idempotência?

**Idempotência** é uma propriedade de uma operação onde **executá-la uma ou várias vezes tem o mesmo efeito**. Em APIs HTTP, isso significa que, se um cliente fizer a mesma requisição múltiplas vezes (por falha de rede, timeout, ou reenvio manual), apenas **uma única ação real** será executada no servidor, retornando o mesmo resultado em todas as tentativas subsequentes.

### 📌 Exemplos clássicos onde idempotência é necessária:
- Pagamentos (ex: Stripe, PayPal)
- Criação de pedidos
- Webhooks
- Processamento de eventos assíncronos

---

## 💡 Como funciona a idempotência?

A ideia básica é:
1. O cliente envia uma requisição com um **idempotency key** (ex: um UUID ou um hash baseado no conteúdo da requisição).
2. O servidor armazena essa chave (por exemplo, no Redis) junto com o resultado da operação.
3. Se a mesma chave for enviada novamente, o servidor retorna a **mesma resposta da requisição original**, sem executar a ação novamente.

---

## 🛠 Tecnologias usadas

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Redis](https://redis.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [ioredis](https://github.com/luin/ioredis)
- [Docker](https://www.docker.com/) (para rodar o Redis)

---

## 🚀 Exemplo prático

A seguir, apresentamos uma rota `/checkout` que implementa idempotência para simular o processamento de um pagamento. A implementação usa uma chave de idempotência gerada a partir do conteúdo da requisição e armazena o resultado no Redis com expiração (TTL).

### 📥 Requisição de Exemplo

Você pode testar a rota usando o seguinte arquivo `client.http`:

```http
POST http://localhost:3000/checkout
Content-Type: application/json

{
  "amount": 100,
  "description": "Pagamento do plano premium",
  "paymentMethod": "credit_card"
}
```

#### 📤 Resposta (primeira vez)
```json
{
  "status": "success",
  "paymentId": "abc123",
  "processedAt": "2025-06-30T13:22:00.000Z"
}
```

#### 📤 Resposta (requisições subsequentes com os mesmos parâmetros)
```json
{
  "status": "success",
  "paymentId": "abc123",
  "processedAt": "2025-06-30T13:22:00.000Z"
}
```

### Código da Rota

Abaixo está o código da rota `/checkout` que implementa idempotência:

```typescript
import { FastifyInstance } from "fastify";
import crypto from "crypto";
import { redis } from "../lib/redis";

// Interface para validar o corpo da requisição.
interface CheckoutBody {
  amount: number;
  description: string;
  paymentMethod: string;
}

export async function checkoutRoute(app: FastifyInstance) {
  app.post("/checkout", async (request, reply) => {
    const { amount, description, paymentMethod } = request.body as CheckoutBody; // Corpo da requisição a ser enviado

    if (!amount || !description || !paymentMethod) {
      return reply.status(400).send({ error: "Missing required fields" });
    }

    // 🔑 Gera a chave de idempotência baseada no conteúdo
    const rawKey = `${amount}-${description}-${paymentMethod}`;
    const idempotencyKey = crypto
      .createHash("sha256")
      .update(rawKey)
      .digest("hex");

    const cached = await redis.get(idempotencyKey);

    if (cached) {
      return reply.status(200).send(JSON.parse(cached)); // retorna o paymentID salvo no cache do redis com a data do processamento e o seu status.
    }

    // Simula processamento (ex: pagamento)
    const paymentId = crypto.randomUUID();
    const result = {
      status: "success",
      paymentId,
      processedAt: new Date().toISOString(),
    };

    // Armazena no Redis com TTL de 5 minutos
    await redis.set(idempotencyKey, JSON.stringify(result), {
      expiration: { type: "EX", value: 60 * 5 },
    });

    return reply.status(201).send(result);
  });
}
```

### Explicação do Código

1. **Validação do Corpo da Requisição**:
   - O código valida os campos `amount`, `description`, e `paymentMethod`. Se algum estiver faltando, retorna um erro 400 (Bad Request).

2. **Geração da Chave de Idempotência**:
   - Uma chave única (`idempotencyKey`) é gerada concatenando os parâmetros da requisição (`amount`, `description`, `paymentMethod`) e aplicando um hash SHA-256. Isso garante que requisições idênticas gerem a mesma chave.

3. **Verificação no Cache (Redis)**:
   - O servidor consulta o Redis usando a `idempotencyKey`. Se a chave existe, o resultado armazenado é retornado com status 200, evitando reprocessamento.

4. **Processamento da Requisição**:
   - Se a chave não existe, a requisição é processada (neste caso, simulada com a geração de um `paymentId` único). O resultado é armazenado no Redis com um TTL de 5 minutos.

5. **Resposta**:
   - Para novas requisições, retorna status 201 (Created). Para requisições repetidas, retorna status 200 com o resultado armazenado.

### Benefícios da Implementação

- **Prevenção de Duplicatas**: Evita múltiplos processamentos de um mesmo pagamento, protegendo contra cobranças duplicadas.
- **Resiliência a Falhas**: Permite retentativas seguras em caso de falhas de rede ou timeouts.
- **Consistência**: Garante que o cliente receba a mesma resposta para requisições idênticas.
- **Eficiência**: O uso do Redis com TTL libera espaço após um período definido (5 minutos).

---

## 🧪 Como rodar o projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/caderno.git
   cd caderno/idempotencia
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o Redis com Docker**:
   - O projeto inclui um arquivo `docker-compose.yml` para facilitar a configuração do Redis. Para iniciá-lo, execute:
     ```bash
     docker-compose up -d
     ```
   - O arquivo `docker-compose.yml` configura um contêiner Redis com a imagem `bitnami/redis:latest`, usando a senha `@a123456` e expondo a porta `6379`. Ele também define um volume persistente (`redis-data`) e um healthcheck para garantir que o Redis esteja funcionando corretamente.

   **Conteúdo do `docker-compose.yml`**:
   ```yaml
   services:
     redis:
       image: 'bitnami/redis:latest'
       environment:
         - REDIS_PASSWORD=@a123456
       command:
         - redis-server
         - --requirepass
         - '@a123456'
         - --dir
         - /bitnami/redis/data
       ports:
         - "6379:6379"
       volumes:
         - redis-data:/bitnami/redis/data
       healthcheck:
         test: ["CMD", "redis-cli", "-a", "@a123456", "ping"]
         interval: 10s
         timeout: 5s
         retries: 5
         start_period: 5s
       
   volumes:
     redis-data:
   ```

   - Certifique-se de que o Docker está instalado e o serviço Redis está ativo antes de iniciar a aplicação. Você pode verificar o status com:
     ```bash
     docker-compose ps
     ```

4. **Configure a conexão com o Redis**:
   - Atualize o arquivo `redis.ts` para usar a senha configurada no `docker-compose.yml` (ex: `@a123456`) e a porta padrão `6379`.

5. **Inicie a aplicação**:
   ```bash
   npm run dev
   ```

6. **Teste a rota**:
   - Use ferramentas como Postman, Insomnia ou o arquivo `client.http` fornecido:
     ```http
     POST

 http://localhost:3333/checkout
     Content-Type: application/json

     {
       "amount": 100,
       "description": "Pagamento do plano premium",
       "paymentMethod": "credit_card"
     }
     ```

---

## 📁 Estrutura do Projeto

```plaintext
└── idempotencia
    ├── README.md
    ├── client.http
    ├── docker-compose.yml
    ├── package-lock.json
    ├── package.json
    ├── src
        ├── app.ts
        ├── lib
        │   └── redis.ts
        ├── routes
        │   └── checkout.ts
        └── server.ts
    └── tsconfig.json
```


---

## 📌 Conceitos Demonstrados

- **Criação de chave de idempotência**: Geração de uma chave única baseada no conteúdo da requisição usando hash SHA-256.
- **Cache com TTL no Redis**: Armazenamento temporário de resultados com expiração para otimizar espaço.
- **Retorno de resposta idempotente**: Garantia de que requisições repetidas retornem o mesmo resultado.
- **Validação de entrada**: Verificação de campos obrigatórios para evitar erros.
- **Integração com Docker**: Configuração docker.


## 🔍 Considerações Adicionais

- **Escalabilidade**: A abordagem com Redis é eficiente para sistemas distribuídos, pois o cache é centralizado e rápido.
- **Segurança**: O hash SHA-256 garante chaves de idempotência únicas e difíceis de prever.
- **Extensibilidade**: A lógica pode ser adaptada para incluir mais campos na chave de idempotência ou integrar com sistemas de pagamento reais.

Este repositório serve como uma base sólida para entender e implementar idempotência em APIs, especialmente em cenários críticos como processamento de pagamentos.