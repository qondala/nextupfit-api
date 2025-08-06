import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: "date", nullable: true })
  birthDate: Date;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column({ nullable: true })
  coverImageUrl: string;

  @Column({ type: "boolean", nullable: true, default: false })
  isEmailVerified: boolean;

  @Column({ type: "timestamp", nullable: true })
  lastLogin: Date;

  @Column({ type: "bigint", nullable: true, default: 1 })
  managerAccountId: number;

  @Column({ type: "integer", nullable: true, default: 1 })
  privilegeLevel: number;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  gender: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
