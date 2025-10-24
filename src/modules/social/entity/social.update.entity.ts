import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  authorManager?: GymManagerEntity;
  authorUser?: UserEntity;
  authorGym?: GymEntity;

  @OneToMany(
    () => SocialUpdateInterestEntity,
    (interest) => interest.update,
  )
  interests: SocialUpdateInterestEntity[];

  // Helper method to get gym if socialActorType is 'gym'
  async loadGymIfApplicable(entityManager: EntityManager): Promise<void> {
    if (this.socialActorType === SocialActorEnum.gym) {
      this.authorGym = await entityManager.findOne(GymEntity, {
        where: { id: this.socialActorId }
      });
    }
  }

  // Helper method to get user if socialActorType is 'user'
  async loadUserIfApplicable(entityManager: EntityManager): Promise<void> {
    if (this.socialActorType === SocialActorEnum.user) {
      this.authorUser = await entityManager.findOne(UserEntity, {
        where: { id: this.socialActorId }
      });
    }
  }

  // Helper method to get manager if socialActorType is 'manager'
  async loadManagerIfApplicable(entityManager: EntityManager): Promise<void> {
    if (this.socialActorType === SocialActorEnum.manager) {
      this.authorManager = await entityManager.findOne(GymManagerEntity, {
        where: { id: this.socialActorId }
      });
    }
  }

  loadApplicableData(entityManager: EntityManager): Promise<void> {
    switch (this.socialActorType) {
      case SocialActorEnum.gym:
        this.loadGymIfApplicable(entityManager);
      case SocialActorEnum.user:
        this.loadUserIfApplicable(entityManager);
      case SocialActorEnum.manager:
        this.loadManagerIfApplicable(entityManager);
      default:
        return;
    }
  }
}
