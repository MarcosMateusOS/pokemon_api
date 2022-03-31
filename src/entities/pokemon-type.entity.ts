import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pokemon } from './pokemon.entity';
@Entity('pokemon_types')
export class PokemonTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(() => Pokemon, pokemon => pokemon.type)
  pokemons: [];

  @OneToMany(() => Pokemon, pokemon => pokemon.sub_type)
  pokemons_sub: [];
}
