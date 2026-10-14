import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ProductDetails, Prodotti } from "../prodotti.service";
import { CartService } from "../carrello/cart.service";
import { Minicart } from "../minicart/minicart";
import { LoginService } from "../../admin/login/login.service";
import { ProductFavorite } from "../product-favorite";
import { AsyncPipe } from "@angular/common";
import { NotificationService } from "../notification/notification-service";
import { map, switchMap } from "rxjs";
@Component({
  imports: [RouterLink, Minicart, AsyncPipe],
  standalone: true,
  selector: "app-productdetail",
  styleUrl: "./productdetail.css",
  templateUrl: "./productdetail.html",
})
export class Productdetail implements OnInit {
  private route = inject(ActivatedRoute);
  private prodottiser = inject(Prodotti);
  private carrello = inject(CartService);
  private logginser = inject(LoginService);
  private favoritesService = inject(ProductFavorite);
  private notificationser = inject(NotificationService);
  private productId$ = this.route.paramMap.pipe(map(params => Number(params.get("id"))))
  isFavorite$ = this.productId$.pipe(
     switchMap(id => this.favoritesService.isfavorite$(id))
   );
  cartprodotti = this.carrello.carrello;
  ac = signal(false)
  prodotto = signal<ProductDetails>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    thumbnail: "",
    category: "",
    rating: 0,
  });
  loggedIn = this.logginser.loggedIn;
  aggiungicarrello(prodotto: ProductDetails) {
this.carrello.addToCart(prodotto.id);
  }
    aprichiudi() {
    this.ac.update((aperto) => !aperto);
  }

  salva(prezzo: string, descrizione: string) {
    const id = this.prodotto().id;
    this.prodottiser
      .aggiornaProdotto(id, {price: Number(prezzo), description: descrizione})
      .subscribe((prodotto) => {
        this.prodotto.set(prodotto);
      });
        this.notificationser.show(`prodotto modificato`);
  }

  toggleFavorite() {
    this.favoritesService.toggle(this.prodotto());
  }
   ngOnInit(): void {
     this.productId$
       .pipe(switchMap(id => this.prodottiser.productdetail(id)))
       .subscribe(prodotto => this.prodotto.set(prodotto));
   }
}
