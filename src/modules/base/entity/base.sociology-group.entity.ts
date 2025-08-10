import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseSociologyEntity } from "./base.sociology.entity";

@Entity("base_sociology_group")
export class BaseSociologyGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true, unique: true })
  code?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BaseSociologyEntity, (sociology) => sociology.baseSociologyGroupId)
  sociologies: BaseSociologyEntity[];
}
