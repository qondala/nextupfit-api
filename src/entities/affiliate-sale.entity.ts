import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AffiliateLink } from "./affiliate-link.entity";

@Entity()
export class AffiliateSale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => AffiliateLink,
    (affiliateLink) => affiliateLink.affiliateSales,
  )
  @JoinColumn()
  affiliateLink: AffiliateLink;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  saleAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  commissionEarned: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  saleDate: Date;
}
