import { CalculateOrderTypeInterface } from "../contracts/CalculateOrderTypeInterface";

export class BookOrderCalculator implements CalculateOrderTypeInterface {
  calculate(amount: number): number {
    let total = 0;
    // Book price calculation
    total = amount * 10;
    // apply tax
    total += total * 0.1;

    return total;
  }
}
