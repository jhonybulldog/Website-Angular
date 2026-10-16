import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ProdottiService } from "../../service/prodotti.service";
import { ProductDetails } from "../../models/prodotti.model";
import { CartService } from "../../service/cart.service";
import { Minicart } from "../../components/minicart/minicart";
import { LoginService } from "../../../../core/login/service/login.service";
import { ProductFavorite } from "../../service/product-favorite";
import { AsyncPipe } from "@angular/common";
import { NotificationService } from "../../../../core/notification/notification-service";
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
  private prodottiser = inject(ProdottiService);
  private carrello = inject(CartService);
  private logginser = inject(LoginService);
  private favoritesService = inject(ProductFavorite);
  private notificationser = inject(NotificationService);
  private productId$ = this.route.paramMap.pipe(
    map((params) => Number(params.get("id"))),
  );
  isFavorite$ = this.productId$.pipe(
    switchMap((id) => this.favoritesService.isfavorite$(id)),
  );
  cartprodotti = this.carrello.carrello;
  ac = signal(false);
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
  newImage = "";

  aggiungicarrello(prodotto: ProductDetails) {
    this.carrello.addToCart(prodotto.id);
  }
  aprichiudi() {
    this.ac.update((aperto) => !aperto);
  }

  salva(prezzo: string, descrizione: string) {
    const id = this.prodotto().id;
    this.prodottiser
      .aggiornaProdotto(id, {
        price: Number(prezzo),
        description: descrizione,
        thumbnail: this.newImage || this.prodotto().thumbnail,
      })
      .subscribe((prodotto) => {
        this.prodotto.set(prodotto);
        this.notificationser.show("prodotto modificato", false);
      });
  }

  toggleFavorite() {
    this.favoritesService.toggle(this.prodotto());
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
  ngOnInit(): void {
    this.productId$
      .pipe(switchMap((id) => this.prodottiser.productdetail(id)))
      .subscribe((prodotto) => this.prodotto.set(prodotto));
  }
}
