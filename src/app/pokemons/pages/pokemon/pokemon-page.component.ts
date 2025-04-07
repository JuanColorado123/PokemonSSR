import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonsService } from '../../services/pokemons.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent{
  private activatedRoute = inject(ActivatedRoute);
  private pokemonService = inject(PokemonsService);
  private title = inject(Title);
  private meta = inject(Meta);

  protected pokemonImage = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemonId()}.png`
  })

  protected pokemonId = signal(this.activatedRoute.snapshot.paramMap.get('id') ?? '');

  protected pokemonResource = rxResource({
    request: () => ({ id: this.pokemonId() }),
    loader: ({ request }) => this.pokemonService.getPokemonById(request.id).pipe(
      tap(({name, id}) => {
        const pageTitle = `#${ id } - ${name}`
        const pageDescription = `Pagina del pokemon ${ name }`

        this.title.setTitle(pageTitle);

        this.meta.updateTag({name: 'description', content: pageDescription});
        this.meta.updateTag({name: 'og:title', content: pageTitle});
        this.meta.updateTag({name: 'og:description', content: pageDescription});
        this.meta.updateTag({name: 'og:image', content: this.pokemonImage()});
      })
    )
  })
}
