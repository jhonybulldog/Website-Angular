import { Component, inject, computed, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CartService } from "../carrello/cart.service";

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: "app-minicart",
  styleUrl: "./minicart.css",
  templateUrl: "./minicart.html",
})
export class Minicart {
  private carrello = inject(CartService);
  cartprodotti = this.carrello.carrello;
  mostraBottoneVaiAlCarrello = input<boolean>(true);
  rimuoviCarello(indice: number) {
    this.carrello.rimuoviCarello(indice);
  }

  aumentaquantita(id: number) {
    this.carrello.aumentacarrello(id);
  }

  diminuiscicarrell(id: number) {
    this.carrello.diminuiscicarrello(id);
  }
  
      totale =  computed(() => this.cartprodotti().reduce((totale, prodotto) => {
    return totale + prodotto.prodotto.price * prodotto.quantita;
    
}, 0));

}
