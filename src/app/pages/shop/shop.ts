import { Component, inject, OnInit, signal, computed , effect} from "@angular/core";
import { Prodotti } from "./prodotti.service";
import { Minicart } from "./minicart/minicart";
import { Categoryselect } from "./categoryselect/categoryselect";
import { Productcard } from "./productcard/productcard";
import { PaginatedGrid } from "../shared/paginated-grid/paginated-grid";
import { SortSelect } from "../shared/sort-select/sort-select";

@Component({
  imports: [
    Minicart,
    Categoryselect,
    PaginatedGrid,
    Productcard,
    SortSelect
],
  selector: "app-shop",
  styleUrl: "./shop.css",
  templateUrl: "./shop.html",
})
export class Shop implements OnInit {
  private prodottiser = inject(Prodotti);

  prodotti = this.prodottiser.prod;
  categoriaSelezionata = signal<string>("");
  categorie = computed(() => this.prodottiser.categorie());
  order = signal({label: "", sortBy: "", order: ""});
  totale = this.prodottiser.totaleProdotti;
  optionorder = [
    { label: "Ordina per..." , sortBy: "", order: ""},
    {  label: "Prezzo più basso" , sortBy: "price", order: "asc" },
    { label: "Prezzo più alto", sortBy: "price", order: "desc" },
    { label: "Voto più alto", sortBy: "rating", order: "desc"  },
    { label: "Voto più basso", sortBy: "rating", order: "asc" },
  ];
  load(e: { limit: number; skip: number; search: string }) {
    this.prodottiser.caricaProdotti(e.limit, e.skip, this.categoriaSelezionata(), e.search, this.order().order, this.order().sortBy);
  }
  ngOnInit() {
    if (this.categorie().length === 0) {
      this.prodottiser.caricaCategorie();
    }
  }
}
