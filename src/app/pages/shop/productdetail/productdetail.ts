import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ProductDetails, Prodotti } from "../prodotti.service";
import { CartService } from "../carrello/cart.service";
import { Minicart } from "../minicart/minicart";
import { LoginService } from "../../admin/login/login.service";
import { ProductFavorite } from "../product-favorite";
import { AsyncPipe } from "@angular/common";
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
  private productId = Number(this.route.snapshot.paramMap.get("id"));
  isFavorite$ = this.favoritesService.isfavorite$(this.productId);
  cartprodotti = this.carrello.carrello;
  ac = signal(false)
  prodotto = signal<ProductDetails>({
    id: this.productId,
    title: "",
    description: "",
    price: 0,
    thumbnail: "",
    category: "",
  });
  loggedIn = this.logginser.loggedIn;
  aggiungicarrello(prodotto: ProductDetails) {
    this.carrello.aggiungiCarrello(prodotto);
  }
    aprichiudi() {
    this.ac.update((aperto) => !aperto);
  }

  salva(prezzo: string, descrizione: string) {
    const id = this.prodotto().id;
    this.prodottiser
      .aggiornaProdotto(id, Number(prezzo), descrizione)
      .subscribe((prodotto) => {
        this.prodotto.set(prodotto);
      });
  }

  toggleFavorite() {
    this.favoritesService.toggle(this.prodotto());
  }
  ngOnInit(): void {
    this.prodottiser.caricaProdotto(this.productId).subscribe((prodotto) => {
      this.prodotto.set(prodotto);
    });
  }
}
