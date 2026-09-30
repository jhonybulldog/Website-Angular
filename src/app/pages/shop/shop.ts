import { Component, inject, OnInit, signal, computed } from "@angular/core";
import { Prodotti } from "./prodotti.service";
import { Minicart } from "./minicart/minicart";
import { PreferenzeService } from "./preferenze.service";
import { Categoryselect } from "./categoryselect/categoryselect";
import { Searchbox } from "../shared/searchbox/searchbox";
import { Productcard } from "./productcard/productcard";
import { PaginatedGrid } from "../shared/paginated-grid/paginated-grid";
import { SortSelect } from "../shared/sort-select/sort-select";

@Component({
  imports: [
    Minicart,
    Categoryselect,
    Searchbox,
    PaginatedGrid,
    Productcard,
    SortSelect,
  ],
  selector: "app-shop",
  styleUrl: "./shop.css",
  templateUrl: "./shop.html",
})
export class Shop implements OnInit {
  private prodottiser = inject(Prodotti);
  private preferenzeser = inject(PreferenzeService);

  prodotti = this.prodottiser.prod;
  categoriaSelezionata = signal<string>("");
  ricerca = signal<string>("");
  categorie = computed(() => this.prodottiser.categorie());
  order = signal("");
  optionorder = [
    { value: "", label: "Ordina per prezzo" },
    { value: "asc", label: "Prezzo più basso" },
    { value: "desc", label: "Prezzo più alto" },
  ];

  filtroprod = computed(() => {
    const categoria = this.categoriaSelezionata();
    const testo = this.ricerca().toLowerCase().trim();
    let lista = this.prodotti();

    if (categoria !== "") {
      lista = lista.filter((prodotto) => prodotto.category === categoria);
    }

    if (testo !== "") {
      lista = lista.filter((prodotto) =>
        prodotto.title.toLowerCase().includes(testo),
      );
    }

    if (categoria === "") {
      const pesi: Record<string, number> = {
        Alta: 3,
        Media: 2,
        "": 1,
        Bassa: 0,
      };
      lista = [...lista].sort((a, b) => {
        const prefA = this.preferenzeser.getPreferenza(a.category);
        const prefB = this.preferenzeser.getPreferenza(b.category);
        return pesi[prefB] - pesi[prefA];
      });
    }

    if (this.order() === "asc") {
      lista = [...lista].sort((a, b) => a.price - b.price);
    }
    if (this.order() === "desc") {
      lista = [...lista].sort((a, b) => b.price - a.price);
    }

    return lista;
  });

  selezionacategoria(categoria: string) {
    this.categoriaSelezionata.set(categoria);
  }

  ngOnInit() {
    this.prodottiser.caricaProdotti(200, 0);
    if (this.categorie().length === 0) {
      this.prodottiser.caricaCategorie();
    }
  }
}
