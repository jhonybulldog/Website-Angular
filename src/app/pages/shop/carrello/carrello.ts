import { Component, inject, computed, input } from "@angular/core";
import { CartService } from "./cart.service";
import { RouterLink } from "@angular/router";
import { Minicart } from "../minicart/minicart";
import { AsyncPipe } from "@angular/common";
@Component({
  imports: [RouterLink, Minicart, AsyncPipe],
  selector: "app-carrello",
  styleUrl: "./carrello.css",
  templateUrl: "./carrello.html",
})
export class Carrello {
  private carelloser = inject(CartService);
  cart$ = this.carelloser.cart$

  rimuoviCarello(indice: number) {
    this.carelloser.remove(indice);
  }

  aumentaquantita(id: number){
    this.carelloser.increase(id);
  }

  diminuiscicarrell(id: number){
    this.carelloser.decrease(id);
  }
}
