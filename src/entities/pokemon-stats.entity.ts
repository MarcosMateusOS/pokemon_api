import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pokemon_stats')
export class PokemonStats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  stamina: number;

  @Column()
  total_stats: number;
}
