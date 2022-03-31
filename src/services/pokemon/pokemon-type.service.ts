import { PokemonTypes } from '../../entities/pokemon-type.entity';
import { SavePokemonTypeDto } from '../../dtos/pokemon-dtos/save-pokemon-type.dto';
import { PokemonTypesRepository } from '../../repositories/pokemon.repositories/pokemon-type.repository';
import { GetTypePokemon } from 'src/dtos/pokemon-dtos/get-type-pokemon.dto';

export class PokemonTypeService {
  async createType(
    savePokemonTypeDto: SavePokemonTypeDto,
  ): Promise<PokemonTypes> {
    const { type } = savePokemonTypeDto;
    let result = await PokemonTypesRepository.findType(type);

    if (result === null) {
      result = await PokemonTypesRepository.save(savePokemonTypeDto);
    }

    return result;
  }

  async search(getTypePokemon: GetTypePokemon): Promise<PokemonTypes[]> {
    return await PokemonTypesRepository.search(getTypePokemon);
  }
}
