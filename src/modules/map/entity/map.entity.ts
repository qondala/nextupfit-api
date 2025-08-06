import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Point } from "typeorm/driver/types/GeoJsonTypes";

import { GymEntity } from "@app/module/gym/entity";
import { GymManagerEntity } from "@app/module/gym/entity";
import { UserEntity } from "@app/module/user/entity";

@Entity("map")
export class MapEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "geography",
    spatialFeatureType: "Point",
    srid: 4326,
    nullable: false,
  })
  location: Point;

  @Column({ nullable: true })
  gymId?: number;

  @Column({ nullable: true })
  managerId?: number;

  @Column({ nullable: true })
  userId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  user?: UserEntity;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: "gymId" })
  gym?: GymEntity;

  @ManyToOne(() => GymManagerEntity)
  @JoinColumn({ name: "managerId" })
  manager?: GymManagerEntity;
}
