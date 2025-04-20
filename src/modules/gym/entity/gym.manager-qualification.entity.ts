import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { GymManagerEntity } from "./";

@Entity("gym_manager_qualification")
export class GymManagerQualificationEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  managerId: number;

  @Column()
  qualificationName: string;

  @Column({ nullable: true })
  institutionName?: string;

  @Column({ nullable: true })
  yearObtained?: number;

  @Column({ nullable: true })
  certificateUrl?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => GymManagerEntity, manager => manager.qualifications)
  @JoinColumn({ name: "managerId" })
  manager: GymManagerEntity;
}
