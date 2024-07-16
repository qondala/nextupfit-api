import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliateLink } from "../../entities/affiliate-link.entity";
import { AffiliateProgram } from "../../entities/affiliate-program.entity";
import { Content } from "../../entities/content.entity";
import { AffiliateProgramsController } from "./affiliateprogram.controller";
import { AffiliateProgramsService } from "./affiliateprogram.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([AffiliateProgram, Content, AffiliateLink]),
  ],
  controllers: [AffiliateProgramsController],
  providers: [AffiliateProgramsService],
  exports: [AffiliateProgramsService],
})
export class AffiliateProgramsModule {}
