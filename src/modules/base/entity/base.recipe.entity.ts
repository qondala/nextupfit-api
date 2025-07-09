import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("base_recipe")
export class BaseRecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  imageUrl?: string;

  @Column({ type: "int", nullable: true })
  calories?: number;

  @Column({ type: "int", nullable: true })
  protein?: number;

  @Column({ type: "int", nullable: true })
  carbs?: number;

  @Column({ type: "int", nullable: true })
  fat?: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  code?: string;

  @Column({ type: "int", default: 1 })
  nbPersons?: number;

  @Column({ type: "bigint", default: 0 })
  ownerManagerId?: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt?: Date;
}
