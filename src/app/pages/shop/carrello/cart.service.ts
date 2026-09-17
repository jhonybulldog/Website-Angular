import { Injectable, signal } from "@angular/core";
import { ListaProdotti } from "../prodotti.service";

export interface ProdottiCarrello {
  prodotto: ListaProdotti;
  quantita: number;
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  carrello = signal<ProdottiCarrello[]>([]);

  
aggiungiCarrello(prodotto: ListaProdotti) {
  this.carrello.update((carrello) => {
    const prodottoEsistente = carrello.find(
      (item) => item.prodotto.id === prodotto.id
    );

    if (prodottoEsistente) {
      return carrello.map((item) => {
        if (item.prodotto.id === prodotto.id) {
          return {
            ...item,
            quantita: item.quantita + 1
          };
        } else {
          return item;
        }
      });
    } else {
      return [
        ...carrello,
        {
          prodotto,
          quantita: 1
        }
      ];
    }
  });
}
  rimuoviCarello(indice: number) {
    this.carrello.update((carrello) => {
      return carrello.filter((_, indiceel) => {
        return indice !== indiceel;
      });
    });
  }

  aumentacarrello(id: number) {
    this.carrello.update((carrello) => {
      return carrello.map((item) => {
        if (item.prodotto.id === id) {
          return {
          ...item,
          quantita: item.quantita + 1
          };
        } else {
          return item;
        }
      });
    });
  }
    diminuiscicarrello(id: number) {
    this.carrello.update((carrello) => {
      return carrello.map((item) => {
        if (item.prodotto.id === id && item.quantita > 1) {
          return {
          ...item,
          quantita: item.quantita - 1
          };
        } else {
          return item;
        }
      });
    });
  }

  svuotacarrello(){
   this.carrello.set([]) 
  }
}
