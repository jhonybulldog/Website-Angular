import { Component, computed, input, signal } from "@angular/core";
import { ListaProdotti } from "../prodotti.service";
import { Productcard } from "../productcard/productcard";
import { LimitSelector } from "../../shared/limit-selector/limit-selector";
import { Pagination } from "../../shared/pagination/pagination";

@Component({
  imports: [Productcard, LimitSelector, Pagination],
  selector: "app-productlist",
  styleUrl: "./productlist.css",
  templateUrl: "./productlist.html",
})
export class Productlist {
  prodotti = input.required<ListaProdotti[]>();

  paginaCorrente = signal(1);
  limit = signal(21);

  numeroPagine = computed(() =>
    Math.ceil(this.prodotti().length / this.limit()),
  );

  prodottiPagina = computed(() => {
    const skip = (this.paginaCorrente() - 1) * this.limit();
    return this.prodotti().slice(skip, skip + this.limit());
  });

  caricaPagina(pagina: number) {
    this.paginaCorrente.set(pagina);
  }
}