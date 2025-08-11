import { Controller, Get, Query } from "@nestjs/common";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get("calculate")
  calculateTotal(@Query("type") type: string, @Query("amount") amount: string) {
    return this.ordersService.calculateOrder(type, parseInt(amount));
  }
}
