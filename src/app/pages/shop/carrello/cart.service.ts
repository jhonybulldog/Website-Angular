import { inject, Injectable, signal } from "@angular/core";
import { ProductDetails } from "../prodotti.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

export interface ProdottiCarrello {
  prodotto: ProductDetails;
  quantita: number;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  total: number;
  products: CartProduct[];
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  carrello = signal<ProdottiCarrello[]>([]);
  private http = inject(HttpClient);
  private url = "https://dummyjson.com/carts/1";
  private cart = new BehaviorSubject<Cart>({ id: 1, total: 0, products: [] });
  cart$ = this.cart.asObservable();

  constructor() {
    this.loadCart();
  }

  loadCart() {
    this.http.get<Cart>(this.url).subscribe((risposta) => {
      this.cart.next(risposta);
    });
  }

  private updateCart(products: { id: number; quantity: number }[]) {
    this.http
      .put<Cart>(this.url, {
        products: products.map((p) => ({ id: p.id, quantity: p.quantity })),
      })
      .subscribe((risposta) => {
        this.cart.next(risposta);
      });
  }

  addToCart(id: number) {
    const products = this.cart.value.products;
    if (products.some((p) => p.id === id)) {
      this.increase(id);
    } else {
      this.updateCart([...products, { id: id, quantity: 1 }]);
    }
  }

  increase(id: number) {
    const products = this.cart.value.products;
    this.updateCart(
      products.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)),
    );
  }

  decrease(id: number) {
    const products = this.cart.value.products;
    this.updateCart(
      products.map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p)),
    );
  }

  remove(id: number) {
    const products = this.cart.value.products;
    this.updateCart(products.filter((p) => p.id !== id));
  }

  svuotacarrello() {
    this.carrello.set([]);
  }
}