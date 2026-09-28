import { Component, inject, OnInit, signal, computed } from "@angular/core";
import { Prodotti } from "./prodotti.service";
import { Minicart } from "./minicart/minicart";
import { PreferenzeService } from "./preferenze.service";
import { Productlist } from "./productlist/productlist";
import { Categoryselect } from "./categoryselect/categoryselect";
import { Searchbox } from "../shared/searchbox/searchbox";
@Component({
  imports: [Productlist, Minicart, Categoryselect, Searchbox],
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
