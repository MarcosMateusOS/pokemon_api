import { GetPokemon } from '../../dtos/pokemon-dtos/get-pokemon.dto';
import { AppDataSource } from '../../database/connection';
import { Pokemon } from '../../entities/pokemon.entity';

export const PokemonRepository = AppDataSource.getRepository(Pokemon).extend({
  async findOneByName(name: string) {
    return await this.createQueryBuilder('pokemons')
      .where('pokemons.name = :name', { name })
      .getOne();
  },

  async search(getPokemon: GetPokemon) {
    try {
      const {
        name,
        is_legendary,
        is_shiny,
        weather,
        sub_weather,
        type,
        sub_type,
      } = getPokemon.filters;
      const { type_list, skip, take } = getPokemon;

      const queryPokemon = this.createQueryBuilder('pokemons')
        .leftJoinAndSelect('pokemons.stats', 'stats')
        .leftJoinAndSelect('pokemons.cp_max', 'cp_max')
        .leftJoinAndSelect('pokemons.cp_min', 'cp_min')
        .leftJoinAndSelect('pokemons.type', 'type')
        .leftJoinAndSelect('pokemons.sub_type', 'sub_type')
        .leftJoinAndSelect('pokemons.weather', 'weather')
        .leftJoinAndSelect('pokemons.sub_weather', 'sub_weather');

      if (typeof name !== 'undefined' && name !== null) {
        queryPokemon.where('pokemons.name = :name', { name });
      }

      if (typeof is_legendary !== 'undefined' && is_legendary !== null) {
        queryPokemon.where('pokemons.is_legendary = :is_legendary', {
          is_legendary,
        });
      }

      if (typeof is_shiny !== 'undefined' && is_shiny !== null) {
        queryPokemon.where('pokemons.is_shiny = :is_shiny', {
          is_shiny,
        });
      }

      if (typeof type !== 'undefined' && type !== null) {
        console.log(type);
        queryPokemon.where('pokemons.type = :type', {
          type,
        });
      }

      if (typeof sub_type !== 'undefined' && sub_type !== null) {
        queryPokemon.where('pokemons.sub_type = :sub_type', {
          sub_type,
        });
      }

      if (typeof weather !== 'undefined' && weather !== null) {
        queryPokemon.where('pokemons.weather = :weather', {
          weather,
        });
      }

      if (typeof sub_weather !== 'undefined' && sub_weather !== null) {
        queryPokemon.where('pokemons.sub_weather = :sub_weather', {
          sub_weather,
        });
      }

      if (type_list === 'PAGINATION') {
        queryPokemon.skip(Number(skip)).take(Number(take));
      }

      const pokemons = await queryPokemon.orderBy('pokemons.id').getMany();

      // await this.createQueryBuilder('pokemons')
      //   .distinctOn(['pokemons.id'])
      //   .leftJoinAndSelect('pokemons.stats', 'stats');

      return pokemons;
    } catch (error) {}
  },
});
