import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pokemon_types')
export class PokemonTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_type: string;
}
