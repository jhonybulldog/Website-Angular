import { Injectable, signal } from "@angular/core";
import { ProdottiCarrello } from "./carrello/cart.service";

export interface ordine {
  id: number;
  data: string;
  prodotti: ProdottiCarrello[];
  totale: number;
  indirizzo: string;
  metodoPagamento: string;
}

@Injectable({
  providedIn: "root",
})
export class OrdiniService {
  ordini = signal<ordine[]>([]);

  constructor() {
    const ordiniSalvati = localStorage.getItem("ordini");

    if (ordiniSalvati) {
      this.ordini.set(JSON.parse(ordiniSalvati));
    }
  }

  salvaOrdine(ordine: ordine) {
    this.ordini.update((ordini) => {
      const nuoviOrdini = [...ordini, ordine];

      localStorage.setItem("ordini", JSON.stringify(nuoviOrdini));

      return nuoviOrdini;
    });
  }
}