import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  EntityManager,
} from "typeorm";

import {
  SocialActorEnum,
  SocialUpdateTypeEnum,
  SocialUpdatePrivacyEnum,
} from "../types";
import { UserEntity } from "@app/module/user/entity";
import { GymEntity, GymManagerEntity } from "@app/module/gym/entity";
import { SocialUpdateInterestEntity } from "./social.update-interest.entity";

@Entity("social_update")
export class SocialUpdateEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ type: "bigint" })
  authorUserId: number;

  @Column({ type: "bigint", nullable: true })
  authorManagerId: number;

  @Column({
    type: "enum",
    enum: SocialActorEnum,
  })
  socialActorType: SocialActorEnum;

  @Column({ type: "bigint" })
  socialActorId: number;

  @Column({
    type: "enum",
    enum: SocialUpdateTypeEnum,
  })
  socialUpdateType: SocialUpdateTypeEnum;

  @Column({
    type: "enum",
    enum: SocialUpdatePrivacyEnum,
    default: SocialUpdatePrivacyEnum.public,
  })
  privacy: SocialUpdatePrivacyEnum;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updateAt: Date;

  authorUser?: UserEntity;

  authorManager?: GymManagerEntity;

  authorGym?: GymEntity;

  @OneToMany(
    () => SocialUpdateInterestEntity,
    (interest) => interest.update,
  )
  interests: SocialUpdateInterestEntity[];

  // Helper method to get gym if socialActorType is 'gym'
  async loadGymIfApplicable(entityManager: EntityManager): Promise<GymEntity | null> {
    if (this.socialActorType === SocialActorEnum.gym) {
      return await entityManager.findOne(GymEntity, {
        where: { id: this.socialActorId }
      });
    }
    return null;
  }

  // Helper method to get user if socialActorType is 'user'
  async loadUserIfApplicable(entityManager: EntityManager): Promise<UserEntity | null> {
    if (this.socialActorType === SocialActorEnum.user) {
      return await entityManager.findOne(UserEntity, {
        where: { id: this.socialActorId }
      });
    }
    return null;
  }

  // Helper method to get manager if socialActorType is 'manager'
  async loadManagerIfApplicable(entityManager: EntityManager): Promise<GymManagerEntity | null> {
    if (this.socialActorType === SocialActorEnum.manager) {
      return await entityManager.findOne(GymManagerEntity, {
        where: { id: this.socialActorId }
      });
    }
    return null;
  }
}
