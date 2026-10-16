import { Component, inject, computed, input } from "@angular/core";
import { CartService } from "../../service/cart.service";
import { RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { Minicart } from "../../components/minicart/minicart";
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
