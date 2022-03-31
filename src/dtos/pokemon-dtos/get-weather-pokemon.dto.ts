export class GetWeatherPokemon {
  filters?: {
    weather?: any;
    list_pokemons?: any;
  };
  type_list: string | string[];
  skip: string | string[] | null;
  take: string | string[] | null;
}
