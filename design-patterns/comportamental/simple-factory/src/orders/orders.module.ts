import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersFactory } from "./factory/orders.factory";
import { BookOrderCalculator } from "./calculators/BookOrderCalculator";
import { FoodOrderCalculator } from "./calculators/FoodOrderCalculator";
import { ElectronicOrderCalculator } from "./calculators/EletronicOrderCalculator";

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersFactory,
    BookOrderCalculator,
    ElectronicOrderCalculator,
    FoodOrderCalculator,
  ],
})
export class OrdersModule {}
