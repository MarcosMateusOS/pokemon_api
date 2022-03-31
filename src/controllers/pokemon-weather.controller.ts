import { Request, Response } from 'express';
import { GetWeatherPokemon } from '../../src/dtos/pokemon-dtos/get-weather-pokemon.dto';
import { PokemonWeatherService } from '../services/pokemon/pokemon-weather.service';

const pokemonWeatherService = new PokemonWeatherService();

export class PokemonWeatherController {
  async searchPokemonWeather(request: Request, response: Response) {
    try {
      const { weather, list_pokemons } = request.query;

      const type_list = request.headers['type-list'] || 'LIST';

      let skip = null;
      let take = null;
      if (type_list === 'PAGINATION') {
        skip = request.headers['paginatation-skip'];
        take = request.headers['paginatation-take'];
      }

      const getWeatherPokemonDto: GetWeatherPokemon = {
        filters: {
          weather,
          list_pokemons,
        },
        type_list: type_list,
        skip,
        take,
      };
      const result = await pokemonWeatherService.search(getWeatherPokemonDto);

      if (result.length === 0) {
        return response.status(201).send('Nenhum dado foi encontrado');
      }

      return response.status(200).send(result);
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }
}
