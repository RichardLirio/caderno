import { TaxTypeInterface } from "./TaxtypeInterface";

export class ICMS implements TaxTypeInterface {
  calculate(amount: number): number {
    return (amount * 4) / 100;
  }
}
