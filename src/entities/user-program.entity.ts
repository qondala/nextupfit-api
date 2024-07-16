import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Content } from "./content.entity";
import { PerformanceRecord } from "./performance-record.entity";

@Entity()
export class UserProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userPrograms)
  user: User;

  @ManyToOne(() => Content, (content) => content.userPrograms)
  content: Content;

  @Column({ type: "date", nullable: true })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  endDate: Date;

  @Column(/*{ type: 'enum', enum: ['active', 'completed', 'paused'], default: 'active' }*/)
  programStatus: "active" | "completed" | "paused";

  @OneToMany(
    () => PerformanceRecord,
    (performanceRecors) => performanceRecors.userProgram,
  )
  performanceRecords: any;
}
