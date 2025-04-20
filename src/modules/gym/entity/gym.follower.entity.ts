import { UserEntity } from "@app/module/user/entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { GymEntity } from "./gym.entity";

@Entity("gym_follower")
export class GymFollowerEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ nullable: false })
  gymId: number;


  @Column({ nullable: true })
  followerUserId: number;


  @Column({
    type: "timestamp",
    nullable: true,
  })
  acceptedDate?: Date;
  
  
  @Column({
    type: "timestamp",
    nullable: true,
  })
  stoppedDate?: Date;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  blockedDate?: Date;

  @Column({
    type: "boolean",
    nullable: true,
    default: true
  })
  accepted?: boolean;

  @Column({
    type: "boolean",
    nullable: true,
    default: false
  })
  blocked?: boolean;
  
  
  @Column({
    type: "boolean",
    nullable: true,
    default: false
  })
  stopped?: boolean;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: 'gymId' })
  gym: GymEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'followerUserId' })
  follower: UserEntity;

  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
