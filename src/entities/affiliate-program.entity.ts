import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Content } from "./content.entity";
import { AffiliateLink } from "./affiliate-link.entity";

@Entity()
export class AffiliateProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.affiliatePrograms)
  @JoinColumn()
  content: Content;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  commissionRate: number;

  @Column({ nullable: true })
  programDescription: string;

  @OneToMany(
    () => AffiliateLink,
    (affiliateLink) => affiliateLink.affiliateProgram,
  )
  affiliateLinks: AffiliateLink[];
}
