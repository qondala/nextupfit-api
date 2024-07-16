import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliateLink } from "../../entities/affiliate-link.entity";
import { AffiliateProgram } from "../../entities/affiliate-program.entity";
import { AffiliateSale } from "../../entities/affiliate-sale.entity";
import { User } from "../../entities/user.entity";
import { AffiliateLinksController } from "./affiliatelinks.controller";
import { AffiliateLinksService } from "./affiliatelinks.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AffiliateLink,
      User,
      AffiliateProgram,
      AffiliateSale,
    ]),
  ],
  controllers: [AffiliateLinksController],
  providers: [AffiliateLinksService],
  exports: [AffiliateLinksService],
})
export class AffiliateLinksModule {}
