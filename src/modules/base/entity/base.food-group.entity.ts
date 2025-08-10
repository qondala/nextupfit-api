import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseFoodEntity } from ".";

@Entity("base_food_group")
export class BaseFoodGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: true })
  iconUrl?: string;

  @Column({ type: "bigint", nullable: false })
  createdByUserId: number;

  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BaseFoodEntity, (food) => food.foodGroup)
  foods: BaseFoodEntity[];
}
