import { Injectable, signal, inject, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
export interface ListaProdotti {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
}

@Injectable({
  providedIn: "root",
})
export class Prodotti {
  private nextid = 1;
  private http = inject(HttpClient);

  caricaProdotti() {
    this.http.get<{products: ListaProdotti[];}>("https://dummyjson.com/products?limit=0")
      .subscribe((risposta) => {
        this.prod.set(risposta.products);
        this.nextid =
          Math.max(...this.prod().map((prodotto) => prodotto.id)) + 1;
          console.log(this.prod)
      });
  }
  prod = signal<ListaProdotti[]>([]);
  aggiungiProdotto(prodotto: ListaProdotti) {
    prodotto.id = this.nextid;
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
