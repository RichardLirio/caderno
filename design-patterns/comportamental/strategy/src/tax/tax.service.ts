import { Injectable } from "@nestjs/common";
import { TaxFactory } from "./factory/tax.factory";

@Injectable()
export class TaxService {
  constructor(private readonly taxFactory: TaxFactory) {}

  calculate(taxtType: string, amount: number): number {
    const factory = this.taxFactory.create(taxtType);
    return factory.calculate(amount);
  }
}
