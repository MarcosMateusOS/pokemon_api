import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('combat_points')
export class CombatPoints {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;
}
