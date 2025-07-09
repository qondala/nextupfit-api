import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";


@Entity("user_recommendation")
export class UserRecommendationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recommendedManagerUserId: number;

  @Column()
  recommenderUserId: number;

  @Column()
  recommendeeUserId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
