import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { TaxService } from "./tax.service";
import { TaxTypeInterface } from "./contracts/TaxtypeInterface";
import { ISS } from "./contracts/ISS";
import { ICMS } from "./contracts/ICMS";
import { IPI } from "./contracts/IPI";

@Controller("calculate")
export class TaxController {
  constructor(private readonly appService: TaxService) {}

  @Post()
  calculateTax(@Body() body: { taxType: string; amount: number }) {
    const taxType = body.taxType;
    let taxtypeInterface: TaxTypeInterface;

    // regra de negocio que irá ser resolvida em outro exemplo de design pattern chamado factory
    switch (taxType) {
      case "ISS":
        taxtypeInterface = new ISS();
        break;
      case "ICMS":
        taxtypeInterface = new ICMS();
        break;
      case "IPI":
        taxtypeInterface = new IPI();
        break;
      default:
        throw new BadRequestException("Invalid tax type");
    }

    this.appService.setTaxType(taxtypeInterface);

    const tax = this.appService.calculate(body.amount);

    return { tax };
  }
}
