import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { Pokemon, PokemonApiResponse, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon'

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);
    return this.http.get<PokemonApiResponse>(`${this.baseUrl}?offset=${page * 20}&limit=20`)
    .pipe(
      map(resp => {
        const simplePokemons: SimplePokemon[] = resp.results.map( pokemon => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name,
        }))
        return simplePokemons;
      })
    );
  }

  public getPokemonById(value: string): Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.baseUrl}/${value}`)
  }
}
