import { Module } from "@nestjs/common";
import { TaxController } from "./tax.controller";
import { TaxService } from "./tax.service";

@Module({
  imports: [],
  controllers: [TaxController],
  providers: [TaxService],
})
export class AppModule {}
