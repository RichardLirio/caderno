import { Body, Controller, Post } from "@nestjs/common";
import { TaxService } from "./tax.service";

@Controller("calculate")
export class TaxController {
  constructor(private readonly appService: TaxService) {}

  @Post()
  calculateTax(@Body() body: { taxType: string; amount: number }) {
    const taxType = body.taxType;

    const tax = this.appService.calculate(taxType, body.amount);

    return { tax };
  }
}
