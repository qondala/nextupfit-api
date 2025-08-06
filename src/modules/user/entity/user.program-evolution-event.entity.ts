import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  ProgramEvolutionEventTypeEnum,
  ProgramItemCompositeDto,
  ProgramItemTypeEnum,
} from "@app/module/program/types";
import { SocialActorEnum } from "@app/module/social/types";

@Entity("user_program_evolution_event")
export class UserProgramEvolutionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ProgramEvolutionEventTypeEnum,
  })
  event: ProgramEvolutionEventTypeEnum;

  @Column()
  userId: number;

  @Column()
  managerId: number;

  @Column({
    type: "enum",
    enum: SocialActorEnum,
  })
  receiverType: SocialActorEnum;

  @Column()
  gymId: number;

  @Column()
  programItemId: number;

  @Column({
    type: "enum",
    enum: ProgramItemTypeEnum,
  })
  programItem: ProgramItemTypeEnum;

  @Column({ default: 0 })
  progressionPoints: number;

  @Column({ type: "numeric", precision: 3, scale: 2, default: 0 })
  progressionPercentage: number;

  @Column({ type: "numeric", precision: 3, scale: 2, default: 0 })
  totalProgressionPercentage: number;

  @Column({ default: 0 })
  totalProgressionPoints: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  iteration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Transcient
  programItemComposite?: ProgramItemCompositeDto;
}
