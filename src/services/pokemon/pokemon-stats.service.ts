import { SavePokemonCpDto } from 'src/dtos/pokemon-dtos/save-pokemon-cp.dto';
import { CombatPoints } from '../../entities/pokemon-cp.entity';
import { PokemonCpRepository } from '../../repositories/pokemon.repositories/pokemon-cp.repository';

export class PokemonStatsService {
  async saveStats(savePokemonCpDto: SavePokemonCpDto): Promise<CombatPoints> {
    return await PokemonCpRepository.save(savePokemonCpDto);
  }
}
