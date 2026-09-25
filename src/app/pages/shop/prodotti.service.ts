import { Injectable, signal, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
export interface ListaProdotti {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
}
export interface Category {
  slug: string;
  name: string;
}

@Injectable({
  providedIn: "root",
})
export class Prodotti {
  private nextid = 1;
  private http = inject(HttpClient);
  prod = signal<ListaProdotti[]>([]);
  categorianuove = signal<string[]>([]);
  categorie = signal<Category[]>([]);
  totaleProdotti = signal(0);
  private url = "https://dummyjson.com/products/";
  caricaCategorie() {
    this.http
      .get<Category[]>("https://dummyjson.com/products/categories")
      .subscribe((risposta) => {
        this.categorie.set(risposta);
      });
  }
  caricaProdotti(limit: number, skip: number, categoria: string = "") {
    let url = this.url;
    if (categoria) {
      url = `${this.url}category/${categoria}`;
    }
    this.http
      .get<{ products: ListaProdotti[]; total: number }>(url, {
        params: {
          limit: limit,
          skip: skip,
        },
      })
      .subscribe((risposta) => {
        this.prod.set(risposta.products);
        this.totaleProdotti.set(risposta.total);
      });
  }

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

  aggiungicategoria(categoria: string) {
    this.categorianuove.set([...this.categorianuove(), categoria]);
  }
  eliminacategoria(categoria: string) {
    this.categorianuove.update((categorie) =>
      categorie.filter((c) => c !== categoria),
    );
  }
  modificacategoria(categoriaVecchia: string, categoriaNuova: string) {
    this.categorianuove.update((categorie) =>
      categorie.map((categoria) =>
        categoria === categoriaVecchia ? categoriaNuova : categoria,
      ),
    );
  }
}
