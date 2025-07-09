import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from "./user.entity";
import { BaseBodyParamEntity } from "@app/module/base/entity";

@Entity("user_body_param")
export class UserBodyParamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  bodyParamId: number;

  @Column({ type: "float" })
  paramValue: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => BaseBodyParamEntity)
  @JoinColumn({ name: 'bodyParamId' })
  bodyParam: BaseBodyParamEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
