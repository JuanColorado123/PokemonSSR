import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: ()  => import('./pages/about/about.component')
  },
  {
    path: 'pricing',
    loadComponent: ()  => import('./pages/pricingPage/pricingPage.component')
  },
  {
    path: 'contact',
    loadComponent: ()  => import('./pages/contact/contact.component')
  },
  {
    path: 'pokemons',
    loadComponent: () => import('./pokemons/pages/pokemons/pokemons-page.component'),

  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pokemons/pages/pokemon/pokemon-page.component')
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];
