import { Router } from 'express';
const PokemonRoutes = Router();

/**Controller do Pokemon */
import { PokemonController } from '../../controllers/pokemon.controller';
const pokemonController = new PokemonController();

/**Rota de listagem de pokemons */
PokemonRoutes.get('/search', pokemonController.searchPokemon);

export { PokemonRoutes };
