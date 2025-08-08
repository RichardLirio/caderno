import { TaxTypeInterface } from "./TaxtypeInterface";

export class ISS implements TaxTypeInterface {
  calculate(amount: number): number {
    return (amount * 11) / 100;
  }
}
