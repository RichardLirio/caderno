import { Body, Controller, Post } from "@nestjs/common";
import { TaxService } from "./tax.service";

@Controller("calculate")
export class TaxController {
  constructor(private readonly appService: TaxService) {}

  @Post()
  calculateTax(@Body() body: { taxType: string; amount: number }) {
    return { tax: this.appService.calculate(body.taxType, body.amount) };
  }
}
