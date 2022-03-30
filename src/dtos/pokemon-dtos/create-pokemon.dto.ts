export interface CreatePokemonDto {
  name: string;

  nm_pokedex: string | null;

  img_name: string | null;

  generation: string | null;

  evolution_stage: string | null;

  envolved: number;

  id_family: string | null;

  spaw: string | null;

  croos_gen: number;

  is_legendary: number;

  is_aquireable: number;

  is_regional: number;

  is_shiny: number;

  is_nest: number;

  is_new: number;

  not_gettable: number;

  future_evolve: number;

  raidable: number;

  hatchable: number;
}
