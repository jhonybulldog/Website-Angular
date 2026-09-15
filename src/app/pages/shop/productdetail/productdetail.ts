import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ListaProdotti, Prodotti } from "../prodotti.service";
import { CartService } from "../carrello/cart.service";
import { Minicart } from "../minicart/minicart";

@Component({
  imports: [RouterLink, Minicart],
  standalone: true,
  selector: "app-productdetail",
  styleUrl: "./productdetail.css",
  templateUrl: "./productdetail.html",
})
export class Productdetail implements OnInit {
  private route = inject(ActivatedRoute);
  private prodottiser = inject(Prodotti);
  private carrello = inject(CartService);

  cartprodotti = this.carrello.carrello;
  idprodotto: string | null = null;
  prodotto: ListaProdotti | undefined;

  ngOnInit(): void {
    this.idprodotto = this.route.snapshot.paramMap.get("id");

    const id = Number(this.idprodotto);
    this.prodotto = this.prodottiser.prod().find((prodotto) => prodotto.id === id);
  }

  aggiungicarrello(prodotto: ListaProdotti) {
    this.carrello.aggiungiCarrello(prodotto);
  }

  rimuoviCarello(indice: number) {
    this.carrello.rimuoviCarello(indice);
  }

  aumentaquantita(id: number) {
    this.carrello.aumentacarrello(id);
  }

  diminuiscicarrell(id: number) {
    this.carrello.diminuiscicarrello(id);
  }
}
