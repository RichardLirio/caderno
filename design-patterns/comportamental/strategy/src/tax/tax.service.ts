import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class TaxService {
  calculate(taxType: string, amount: number): number {
    if (taxType === "ICMS") {
      return (amount * 4) / 100;
    }
    if (taxType === "ISS") {
      return (amount * 11) / 100;
    }
    if (taxType === "IPI") {
      return (amount * 15) / 100;
    }
    throw new BadRequestException("invalid tax type.");
  }
}
