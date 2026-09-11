import { Injectable, signal } from "@angular/core";
import { ListaProdotti } from "../prodotti.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  carrello = signal<ListaProdotti[]>([]);

  aggiungiCarrello(prodotto: ListaProdotti) {
    this.carrello.update((carrello) => {
      return [...carrello, prodotto]; // ... servono per spacchettare gli elementi di un array
    });
  }
  rimuoviCarello(indice: number) {
    this.carrello.update((carrello) => {
      return carrello.filter((_ , indiceel) => {
        return indice !== indiceel;
      });
    });
  }
}
