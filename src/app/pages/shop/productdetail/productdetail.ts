import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ListaProdotti, Prodotti } from "../prodotti.service";
@Component({
  imports: [],
  standalone: true,
  selector: "app-productdetail",
  styleUrl: "./productdetail.css",
  templateUrl: "./productdetail.html",
  providers: [Prodotti]
})
export class Productdetail implements OnInit {
  private route = inject(ActivatedRoute);
  private prodottiser = inject(Prodotti)

  idprodotto: string | null = null;
  prodotto: ListaProdotti | undefined;
  ngOnInit(): void {
    this.idprodotto = this.route.snapshot.paramMap.get("id");

    const id = Number(this.idprodotto);
    this.prodotto = this.prodottiser.prod.find(prodotto => prodotto.id === id);
  }
}
