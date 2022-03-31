import { GetTypePokemon } from '../../dtos/pokemon-dtos/get-type-pokemon.dto';
import { AppDataSource } from '../../database/connection';
import { PokemonTypes } from '../../entities/pokemon-type.entity';

export const PokemonTypesRepository = AppDataSource.getRepository(
  PokemonTypes,
).extend({
  async findType(type: string) {
    return await this.createQueryBuilder('pokemon_types')
      .where('pokemon_types.type = :type', { type })
      .getOne();
  },

  async search(getTypePokemon: GetTypePokemon) {
    try {
      const { type, list_pokemons } = getTypePokemon.filters;
      const { type_list, skip, take } = getTypePokemon;

      const queryPokemontype = this.createQueryBuilder('pokemon_types');

      if (typeof type !== 'undefined' && type !== null) {
        queryPokemontype.where('pokemon_types.type = :type', {
          type,
        });
      }

      if (typeof list_pokemons !== 'undefined' && list_pokemons !== null) {
        queryPokemontype.leftJoinAndSelect(
          'pokemon_types.pokemons',
          'pokemons',
        );

        queryPokemontype.leftJoinAndSelect(
          'pokemon_types.pokemons_sub',
          'pokemons',
        );
      }

      if (type_list === 'PAGINATION') {
        queryPokemontype.skip(Number(skip)).take(Number(take));
      }

      const pokemonWeather = await queryPokemontype
        .orderBy('pokemon_types.id')
        .getMany();

      return pokemonWeather;
    } catch (error) {
      console.log(error.message);
    }
  },
});
