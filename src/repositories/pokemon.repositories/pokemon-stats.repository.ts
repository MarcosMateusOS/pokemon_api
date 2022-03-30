import { AppDataSource } from '../../database/connection';
import { PokemonStats } from '../../entities/pokemon-stats.entity';

export const PokemonStatsRepository = AppDataSource.getRepository(
  PokemonStats,
).extend({});
