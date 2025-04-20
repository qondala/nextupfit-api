import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { BaseMealTypeEnum } from "../types";


@Entity("base_meal")
export class BaseMealEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: "varchar", nullable: false })
  name: string;


  @Column({
    type: "enum",
    enum: BaseMealTypeEnum,
    default: BaseMealTypeEnum.breakfast,
    nullable: false
  })
  mealType: BaseMealTypeEnum;


  @Column({ type: "varchar", nullable: false })
  description: string;


  @Column({ type: "int", nullable: false })
  createdByUserId: number;


  @Column({ type: "varchar", nullable: true })
  code?: string;


  @Column({ type: "varchar", nullable: true })
  iconUrl?: string;

  
  @Column({ type: "varchar", nullable: true, default: 0 })
  order: number;
}
