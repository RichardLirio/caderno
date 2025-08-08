import { TaxTypeInterface } from "./TaxtypeInterface";

export class IPI implements TaxTypeInterface {
  calculate(amount: number): number {
    return (amount * 15) / 100;
  }
}
