import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseCurrencySymbolPositionEnum } from "../types";

@Entity("base_currency")
export class BaseCurrencyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  symbol: string;

  @Column({ type: "varchar", nullable: false })
  acronym: string;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({
    type: "enum",
    enum: BaseCurrencySymbolPositionEnum,
    default: BaseCurrencySymbolPositionEnum.before,
  })
  symbolPosition: BaseCurrencySymbolPositionEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
