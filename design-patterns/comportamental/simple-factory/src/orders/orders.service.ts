import { Injectable } from "@nestjs/common";
import { OrdersFactory } from "./factory/orders.factory";

@Injectable()
export class OrdersService {
  constructor(private readonly ordersFactory: OrdersFactory) {}

  calculateOrder(type: string, amount: number) {
    const calculator = this.ordersFactory.create(type);
    const total = calculator.calculate(amount);

    return {
      type,
      amount,
      total,
      message: "Calculation completed",
    };
  }
}
