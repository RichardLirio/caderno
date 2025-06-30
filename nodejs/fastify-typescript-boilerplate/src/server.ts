import Fastify from "fastify";

const app = Fastify();

app.get("/", async () => {
  return { message: "Hello from Fastify + TypeScript!" };
});

app.listen({ port: 3000 }, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
