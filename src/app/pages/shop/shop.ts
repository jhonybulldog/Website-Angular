import { Component, inject, OnInit, signal } from "@angular/core";
import { ProdottiService } from "./service/prodotti.service";
import { ProductDetails, Category } from "./models/prodotti.model";
import { Minicart } from "./components/minicart/minicart";
import { Categoryselect } from "./components/categoryselect/categoryselect";
import { Productcard } from "./components/productcard/productcard";
import { CompareB } from "./components/compare-b/compare-b";
import { AsyncPipe } from "@angular/common";
import { PaginatedGrid } from "../../shared/paginated-grid/paginated-grid";
import { SortSelect } from "../../shared/sort-select/sort-select";
import { ActivatedRoute } from "@angular/router";
@Component({
  imports: [
    Minicart,
    Categoryselect,
    PaginatedGrid,
    Productcard,
    SortSelect,
    CompareB,
    AsyncPipe,
  ],
  selector: "app-shop",
  styleUrl: "./shop.css",
  templateUrl: "./shop.html",
})
export class Shop implements OnInit {
  private route = inject(ActivatedRoute)
  private prodottiser = inject(ProdottiService);
  prod = signal<ProductDetails[]>([]);
  categoriaSelezionata = signal<string>(this.route.snapshot.queryParamMap.get("category")?? "");
  categorie = signal<Category[]>([]);
  order = signal({label: "", sortBy: this.route.snapshot.queryParamMap.get("sortBy")?? "", order: this.route.snapshot.queryParamMap.get("order")?? ""});
  totale = signal(0);
  loading$ = this.prodottiser.loading$;
  optionorder = [
    { label: "Ordina per...", sortBy: "", order: "" },
    { label: "Prezzo più basso", sortBy: "price", order: "asc" },
    { label: "Prezzo più alto", sortBy: "price", order: "desc" },
    { label: "Voto più alto", sortBy: "rating", order: "desc" },
    { label: "Voto più basso", sortBy: "rating", order: "asc" },
  ];

  load(e: { limit: number; skip: number; search: string }) {
    this.prodottiser
      .caricaProdotti(
        e.limit,
        e.skip,
        this.categoriaSelezionata(),
        e.search,
        this.order().order,
        this.order().sortBy,
      )
      .subscribe((risposta) => {
        this.prod.set(risposta.products);
        this.totale.set(risposta.total);
      });
  }

  ngOnInit() {
    if (this.categorie().length === 0) {
      this.prodottiser.caricaCategorie().subscribe((risposta) => {
        this.categorie.set(risposta);
      });
    }
  }
}
