import { Component, input, inject, computed } from "@angular/core";
import { ListaProdotti } from "../prodotti.service";
import { RouterLink } from "@angular/router";
import { CartService } from "../carrello/cart.service";

@Component({
  imports: [RouterLink],
  selector: "app-productcard",
  styleUrl: "./productcard.css",
  templateUrl: "./productcard.html",
})
export class Productcard {
  private carrello = inject(CartService);
  proddi = input.required<ListaProdotti>();

  aggiungicarrello(prodotto: ListaProdotti) {
    this.carrello.aggiungiCarrello(prodotto);
  }

  nelCarrello = computed(() =>
    this.carrello.carrello().some((prodotto) => prodotto.prodotto.id === this.proddi().id),
  );
}
