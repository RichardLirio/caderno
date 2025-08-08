import { Injectable } from "@nestjs/common";
import { TaxTypeInterface } from "./contracts/TaxtypeInterface";

@Injectable()
export class TaxService {
  private taxType: TaxTypeInterface;

  calculate(amount: number): number {
    return this.taxType.calculate(amount);
  }

  setTaxType(taxtType: TaxTypeInterface) {
    this.taxType = taxtType;
  }
}
