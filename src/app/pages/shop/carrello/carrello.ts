import { Component, inject, computed } from "@angular/core";
import { CartService } from "./cart.service";

@Component({
  imports: [],
  selector: "app-carrello",
  styleUrl: "./carrello.css",
  templateUrl: "./carrello.html",
})
export class Carrello {
  private carelloser = inject(CartService);

  prodotti = this.carelloser.carrello;

    
  totale =  computed(() => this.prodotti().reduce((totale, prodotto) => {
    return totale + prodotto.prezzo;
  }, 0));

  rimuoviCarello(indice: number) {
    this.carelloser.rimuoviCarello(indice);
  }
}
