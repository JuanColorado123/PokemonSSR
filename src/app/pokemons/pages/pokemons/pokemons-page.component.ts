import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PokemonsService } from '../../services/pokemons.service';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';



@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent{

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  private pokemonsService = inject(PokemonsService);
  private pageToLoad = signal<number>(0);

  protected currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
    map((params) => params.get('page') ?? '1'),
    map((page) => (isNaN(+page) ? 1 : +page)),
    map((page) => Math.max(1, page))
  ));


  protected pokemonsResource = rxResource({
    request: () => ({page: this.pageToLoad()}),
    loader: ({request}) => this.pokemonsService.loadPage(request.page!).pipe(
      tap(() => this.router.navigate([], {queryParams: {page: this.pageToLoad()}})),
      tap(() => this.title.setTitle(`Pokemon - Page ${this.pageToLoad()}`))
    )
  });

  pokemonPagination(page: number){
    this.pageToLoad.set(this.currentPage()! + page);
  }

  pokemonReloadEffect = effect(() => {
    this.pageToLoad.set(this.currentPage()!);
  });
}
