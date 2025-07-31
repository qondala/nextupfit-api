import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { BaseSubscriptionPlanStatusEnum } from "@app/module/base/types";


@Entity("program_subscription")
export class ProgramSubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  programId: number;

  @Column()
  subscriberUserId: number;

  @Column({ nullable: false })
  programSubscriptionPlanId: number;

  @Column({ type: "timestamp", nullable: true, default: new Date() })
  startedDate?: Date;

  @Column({
    type: "enum",
    enum: BaseSubscriptionPlanStatusEnum,
    default: BaseSubscriptionPlanStatusEnum.active,
  })
  status: BaseSubscriptionPlanStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
