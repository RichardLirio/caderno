import { createClient } from "redis";

const redis = createClient({
  url: "redis://localhost:6379",
  password: "@a123456",
}); // Paremetros utilizados para subir o container do redis

redis.on("error", (err) => {
  console.error("❌ Erro ao conectar ao Redis:", err);
});

export const connectRedis = async () => {
  try {
    if (!redis.isOpen) {
      await redis.connect();
      console.info("✅ Redis conectado com sucesso!");
    }
  } catch (error) {
    console.error("❌ Falha ao conectar ao Redis:", error);
    throw error;
  }
};

export { redis };
