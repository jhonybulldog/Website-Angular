import { Component, inject, signal} from '@angular/core';
import { Prodotti, ListaProdotti } from './prodotti.service';
import { Productcard } from './productcard/productcard';
import { RouterLink } from "@angular/router";
@Component({
  imports: [Productcard, RouterLink],
  selector: 'app-shop',
  styleUrl: './shop.css',
  templateUrl: './shop.html',
  providers: [Prodotti]
})
export class Shop {

  private prodottiser = inject(Prodotti)
  prodotti = signal<ListaProdotti[]>(this.prodottiser.prod)

}
