import { Injectable } from "@angular/core"; 
import { BehaviorSubject, map, Observable } from "rxjs";
import { ProductDetails } from "./prodotti.service";
@Injectable({providedIn: "root"})
export class ProductFavorite {
  private favorites = new BehaviorSubject<ProductDetails[]>([]);
  favorites2$ = this.favorites.asObservable();

  toggle(product: ProductDetails
  ) {
    const current = this.favorites.value;

    const exists = current.some((p) => p.id === product.id);
    if (exists) {
      this.favorites.next(current.filter((p) => p.id !== product.id));
      console.log("prodotto tolto")
    } else {
      this.favorites.next([...current, product]);
      console.log("prodotto aggiunto")
    }
  }

  isfavorite$(id: number): Observable<boolean>{
    return this.favorites2$.pipe( map((list) => list.some((p)=> p.id === id)))
  }
}
