import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliateLink } from "../../entities/affiliate-link.entity";
import { AffiliateSale } from "../../entities/affiliate-sale.entity";
import { AffiliateSalesController } from "./affiliatesales.controller";
import { AffiliateSalesService } from "./affiliatesales.service";

@Module({
  imports: [TypeOrmModule.forFeature([AffiliateSale, AffiliateLink])],
  controllers: [AffiliateSalesController],
  providers: [AffiliateSalesService],
  exports: [AffiliateSalesService],
})
export class AffiliateSalesModule {}
