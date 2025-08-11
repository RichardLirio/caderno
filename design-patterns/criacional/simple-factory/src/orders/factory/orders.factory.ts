import { BadRequestException, Injectable } from "@nestjs/common";
import { BookOrderCalculator } from "../calculators/BookOrderCalculator";
import { ElectronicOrderCalculator } from "../calculators/EletronicOrderCalculator";
import { FoodOrderCalculator } from "../calculators/FoodOrderCalculator";
import { CalculateOrderTypeInterface } from "../contracts/CalculateOrderTypeInterface";

@Injectable()
export class OrdersFactory {
  constructor(
    private readonly bookOrderCalculator: BookOrderCalculator,
    private readonly electronicOrderCalculator: ElectronicOrderCalculator,
    private readonly foodOrderCalculator: FoodOrderCalculator
  ) {}

  create(type: string): CalculateOrderTypeInterface {
    switch (type) {
      case "book":
        return this.bookOrderCalculator;
      case "electronic":
        return this.electronicOrderCalculator;
      case "food":
        return this.foodOrderCalculator;
      default:
        throw new BadRequestException(`Unknown order type: ${type}`);
    }
  }
}
