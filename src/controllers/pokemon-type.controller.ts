import { Request, Response } from 'express';
import { GetTypePokemon } from '../dtos/pokemon-dtos/get-type-pokemon.dto';
import { PokemonTypeService } from '../services/pokemon/pokemon-type.service';

const pokemonTypeService = new PokemonTypeService();

export class PokemonTypeController {
  async searchPokemontype(request: Request, response: Response) {
    try {
      const { type, list_pokemons } = request.query;

      const type_list = request.headers['type-list'] || 'LIST';

      let skip = null;
      let take = null;
      if (type_list === 'PAGINATION') {
        skip = request.headers['paginatation-skip'];
        take = request.headers['paginatation-take'];
      }

      const getTypePokemonDto: GetTypePokemon = {
        filters: {
          type,
          list_pokemons,
        },
        type_list: type_list,
        skip,
        take,
      };
      const result = await pokemonTypeService.search(getTypePokemonDto);

      if (result.length === 0) {
        return response.status(201).send('Nenhum dado foi encontrado');
      }

      return response.status(200).send(result);
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }
}
