import { Module } from "@nestjs/common";
import { TaxController } from "./tax.controller";
import { TaxService } from "./tax.service";
import { TaxFactory } from "./factory/tax.factory";
import { ICMS } from "./contracts/ICMS";
import { IPI } from "./contracts/IPI";
import { ISS } from "./contracts/ISS";

@Module({
  imports: [],
  controllers: [TaxController],
  providers: [TaxService, TaxFactory, ICMS, IPI, ISS],
})
export class AppModule {}
