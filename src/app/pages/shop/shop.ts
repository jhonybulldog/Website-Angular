import { Component, inject, OnInit, signal, computed , effect} from "@angular/core";
import { Category, Prodotti, ProductDetails } from "./prodotti.service";
import { Minicart } from "./minicart/minicart";
import { Categoryselect } from "./categoryselect/categoryselect";
import { Productcard } from "./productcard/productcard";
import { PaginatedGrid } from "../shared/paginated-grid/paginated-grid";
import { SortSelect } from "../shared/sort-select/sort-select";
import { CompareB } from "./compare-b/compare-b";
import { AsyncPipe } from "@angular/common";
@Component({
  imports: [
    Minicart,
    Categoryselect,
    PaginatedGrid,
    Productcard,
    SortSelect,
    CompareB,
    AsyncPipe
],
  selector: "app-shop",
  styleUrl: "./shop.css",
  templateUrl: "./shop.html",
})
export class Shop implements OnInit {
  private prodottiser = inject(Prodotti);
  prod = signal<ProductDetails[]>([]);
  categoriaSelezionata = signal<string>("");
  categorie = signal<Category[]>([]);;
  order = signal({label: "", sortBy: "", order: ""});
  totale = signal(0);
  loading$ = this.prodottiser.loading$;
  optionorder = [
    { label: "Ordina per..." , sortBy: "", order: ""},
    {  label: "Prezzo più basso" , sortBy: "price", order: "asc" },
    { label: "Prezzo più alto", sortBy: "price", order: "desc" },
    { label: "Voto più alto", sortBy: "rating", order: "desc"  },
    { label: "Voto più basso", sortBy: "rating", order: "asc" },
  ];

  load(e: { limit: number; skip: number; search: string }) {
    this.prodottiser.caricaProdotti(e.limit, e.skip, this.categoriaSelezionata(), e.search, this.order().order, this.order().sortBy)
          .subscribe((risposta) => {
            this.prod.set(risposta.products);
            this.totale.set(risposta.total);
          });;
  }

  ngOnInit() {
    if (this.categorie().length === 0) {
      this.prodottiser.caricaCategorie().subscribe((risposta) => {
        this.categorie.set(risposta);
      });
    }
  }
}
