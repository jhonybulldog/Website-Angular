import { Component, inject, computed } from "@angular/core";
import { CartService } from "./cart.service";
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: "app-carrello",
  styleUrl: "./carrello.css",
  templateUrl: "./carrello.html",
})
export class Carrello {
  private carelloser = inject(CartService);

  prodotti = this.carelloser.carrello;

    
  totale =  computed(() => this.prodotti().reduce((totale, prodotto) => {
    return totale + prodotto.prodotto.price * prodotto.quantita;
    
}, 0));

  rimuoviCarello(indice: number) {
    this.carelloser.rimuoviCarello(indice);
  }

  aumentaquantita(id: number){
    this.carelloser.aumentacarrello(id);
  }

  diminuiscicarrell(id: number){
    this.carelloser.diminuiscicarrello(id);
  }
}
