import { Request, Response } from 'express';
import { GetPokemon } from 'src/dtos/pokemon-dtos/get-pokemon.dto';
import { PokemonsService } from '../services/pokemon/pokemons.service';

const pokemonService = new PokemonsService();

export class PokemonController {
  // async findOneByname(request: Request, response: Response) {
  //   try {
  //     const { name } = request.query;
  //     const pokemonFind = await pokemonService.findOneByName(name.toString());
  //     if (pokemonFind === null) {
  //       return response.status(404).send('Pokemon não encontrado');
  //     }
  //     return response.status(200).send(pokemonFind);
  //   } catch (error) {
  //     return response.status(500).send(error);
  //   }
  // }
  async searchPokemon(request: Request, response: Response) {
    try {
      const { name, id_family, is_legendary, is_shiny } = request.query;

      //const { type_list, skip, take } = request.header;
      console.log(request.headers['type-list']);
      const type_list = request.headers['type-list'] || 'LIST';

      let skip = null;
      let take = null;
      if (type_list === 'PAGINATION') {
        skip = request.headers['paginatation-skip'];
        take = request.headers['paginatation-take'];
      }

      const getPokemonDto: GetPokemon = {
        filters: { name, id_family, is_legendary, is_shiny },
        type: type_list,
        skip,
        take,
      };
      const result = await pokemonService.searchPokemons(getPokemonDto);
      //console.log(result);
      return response.status(200).send(result);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
  // async createPokemon(pokemonDto: CreatePokemonDto, response: Response) {
  //   try {
  //     const result = await pokemonService.createPokemons(pokemonDto);
  //     if (result instanceof Error) {
  //       return response.status(400).send({ error: result.message });
  //     }
  //     return response.status(200).send(result);
  //   } catch (error) {
  //     return response.status(500).send({ error: error.message });
  //   }
  // }
}
