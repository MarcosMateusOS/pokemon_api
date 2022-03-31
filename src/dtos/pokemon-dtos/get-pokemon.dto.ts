export class GetPokemon {
  filters?: {
    name?: any;
    id_family?: any;
    is_legendary?: any;
    is_shiny?: any;
    weather?: any;
    sub_weather?: any;
    type?: any;
    sub_type?: any;
  };
  type_list: string | string[];
  skip: string | string[] | null;
  take: string | string[] | null;
}
