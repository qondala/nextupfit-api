import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart_item')
export class EcommerceCartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  productName: string;

  @Column()
  orderId: number;

  @Column({ nullable: true })
  userComment?: string;
}
