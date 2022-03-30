export class GetPokemon {
  filters?: {
    name?: any;
    id_family?: any;
    is_legendary?: any;
    is_shiny?: any;
  };
  type: string | string[];
  skip: string | string[] | null;
  take: string | string[] | null;
}
