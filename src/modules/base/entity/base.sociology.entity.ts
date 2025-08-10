import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseSociologyGroupEntity } from ".";

@Entity("base_sociology")
export class BaseSociologyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  baseSociologyGroupId: number;

  @Column({ nullable: true, unique: true })
  code?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseSociologyGroupEntity, (group) => group.sociologies)
  @JoinColumn({ name: "baseSociologyGroupId", referencedColumnName: "id" })
  baseSociologyGroup: BaseSociologyGroupEntity;
}
