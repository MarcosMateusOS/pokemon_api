import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';
import { AppDataSource } from './database/connection';
import { FileRoutes } from './routes/file.routes/file.routes';
import { PokemonRoutes } from './routes/pokemon.routes/pokemon.routes';
import { PokemonWeatherRoutes } from './routes/pokemon.routes/pokemon-weather.routes';
import { PokemonTypeRoutes } from './routes/pokemon.routes/pokemon-type.routes';
dotenv.config();

const PORT = process.env.NODE_DOCKER_PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**Inicializa rotas */
app.use('/files', FileRoutes);
app.use('/pokemons', PokemonRoutes);
app.use('/pokemon_weather', PokemonWeatherRoutes);
app.use('/pokemon_types', PokemonTypeRoutes);

/**Inicializa ORM com banco */
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized!');
  })
  .catch(error => {
    console.log('Error Data Source => ', error);
  });

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
