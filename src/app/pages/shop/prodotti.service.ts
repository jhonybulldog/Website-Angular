import { Injectable, signal } from "@angular/core";

export interface ListaProdotti {
  id: number;
  nome: string;
  desc: string;
  prezzo: number;
  immagine: string;
}

@Injectable({
  providedIn: "root",
})
export class Prodotti {
  private nextid = 1;

  prod = signal<ListaProdotti[]>([]);
  aggiungiProdotto(prodotto: ListaProdotti) {
    prodotto.id = this.nextid;
    this.nextid++;
    this.prod.set([...this.prod(), prodotto]);
  }
  eliminaProdotto(id: number) {
    this.prod.set(this.prod().filter((prodotto) => prodotto.id !== id));
  }

  modificaProdotto(prodottoModificato: ListaProdotti) {
    this.prod.update((lista) =>
      lista.map((p) =>
        p.id === prodottoModificato.id ? prodottoModificato : p,
      ),
    );
  }
}
