import { Component, Injectable, inject } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { ProductDetails } from "./prodotti.service";
import { NotificationService } from "./notification/notification-service";
@Injectable({ providedIn: "root" })
export class ProductFavorite {
  private favorites = new BehaviorSubject<ProductDetails[]>(
    JSON.parse(localStorage.getItem("favorites") ?? "[]"),
  );
  favorites2$ = this.favorites.asObservable();
  private notificationser = inject(NotificationService);

  toggle(product: ProductDetails) {
    const current = this.favorites.value;

    const exists = current.some((p) => p.id === product.id);
    if (exists) {
      this.favorites.next(current.filter((p) => p.id !== product.id));
      this.notificationser.show(`prodotto tolto dai preferiti`);
    } else {
      this.favorites.next([...current, product]);
      this.notificationser.show(`prodotto aggiunto  hai preferiti`);
    }
    localStorage.setItem("favorites", JSON.stringify(this.favorites.value));
  }

  isfavorite$(id: number): Observable<boolean> {
    return this.favorites2$.pipe(map((list) => list.some((p) => p.id === id)));
  }
}
