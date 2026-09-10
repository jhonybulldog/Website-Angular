import { Component, inject, signal} from '@angular/core';
import { Prodotti, ListaProdotti } from './prodotti.service';
import { Productcard } from './productcard/productcard';
@Component({
  imports: [Productcard],
  selector: 'app-shop',
  styleUrl: './shop.css',
  templateUrl: './shop.html',
  providers: [Prodotti]
})
export class Shop {

  private prodottiser = inject(Prodotti)
  prodotti = signal<ListaProdotti[]>(this.prodottiser.prod)

}
