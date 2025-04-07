import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-pricing',
  imports: [],
  templateUrl: './pricingPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit{

  private title = inject(Title);
  private meta = inject(Meta);
  private plataForm = inject(PLATFORM_ID)
  ngOnInit(): void {
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({name: 'description', content: 'Este es mi Pricing Page'});
  }
}
