import fastify from "fastify";
import { checkoutRoute } from "./routes/checkout";

// Importa o Fastify
export const app = fastify();

app.register(checkoutRoute); //registra a rota de checkout
