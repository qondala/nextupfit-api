import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { AffiliateProgram } from "./affiliate-program.entity";
import { User } from "./user.entity";
import { AffiliateSale } from "./affiliate-sale.entity";

@Entity()
export class AffiliateLink {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => AffiliateProgram,
    (affiliateProgram) => affiliateProgram.affiliateLinks,
  )
  @JoinColumn()
  affiliateProgram: AffiliateProgram;

  @ManyToOne(() => User, (user) => user.affiliateLinks)
  @JoinColumn()
  user: User;

  @Column()
  generatedLink: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  creationDate: Date;

  @OneToMany(
    () => AffiliateSale,
    (affiliateSale) => affiliateSale.affiliateLink,
  )
  affiliateSales: AffiliateSale[];
}
