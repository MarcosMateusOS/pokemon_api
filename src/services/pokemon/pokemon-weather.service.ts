import { PokemonWeather } from '../../entities/pokemon-weather.entity';
import { SavePokemonWeatherDto } from '../../dtos/pokemon-dtos/save-pokemon-weather.dto';
import { GetWeatherPokemon } from '../../dtos/pokemon-dtos/get-weather-pokemon.dto';
import { PokemonWeatherRepository } from '../../repositories/pokemon.repositories/pokemon-weather.repository';

export class PokemonWeatherService {
  async createWeather(
    savePokemonWeather: SavePokemonWeatherDto,
  ): Promise<PokemonWeather> {
    const { weather } = savePokemonWeather;
    let result = await PokemonWeatherRepository.findType(weather);

    if (result === null) {
      result = await PokemonWeatherRepository.save(savePokemonWeather);
    }

    return result;
  }

  async search(
    getWeatherPokemon: GetWeatherPokemon,
  ): Promise<PokemonWeather[]> {
    return await PokemonWeatherRepository.search(getWeatherPokemon);
  }
}
