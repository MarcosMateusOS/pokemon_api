import { PokemonTypes } from 'src/entities/PokemonTypes';
import { Repository } from 'typeorm';

export class PokemonTypesRepository extends Repository<PokemonTypes> {
  //async createTypes(createTypes: CreateTypesDto): Promise<PokemonTypes> {}
}
