import { BadRequestException, Injectable } from "@nestjs/common";
import { ICMS } from "../contracts/ICMS";
import { IPI } from "../contracts/IPI";
import { ISS } from "../contracts/ISS";

@Injectable()
export class TaxFactory {
  constructor(
    private readonly issTaxCalculator: ISS,
    private readonly ipiTaxCalculator: IPI,
    private readonly icmsTaxCalculator: ICMS
  ) {}

  create(taxType: string) {
    switch (taxType) {
      case "ISS":
        return this.issTaxCalculator;
      case "ICMS":
        return this.icmsTaxCalculator;
      case "IPI":
        return this.ipiTaxCalculator;
      default:
        throw new BadRequestException("Invalid tax type");
    }
  }
}
