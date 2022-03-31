import { Router } from 'express';
const PokemonWeatherRoutes = Router();

/**Controller do Pokemon Weather*/
import { PokemonWeatherController } from '../../controllers/pokemon-weather.controller';
const pokemonWeatherController = new PokemonWeatherController();

/**Rota de listagem de pokemons */
PokemonWeatherRoutes.get(
  '/search',
  pokemonWeatherController.searchPokemonWeather,
);

export { PokemonWeatherRoutes };
