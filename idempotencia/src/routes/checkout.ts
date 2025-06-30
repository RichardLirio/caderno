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
      return reply.status(200).send(JSON.parse(cached)); // retorna o paymentID salvo no cache do redis Com a data do processamento e o seu status.
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
