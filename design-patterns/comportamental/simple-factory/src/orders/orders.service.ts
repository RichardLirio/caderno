import { Injectable } from "@nestjs/common";

@Injectable()
export class OrdersService {
  // Legacy: messy, hardcoded, no polymorphism, bad maintainability
  calculateOrder(type: string, amount: number) {
    let total = 0;

    if (type === "book") {
      // Book price calculation
      total = amount * 10;
      // apply tax
      total += total * 0.1;
    } else if (type === "electronic") {
      // Electronics price calculation
      total = amount * 100;
      // apply warranty fee
      total += 50;
    } else if (type === "food") {
      // Food price calculation
      total = amount * 5;
      // apply service charge
      total += total * 0.05;
    } else {
      throw new Error(`Unknown order type: ${type}`);
    }

    return {
      type,
      amount,
      total,
      message: "Legacy calculation completed",
    };
  }
}
