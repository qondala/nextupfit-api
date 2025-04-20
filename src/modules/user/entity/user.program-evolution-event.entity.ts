import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProgamEvolutionEventTypeEnum, ProgramItemTypeEnum } from "@app/module/program/types";


@Entity("user_program_evolution_event")
export class UserProgramEvolutionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ProgamEvolutionEventTypeEnum,
  })
  event: ProgamEvolutionEventTypeEnum;

  @Column()
  userId: number;

  @Column({ nullable: true })
  gymId: number;

  @Column({ nullable: true })
  programItemId: number;

  @Column({
    type: "enum",
    enum: ProgramItemTypeEnum,
  })
  programItem: ProgramItemTypeEnum;

  @Column({ type: "timestamp", nullable: true })
  subscriptionDate: Date;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  iteration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
