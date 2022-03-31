import { PokemonWeather } from '../../entities/pokemon-weather.entity';
import { AppDataSource } from '../../database/connection';
import { GetWeatherPokemon } from '../../dtos/pokemon-dtos/get-weather-pokemon.dto';
export const PokemonWeatherRepository = AppDataSource.getRepository(
  PokemonWeather,
).extend({
  async findType(weather: string) {
    return await this.createQueryBuilder('pokemon_weather')
      .where('pokemon_weather.weather = :weather', { weather })
      .getOne();
  },

  async search(getWeatherPokemon: GetWeatherPokemon) {
    try {
      const { weather, list_pokemons } = getWeatherPokemon.filters;
      const { type_list, skip, take } = getWeatherPokemon;

      const queryPokemonWeather = this.createQueryBuilder('pokemon_weather');

      if (typeof weather !== 'undefined' && weather !== null) {
        queryPokemonWeather.where('pokemon_weather.weather = :weather', {
          weather,
        });
      }

      if (typeof list_pokemons !== 'undefined' && list_pokemons !== null) {
        queryPokemonWeather.leftJoinAndSelect(
          'pokemon_weather.pokemons',
          'pokemons',
        );

        queryPokemonWeather.leftJoinAndSelect(
          'pokemon_weather.pokemons_sub',
          'pokemon',
        );
      }

      if (type_list === 'PAGINATION') {
        queryPokemonWeather.skip(Number(skip)).take(Number(take));
      }

      const pokemonWeather = await queryPokemonWeather
        .orderBy('pokemon_weather.id')
        .getMany();

      return pokemonWeather;
    } catch (error) {
      console.log(error.message);
    }
  },
});
