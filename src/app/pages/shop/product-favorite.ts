import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { ProductDetails } from "./prodotti.service";
import { NotificationService } from "./notification/notification-service";
export interface FavoriteProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}
@Injectable({ providedIn: "root" })
export class ProductFavorite {
  private favorites = new BehaviorSubject<FavoriteProduct[]>(
    JSON.parse(localStorage.getItem("favorites") ?? "[]"),
  );
  favorites2$ = this.favorites.asObservable();
  private notificationser = inject(NotificationService);

  toggle(product: FavoriteProduct) {
    const current = this.favorites.value;

    const exists = current.some((p) => p.id === product.id);
    if (exists) {
      this.favorites.next(current.filter((p) => p.id !== product.id));
      this.notificationser.show(`prodotto tolto dai preferiti`);
    } else {
      this.favorites.next([
        ...current,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        },
      ]);
      this.notificationser.show(`prodotto aggiunto  hai preferiti`);
    }
    localStorage.setItem("favorites", JSON.stringify(this.favorites.value));
  }

  isfavorite$(id: number): Observable<boolean> {
    return this.favorites2$.pipe(map((list) => list.some((p) => p.id === id)));
  }
}
