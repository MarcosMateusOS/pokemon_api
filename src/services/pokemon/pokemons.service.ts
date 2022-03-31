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
import { GetPokemon } from '../../dtos/pokemon-dtos/get-pokemon.dto';
import { SavePokemonTypeDto } from '../../dtos/pokemon-dtos/save-pokemon-type.dto';

import { PokemonTypeService } from './pokemon-type.service';
import { PokemonWeatherService } from './pokemon-weather.service';
import { SavePokemonWeatherDto } from 'src/dtos/pokemon-dtos/save-pokemon-weather.dto';

const pokemonTypeService = new PokemonTypeService();
const pokemonWeatherService = new PokemonWeatherService();

export class PokemonsService {
  async createPokemons(
    createPokemonDto: CreatePokemonDto,
    savedPokemonStats: SavePokemonStatsDto,
    savePokemonCpMax: SavePokemonCpDto,
    savePokemonCpMin: SavePokemonCpDto,
    savePokemonType: SavePokemonTypeDto,
    savePokemonWeather: SavePokemonWeatherDto,
    savePokemonSubType: SavePokemonTypeDto | null,
    savePokemonSubWeather: SavePokemonWeatherDto | null,
  ): Promise<Pokemon | Error> {
    const { name } = createPokemonDto;

    if (await PokemonRepository.findOneByName(name)) {
      return new Error(`O ${name} já está cadastrado`);
    }

    const stats = await PokemonStatsRepository.save(savedPokemonStats);

    const combatPointMax = await PokemonCpRepository.save(savePokemonCpMax);
    const combatPointMin = await PokemonCpRepository.save(savePokemonCpMin);

    const pokemonType = await pokemonTypeService.createType(savePokemonType);
    const pokemonSubType =
      savePokemonSubType !== null
        ? await pokemonTypeService.createType(savePokemonSubType)
        : null;

    const pokemonWeather = await pokemonWeatherService.createWeather(
      savePokemonWeather,
    );
    const pokemonSubWeather =
      savePokemonSubWeather !== null
        ? await pokemonWeatherService.createWeather(savePokemonSubWeather)
        : null;

    return await PokemonRepository.save({
      ...createPokemonDto,
      stats,
      cp_max: combatPointMax,
      cp_min: combatPointMin,
      type: pokemonType,
      sub_type: pokemonSubType,
      weather: pokemonWeather,
      sub_weather: pokemonSubWeather,
    });
  }

  async findOneByName(name: string): Promise<Pokemon> {
    return await PokemonRepository.findOneByName(name);
  }

  async searchPokemons(getPokemonDto: GetPokemon): Promise<Pokemon[]> {
    return await PokemonRepository.search(getPokemonDto);
  }
}
