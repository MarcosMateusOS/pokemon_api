import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity('pokemon_weather')
export class PokemonWeather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weather: string;

  @OneToMany(() => Pokemon, pokemon => pokemon.weather)
  pokemons: [];

  @OneToMany(() => Pokemon, pokemon => pokemon.sub_weather)
  pokemons_sub: [];
}
