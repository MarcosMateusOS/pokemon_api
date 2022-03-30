import { CombatPoints } from '../../entities/pokemon-cp.entity';
import { AppDataSource } from '../../database/connection';

export const PokemonCpRepository = AppDataSource.getRepository(
  CombatPoints,
).extend({});
