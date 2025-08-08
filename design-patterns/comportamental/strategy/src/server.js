// Import the framework and instantiate it
import Fastify from "fastify";
import TaxCalculator from "./services/tax.calculator.js";
import TaxController from "./controller/tax.controller.js";

const fastify = Fastify({
  logger: true,
});
const taxCalculator = new TaxCalculator();
const taxController = new TaxController(taxCalculator);

fastify.post("/calculate", async function handler(request, reply) {
  return await taxController.fastifyHandler(request, reply);
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
