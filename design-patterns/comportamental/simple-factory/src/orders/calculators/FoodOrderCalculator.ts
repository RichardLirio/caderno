import { CalculateOrderTypeInterface } from "../contracts/CalculateOrderTypeInterface";

export class FoodOrderCalculator implements CalculateOrderTypeInterface {
  calculate(amount: number): number {
    let total = 0;
    // Food price calculation
    total = amount * 5;
    // apply service charge
    total += total * 0.05;

    return total;
  }
}
