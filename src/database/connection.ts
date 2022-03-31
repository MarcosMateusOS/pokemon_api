import { Pokemon } from '../entities/pokemon.entity';
import { PokemonStats } from '../entities/pokemon-stats.entity';
import { DataSource } from 'typeorm';
import { CombatPoints } from '../entities/pokemon-cp.entity';
import { PokemonTypes } from '../entities/pokemon-type.entity';
import { PokemonWeather } from '../entities/pokemon-weather.entity';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'pokemon_db',
  entities: [Pokemon, PokemonStats, CombatPoints, PokemonTypes, PokemonWeather],
  migrations: ['src/migration/*.ts'],
  //migrationsRun:true,
  synchronize: true,
});
