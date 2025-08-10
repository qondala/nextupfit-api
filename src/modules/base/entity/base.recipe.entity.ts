import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import {
  BaseRecipeInstructionEntity,
  BaseRecipeItemEntity,
  BaseUnitEntity,
} from ".";

@Entity("base_recipe")
export class BaseRecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  imageUrl?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  code?: string;

  @Column({ type: "integer", default: 1 })
  nbPersons?: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  duration?: number;

  @Column({ type: "integer", default: 0 })
  durationUnitId?: number;

  @Column({ type: "bigint", default: 0 })
  ownerManagerId?: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt?: Date;

  @OneToMany(() => BaseRecipeInstructionEntity, (instruction) => instruction.recipe)
  instructions: BaseRecipeInstructionEntity[];

  @OneToMany(() => BaseRecipeItemEntity, (item) => item.recipe)
  items: BaseRecipeItemEntity[];

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "durationUnitId", referencedColumnName: "id" })
  durationUnit: BaseUnitEntity;
}
