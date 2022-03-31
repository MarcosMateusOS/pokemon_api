import { IsEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CombatPoints } from './pokemon-cp.entity';
import { PokemonStats } from './pokemon-stats.entity';
import { PokemonTypes } from './pokemon-type.entity';
import { PokemonWeather } from './pokemon-weather.entity';

@Entity('pokemons')
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string | null;

  @Column({ nullable: true, default: 0 })
  nm_pokedex: string | null;

  @Column({ nullable: true, default: 0 })
  img_name: string | null;

  @Column({ nullable: true, default: 0 })
  generation: string | null;

  @Column({ nullable: true, default: 0 })
  evolution_stage: string | null;

  @Column({ nullable: true, default: 0 })
  envolved: number;

  @Column({ nullable: true, default: 0 })
  id_family: string | null;

  @Column({ nullable: true, default: 0 })
  spawn: string | null;

  @Column({ nullable: true, default: 0 })
  croos_gen: number;

  @Column({ nullable: true, default: 0 })
  is_legendary: number;

  @Column({ nullable: true, default: 0 })
  is_aquireable: number;

  @Column({ nullable: true, default: 0 })
  is_regional: number;

  @Column({ nullable: true, default: 0 })
  is_shiny: number;

  @Column({ nullable: true, default: 0 })
  is_nest: number;

  @Column({ nullable: true, default: 0 })
  is_new: number;

  @Column({ nullable: true, default: 0 })
  not_gettable: number;

  @Column({ nullable: true, default: 0 })
  future_evolve: number;

  @Column({ nullable: true, default: 0 })
  raidable: number;

  @Column({ nullable: true, default: 0 })
  hatchable: number;

  @OneToOne(() => PokemonStats)
  @JoinColumn()
  stats: PokemonStats;

  @OneToOne(() => CombatPoints)
  @JoinColumn()
  cp_max: CombatPoints;

  @OneToOne(() => CombatPoints)
  @JoinColumn()
  cp_min: CombatPoints;

  @ManyToOne(() => PokemonWeather)
  @JoinColumn()
  weather: PokemonWeather;

  @ManyToOne(() => PokemonWeather)
  @JoinColumn()
  sub_weather: PokemonWeather;

  @ManyToOne(() => PokemonTypes)
  @JoinColumn()
  type: PokemonTypes;

  @ManyToOne(() => PokemonTypes)
  @JoinColumn()
  sub_type: PokemonTypes;
}
