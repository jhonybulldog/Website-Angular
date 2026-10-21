import { Injectable, signal, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, delay, finalize } from "rxjs";
import { ProductDetails, Category, ProductFullDetail } from "../models/prodotti.model";

@Injectable({
  providedIn: "root",
})
export class ProdottiService {
  private http = inject(HttpClient);

  categorianuove = signal<string[]>([]);
  private url = "https://dummyjson.com/products/";
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  caricaCategorie() {
   return this.http
      .get<Category[]>("https://dummyjson.com/products/categories");
  }
  caricaProdotti(
    limit: number,
    skip: number,
    categoria: string = "",
    research: string = "",
    order: string = "",
    sortBy: string = "",
  ) {
    this.loading.next(true);
    let url = this.url;
    if (research) {
      url = `${this.url}search`;
    } else if (categoria) {
      url = `${this.url}category/${categoria}`;
    }
    return this.http
      .get<{ products: ProductDetails[]; total: number }>(url, {
        params: {
          limit: limit,
          skip: skip,
          q: research,
          sortBy: sortBy,
          order: order,
        },
      }).pipe(delay(1000), finalize(()=> this.loading.next(false)))
  }

  productdetail(id: number) {
    return this.http.get<ProductFullDetail>(`${this.url}${id}`).pipe(delay(1000));
  }
aggiornaProdotto(id: number, modifiche: Partial<ProductDetails>) {
  return this.http.put<ProductDetails>(`${this.url}${id}/awdcrvgybunjmk`, modifiche);
}

  aggiungiProdotto(prodotto: Omit<ProductDetails, "id">) {
  return this.http.post<ProductDetails>(`${this.url}add`, prodotto);
}

eliminaProdotto(id: number) {
  return this.http.delete<ProductDetails>(`${this.url}${id}`);
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
