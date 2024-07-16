import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class BodyMeasurement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bodyMeasurements)
  user: User;

  @Column({ type: "date" })
  dateRecorded: Date;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  height: number;

  @Column({ type: "decimal", precision: 4, scale: 2, nullable: true })
  bodyFatPercentage: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  muscleMass: number;
}
