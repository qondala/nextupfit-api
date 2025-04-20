import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('social_affiliate_sale')
export class SocialAffiliateSaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  affiliateProgramId: number;

  @Column()
  affiliateLinkId: string;

  @Column()
  buyerId: number;

  @Column()
  sellerId: number;

  @Column()
  saleAmount: number;

  @Column()
  commissionAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
