class TaxController {
  constructor(TaxCalculator) {
    this.TaxCalculator = TaxCalculator;
  }

  // Método original mantido para compatibilidade
  async calculate(request, reply) {
    const { amount, taxtype } = request.body;

    const tax = await this.TaxCalculator.calculate(amount, taxtype);

    reply.send({ tax });
  }

  // Método adaptado que retorna o valor diretamente
  async calculateTax(amount, taxtype) {
    return await this.TaxCalculator.calculate(amount, taxtype);
  }

  // Handler específico para Fastify
  async fastifyHandler(request, reply) {
    const { amount, taxtype } = request.body;

    try {
      const tax = await this.TaxCalculator.calculate(amount, taxtype);
      return { tax };
    } catch (error) {
      reply.code(400);
      return { error: error.message };
    }
  }
}

export default TaxController;
