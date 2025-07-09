import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { BaseFoodNutrientEntity } from ".";

@Entity("base_food")
export class BaseFoodEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: "varchar", nullable: false })
  name: string;


  @Column({ type: "varchar", nullable: false })
  description: string;

  
  @Column({ type: "varchar", nullable: true })
  iconUrl?: string;


  @Column({ type: "int", nullable: false })
  createdByUserId: number;


  @Column({ type: "int", nullable: false })
  foodGroupId: number;

  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;

  @OneToMany(() => BaseFoodNutrientEntity, (foodNutrient) => foodNutrient.food)
  nutrients: BaseFoodNutrientEntity[];

  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
 