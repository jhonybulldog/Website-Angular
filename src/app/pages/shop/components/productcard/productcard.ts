import { Component, input, inject, computed, OnInit } from "@angular/core";
import { ProductDetails } from "../../models/prodotti.model";
import { RouterLink } from "@angular/router";
import { CartService } from "../../service/cart.service";
import { LoginService } from "../../../../core/login/service/login.service";
import { ProductFavorite } from "../../service/product-favorite";
import { AsyncPipe } from "@angular/common";
import { Observable } from "rxjs";
import { CompareService } from "../../service/compare-service";
@Component({
  imports: [RouterLink, AsyncPipe],
  selector: "app-productcard",
  styleUrl: "./productcard.css",
  templateUrl: "./productcard.html",
})
export class Productcard implements OnInit {
  proddi = input.required<ProductDetails>();
  private carrello = inject(CartService);
  private logginser = inject(LoginService);
  private compareSer = inject(CompareService);
  private favoritesService = inject(ProductFavorite);
  loggedIn = this.logginser.loggedIn;
  compareActive$ = this.compareSer.active$;
  isfavorite$!: Observable<boolean>;
  isCompare$!: Observable<boolean>;
  aggiungicarrello(prodotto: ProductDetails) {
this.carrello.addToCart(prodotto.id);
  }
  toggleFavorite() {
    this.favoritesService.toggle(this.proddi());
  }
  nelCarrello = computed(() =>
    this.carrello
      .carrello()
      .some((prodotto) => prodotto.prodotto.id === this.proddi().id),
  );

  toggleCompare() {
    this.compareSer.toggle(this.proddi());
  }
  ngOnInit() {
    this.isfavorite$ = this.favoritesService.isfavorite$(this.proddi().id);
    this.isCompare$ = this.compareSer.isCompare$(this.proddi().id);
  }
}
