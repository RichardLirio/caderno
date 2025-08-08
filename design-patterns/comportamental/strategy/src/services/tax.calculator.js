class TaxCalculator {
  async calculate(amount, taxType) {
    if (taxType === "ICMS") {
      return (amount * 4) / 100;
    }
    if (taxType === "ISS") {
      return (amount * 11) / 100;
    }
    if (taxType === "IPI") {
      return (amount * 15) / 100;
    }
    throw new Error("invalid tax type.");
  }
}

export default TaxCalculator;
