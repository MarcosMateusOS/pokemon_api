import { PokemonsService } from '../pokemon/pokemons.service';
import { CreatePokemonDto } from '../../dtos/pokemon-dtos/create-pokemon.dto';
import { SavePokemonStatsDto } from '../../dtos/pokemon-dtos/save-pokemon-stats.dto';
import { SavePokemonCpDto } from '../../dtos/pokemon-dtos/save-pokemon-cp.dto';
import { SavePokemonTypeDto } from '../../dtos/pokemon-dtos/save-pokemon-type.dto';
import { SavePokemonWeatherDto } from '../../dtos/pokemon-dtos/save-pokemon-weather.dto';

const readXlsxFile = require('read-excel-file/node');

const pokemonService = new PokemonsService();

export class FileService {
  async saveFileContent(filePath: any, flag: string) {
    try {
      /**Inicio da leitura do arquivo */
      let resultMessage;
      await readXlsxFile(filePath).then(async (rows: any) => {
        rows.shift(); //Pula cabeçalho

        /**Loop da rows do arquivo */
        for (let i = 0; i < rows.length; i++) {
          /**Procedimento tomando de acordo com a flag do arquivo */
          if (flag === 'POKEMON') {
            const pokemon = rows[i];

            //Setando PokemonDto
            const pokemonDto: CreatePokemonDto = {
              name: pokemon[1],
              nm_pokedex: pokemon[2],
              img_name: pokemon[3],
              generation: pokemon[4],
              evolution_stage: pokemon[5],
              envolved: pokemon[6],
              id_family: pokemon[7],
              croos_gen: pokemon[8],
              is_legendary: pokemon[17],
              is_aquireable: pokemon[18],
              spaw: pokemon[19],
              is_regional: pokemon[20],
              raidable: pokemon[21],
              hatchable: pokemon[22],
              is_shiny: pokemon[23],
              is_nest: pokemon[24],
              is_new: pokemon[25],
              not_gettable: pokemon[26],
              future_evolve: pokemon[27],
            };

            //Setando PokemonStatsDto
            const pokemonStatsDto: SavePokemonStatsDto = {
              attack: pokemon[14],
              defense: pokemon[15],
              stamina: pokemon[16],
              total_stats: pokemon[13],
            };

            //Setando PokemonCpDto
            const pokemonCpMax: SavePokemonCpDto = {
              value: pokemon[28],
            };

            const pokemonCpMin: SavePokemonCpDto = {
              value: pokemon[29],
            };

            //Setanto PokemonType
            const pokemonType: SavePokemonTypeDto = {
              type: pokemon[9],
            };
            const pokemonSubType: SavePokemonTypeDto | null =
              pokemon[10] !== null ? { type: pokemon[10] } : null;

            //Setando PokemonWeather
            const pokemonWeather: SavePokemonWeatherDto = {
              weather: pokemon[11],
            };
            const pokemonSubWeather: SavePokemonWeatherDto | null =
              pokemon[12] !== null ? { weather: pokemon[12] } : null;

            const result = await pokemonService.createPokemons(
              pokemonDto,
              pokemonStatsDto,
              pokemonCpMax,
              pokemonCpMin,
              pokemonType,
              pokemonWeather,
              pokemonSubType,
              pokemonSubWeather,
            );

            if (result instanceof Error) {
              resultMessage = {
                status: false,
                message: `Row[${i}] => ${result.message}`,
              };
              return;
            }
          }
        }
        resultMessage = {
          status: true,
          message: `Sucesso`,
        };
      });

      return resultMessage;
    } catch (error) {
      return error;
    }
  }
}
