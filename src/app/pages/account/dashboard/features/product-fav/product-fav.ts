import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ProductFavorite } from "../../../../shop/service/product-favorite";
import { FavoriteProduct } from "../../../../shop/models/product-favorite.model";
import { AsyncPipe } from "@angular/common";
import { dashboard } from "../../dashboard";

@Component({
  imports: [RouterLink, AsyncPipe, dashboard],
  selector: "app-product-fav",
  styleUrl: "./product-fav.css",
  templateUrl: "./product-fav.html",
})
export class ProductFav {
  private favoritesService = inject(ProductFavorite);
  favorites$ = this.favoritesService.favorites2$;

  removeFavorite(product: FavoriteProduct) {
    this.favoritesService.toggle(product);
  }
}
