import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserProgram } from "./user-program.entity";

@Entity()
export class PerformanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserProgram, (userProgram) => userProgram.performanceRecords)
  userProgram: UserProgram;

  @Column({ nullable: true })
  performanceDescription: string;

  @Column({ type: "date" })
  dateRecorded: Date;
}
