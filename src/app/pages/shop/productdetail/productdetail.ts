import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ListaProdotti, Prodotti } from "../prodotti.service";
import { CartService } from "../carrello/cart.service";
import { Minicart } from "../minicart/minicart";
import { LoginService } from "../../admin/login/login.service";

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
  private logginser = inject(LoginService);
  cartprodotti = this.carrello.carrello;
  idprodotto: string | null = null;
  prodotto = signal<ListaProdotti | undefined>(undefined);
  loggedIn = this.logginser.loggedIn;
  aggiungicarrello(prodotto: ListaProdotti) {
    this.carrello.aggiungiCarrello(prodotto);
  }
  salva(prezzo: string, descrizione: string) {
    const id = this.prodotto()!.id;
    this.prodottiser
      .aggiornaProdotto(id, Number(prezzo), descrizione)
      .subscribe((prodotto) => {
        this.prodotto.set(prodotto);
      });
  }
  ngOnInit(): void {
    this.idprodotto = this.route.snapshot.paramMap.get("id");
    const id = Number(this.idprodotto);

    this.prodottiser.caricaProdotto(id).subscribe((prodotto) => {
      this.prodotto.set(prodotto);
    });
  }
}
