import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ProdottiService } from "../../service/prodotti.service";
import { ProductDetails, ProductFullDetail } from "../../models/prodotti.model";
import { CartService } from "../../service/cart.service";
import { Minicart } from "../../components/minicart/minicart";
import { LoginService } from "../../../../core/login/service/login.service";
import { ProductFavorite } from "../../service/product-favorite";
import { AsyncPipe, DatePipe, DecimalPipe } from "@angular/common";
import { NotificationService } from "../../../../core/notification/notification-service";
import { map, Observable, switchMap } from "rxjs";
@Component({
  imports: [RouterLink, Minicart, AsyncPipe,DecimalPipe, DatePipe],
  standalone: true,
  selector: "app-productdetail",
  styleUrl: "./productdetail.css",
  templateUrl: "./productdetail.html",
})
export class Productdetail {
  private route = inject(ActivatedRoute);
  private prodottiser = inject(ProdottiService);
  private carrello = inject(CartService);
  private logginser = inject(LoginService);
  private favoritesService = inject(ProductFavorite);
  private notificationser = inject(NotificationService);
  loading$ = this.prodottiser.loading$;
  private productId$: Observable<number> = this.route.paramMap.pipe(
    map((params) => Number(params.get("id"))),
  );
  isFavorite$ = this.productId$.pipe(
    switchMap((id) => this.favoritesService.isfavorite$(id)),
  );
  cartprodotti = this.carrello.carrello;
  ac = signal(false);

  loggedIn = this.logginser.loggedIn;
  newImage = "";
  prodotto$: Observable<ProductFullDetail> = this.productId$.pipe(
  switchMap((id) => this.prodottiser.productdetail(id)),
);
  aggiungicarrello(prodotto: ProductDetails) {
    this.carrello.addToCart(prodotto.id);
  }
  aprichiudi() {
    this.ac.update((aperto) => !aperto);
  }

salva(prodotto: ProductDetails, prezzo: string, descrizione: string) {
  this.prodottiser
    .aggiornaProdotto(prodotto.id, {
      price: Number(prezzo),
      description: descrizione,
      thumbnail: this.newImage || prodotto.thumbnail,
    })
    .subscribe(() => this.notificationser.show("prodotto modificato", false));
}

  toggleFavorite(prodotto: ProductDetails) {
    this.favoritesService.toggle(prodotto);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer!.files[0];
    console.log(event);
    console.log(file);
    if (file.type.startsWith("image/")) {
      this.newImage = URL.createObjectURL(file);
      console.log(this.newImage);
    } else {
      this.notificationser.show("puoi caricare solo immaggini", true);
    }
    const not = inject(NotificationService)
    not.show("ciao", true);
  }

}
