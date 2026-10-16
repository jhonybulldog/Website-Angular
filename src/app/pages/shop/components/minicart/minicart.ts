import { Component, inject, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CartService } from "../../service/cart.service";
import { AsyncPipe, DecimalPipe } from "@angular/common";

@Component({
  imports: [RouterLink, AsyncPipe, DecimalPipe],
  selector: "app-minicart",
  styleUrl: "./minicart.css",
  templateUrl: "./minicart.html",
})
export class Minicart {
  private carrello = inject(CartService);
  cart$ = this.carrello.cart$;
  mostraBottoneVaiAlCarrello = input<boolean>(true);

  rimuoviCarello(id: number) {
    this.carrello.remove(id);
  }

  aumentaquantita(id: number) {
    this.carrello.increase(id);
  }

  diminuiscicarrell(id: number) {
    this.carrello.decrease(id);
  }
}