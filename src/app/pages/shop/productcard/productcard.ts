import { Component, input, inject } from "@angular/core";
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
  private carrello = inject(CartService)
  proddi = input.required<ListaProdotti>();
  

    aggiungicarrello(prodotto: ListaProdotti){
    this.carrello.aggiungiCarrello(prodotto)
  }
}
