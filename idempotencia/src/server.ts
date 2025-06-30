import { connectRedis } from "./lib/redis";

const main = async () => {
  try {
    await connectRedis(); // <- tenta conectar ao Redis
  } catch (err) {
    console.error(
      "❌ Não foi possível iniciar o servidor: erro ao conectar com o Redis."
    );
    process.exit(1); // Encerra o processo caso falhe a conexão
  }

  const { app } = await import("./app");

  await app.listen({ host: "0.0.0.0", port: 3000 });

  console.info(`🚀 Servidor HTTP rodando na porta 3000!`);
};

main();
