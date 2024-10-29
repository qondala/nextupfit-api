import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class BodyMeasurement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bodyMeasurements)
  @JoinColumn()
  user: User;

  @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
  dateRecorded: Date;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  height: number;

  @Column({ type: "decimal", precision: 4, scale: 2, nullable: true })
  bodyFatPercentage: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  muscleMass: number;

  @Column({ type: "json", nullable: true }) // Ajout du champ pour les macros
  macros: string;
}
