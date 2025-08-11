import { CalculateOrderTypeInterface } from "../contracts/CalculateOrderTypeInterface";

export class ElectronicOrderCalculator implements CalculateOrderTypeInterface {
  calculate(amount: number): number {
    let total = 0;
    // Electronics price calculation
    total = amount * 100;
    // apply warranty fee
    total += 50;

    return total;
  }
}
