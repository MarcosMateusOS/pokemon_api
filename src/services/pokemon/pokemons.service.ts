//Entities
import { Pokemon } from 'src/entities/pokemon.entity';

//Repositories
import { PokemonRepository } from '../../repositories/pokemon.repositories/pokemon.repository';
import { PokemonStatsRepository } from '../../repositories/pokemon.repositories/pokemon-stats.repository';

//Dtos
import { SavePokemonStatsDto } from '../../dtos/pokemon-dtos/save-pokemon-stats.dto';
import { SavePokemonCpDto } from '../../dtos/pokemon-dtos/save-pokemon-cp.dto';
import { CreatePokemonDto } from '../../dtos/pokemon-dtos/create-pokemon.dto';
import { PokemonCpRepository } from '../../repositories/pokemon.repositories/pokemon-cp.repository';
import { IError } from '../../interfaces/error.interface';
import { GetPokemon } from 'src/dtos/pokemon-dtos/get-pokemon.dto';

export class PokemonsService {
  async createPokemons(
    createPokemonDto: CreatePokemonDto,
    savedPokemonStats: SavePokemonStatsDto,
    savePokemonCpMax: SavePokemonCpDto,
    savePokemonCpMin: SavePokemonCpDto,
  ): Promise<Pokemon | Error> {
    const { name } = createPokemonDto;

    if (await PokemonRepository.findOneByName(name)) {
      return new Error(`O ${name} já está cadastrado`);
    }

    const stats = await PokemonStatsRepository.save(savedPokemonStats);
    const combatPointMax = await PokemonCpRepository.save(savePokemonCpMax);
    const combatPointMin = await PokemonCpRepository.save(savePokemonCpMin);

    return await PokemonRepository.save({
      ...createPokemonDto,
      stats,
      cp_max: combatPointMax,
      cp_min: combatPointMin,
    });
  }

  async findOneByName(name: string): Promise<Pokemon> {
    return await PokemonRepository.findOneByName(name);
  }

  async searchPokemons(getPokemonDto: GetPokemon): Promise<Pokemon[]> {
    return await PokemonRepository.search(getPokemonDto);
  }
}
