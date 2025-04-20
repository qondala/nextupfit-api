import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("program_per_sociology")
export class ProgramPerSociologyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  programId: number;

  @Column()
  baseSociologyId: number;

  @CreateDateColumn()
  createdAt: Date;
}
