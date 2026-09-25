import { Component, inject, OnInit, signal, computed } from "@angular/core";
import { Prodotti } from "./prodotti.service";
import { Productcard } from "./productcard/productcard";
import { Minicart } from "./minicart/minicart";
import { PreferenzeService } from "./preferenze.service";
import { LimitSelector } from "../shared/limit-selector/limit-selector";
import { Pagination } from "../shared/pagination/pagination";
import { Searchbox } from "../shared/searchbox/searchbox";
@Component({
  imports: [Productcard, Minicart, LimitSelector, Pagination, Searchbox],
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

  paginaCorrente = signal(1);
  limit = signal(21);

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

  numeroPagine = computed(() =>
    Math.ceil(this.filtroprod().length / this.limit()),
  );

  prodottiPagina = computed(() => {
    const skip = (this.paginaCorrente() - 1) * this.limit();
    return this.filtroprod().slice(skip, skip + this.limit());
  });

  caricaPagina(pagina: number) {
    this.paginaCorrente.set(pagina);
  }

  selezionacategoria(categoria: string) {
    this.categoriaSelezionata.set(categoria);
    this.paginaCorrente.set(1);
  }

  ngOnInit() {
    this.prodottiser.caricaProdotti(200, 0);
    if (this.categorie().length === 0) {
      this.prodottiser.caricaCategorie();
    }
  }
}