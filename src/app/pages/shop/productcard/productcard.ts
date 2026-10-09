import { Component, input, inject, computed, OnInit } from "@angular/core";
import { ProductDetails } from "../prodotti.service";
import { RouterLink } from "@angular/router";
import { CartService } from "../carrello/cart.service";
import { LoginService } from "../../admin/login/login.service";
import { ProductFavorite } from "../product-favorite";
import { AsyncPipe } from "@angular/common";
import { Observable } from "rxjs";
@Component({
  imports: [RouterLink, AsyncPipe],
  selector: "app-productcard",
  styleUrl: "./productcard.css",
  templateUrl: "./productcard.html",
})
export class Productcard implements OnInit {
  private carrello = inject(CartService);
  proddi = input.required<ProductDetails>();
  private logginser = inject(LoginService);
  loggedIn = this.logginser.loggedIn;
  favoritesService = inject(ProductFavorite);
  isfavorite$!: Observable<boolean>;

  aggiungicarrello(prodotto: ProductDetails) {
    this.carrello.aggiungiCarrello(prodotto);
  }
  toggleFavorite() {
    this.favoritesService.toggle(this.proddi());
  }
  nelCarrello = computed(() =>
    this.carrello
      .carrello()
      .some((prodotto) => prodotto.prodotto.id === this.proddi().id),
  );
  ngOnInit() {
    this.isfavorite$ = this.favoritesService.isfavorite$(this.proddi().id);
  }
}
