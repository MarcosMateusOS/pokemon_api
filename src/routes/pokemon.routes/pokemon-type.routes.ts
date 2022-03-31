import { Router } from 'express';
const PokemonTypeRoutes = Router();

/**Controller do Pokemon Weather*/
import { PokemonTypeController } from '../../controllers/pokemon-type.controller';
const pokemonTypeController = new PokemonTypeController();

/**Rota de listagem de pokemons */
PokemonTypeRoutes.get('/search', pokemonTypeController.searchPokemontype);

export { PokemonTypeRoutes };
