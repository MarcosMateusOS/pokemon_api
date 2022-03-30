import { SavePokemonStatsDto } from '../../dtos/pokemon-dtos/save-pokemon-stats.dto';
import { PokemonStats } from '../../entities/pokemon-stats.entity';
import { PokemonStatsRepository } from '../../repositories/pokemon.repositories/pokemon-stats.repository';

export class PokemonStatsService {
  async saveStats(
    savePokemonStatsDto: SavePokemonStatsDto,
  ): Promise<PokemonStats> {
    return await PokemonStatsRepository.save(savePokemonStatsDto);
  }
}
