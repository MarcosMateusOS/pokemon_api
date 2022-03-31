export class GetTypePokemon {
  filters?: {
    type?: any;
    list_pokemons?: any;
  };
  type_list: string | string[];
  skip: string | string[] | null;
  take: string | string[] | null;
}
