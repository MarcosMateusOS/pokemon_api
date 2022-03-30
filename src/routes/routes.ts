import { Router } from 'express';
import multer from 'multer';
import { PokemonController } from '../controllers/pokemon.controller';
import { FileController } from '../controllers/file.controller';
import { uploadFile } from '../middlewares/upload.middleware';

const pokemonController = new PokemonController();
const fileController = new FileController();

const routes = Router();
routes.get('/', () => {
  console.log('Teste home');
});

routes.post(
  '/upload',
  // #swagger.tags = ['UploadFile']
  // #swagger.description = 'Endpoint para fazer o upload do arquivo e armazenar no banco'
  multer(uploadFile.getConfig).single('file'),
  fileController.uploadFile,
);

routes.get('/pokemons', pokemonController.searchPokemon);

export { routes };
