import { Request, Response } from 'express';
import { GetPokemon } from 'src/dtos/pokemon-dtos/get-pokemon.dto';
import { PokemonsService } from '../services/pokemon/pokemons.service';

const pokemonService = new PokemonsService();

export class PokemonController {
  async searchPokemon(request: Request, response: Response) {
    /**Metodode listagem de pokemon, com filtros e paginação */
    try {
      const {
        name,
        id_family,
        is_legendary,
        is_shiny,
        weather,
        sub_weather,
        type,
        sub_type,
      } = request.query;

      const type_list = request.headers['type-list'] || 'LIST';

      let skip = null;
      let take = null;
      if (type_list === 'PAGINATION') {
        skip = request.headers['paginatation-skip'];
        take = request.headers['paginatation-take'];
      }

      const getPokemonDto: GetPokemon = {
        filters: {
          name,
          id_family,
          is_legendary,
          is_shiny,
          weather,
          sub_weather,
          type,
          sub_type,
        },
        type_list: type_list,
        skip,
        take,
      };
      const result = await pokemonService.searchPokemons(getPokemonDto);

      if (result.length === 0) {
        return response.status(201).send('Nenhum dado foi encontrado');
      }

      return response.status(200).send(result);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
