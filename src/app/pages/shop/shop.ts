import { Component, inject, OnInit, signal, computed } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Prodotti } from "./prodotti.service";
import { Productcard } from "./productcard/productcard";
import { Minicart } from "./minicart/minicart";
import { PreferenzeService } from "./preferenze.service";
@Component({
  imports: [RouterLink, Productcard, Minicart],
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

  cercaProdotto(testo: string) {
    this.ricerca.set(testo);
  }

  ngOnInit() {
    if (this.prodotti().length === 0) {
      this.prodottiser.caricaProdotti();
    }
    if (this.categorie().length === 0) {
      this.prodottiser.caricaCategorie();
    }
  }

  categorie = computed(() => this.prodottiser.categorie());

  selezionacategoria(categoria: string) {
    this.categoriaSelezionata.set(categoria);
    console.log(categoria);
  }

  filtroprod = computed(() => {
    const categoria = this.categoriaSelezionata();
    const testo = this.ricerca().toLowerCase().trim();
    let lista = this.prodotti();
    if (categoria !== "" || testo !== "") {
      lista = lista.filter((prodotto) => {
        const selezionecategoria =
          categoria === "" || prodotto.category === categoria;
        const selezionetesto =
          testo === "" || prodotto.title.toLowerCase().includes(testo);
        return selezionecategoria && selezionetesto;
      });
    }
    if (categoria === "") {
      const pesi: { [key: string]: number } = {
        Alta: 3,
        Media: 2,
        "": 1,
        Bassa: 0,
      };

      lista = [...lista].sort((a, b) => {
        const prefA = this.preferenzeser.getPreferenza(a.category);
        const prefB = this.preferenzeser.getPreferenza(b.category);

        const pesoA = pesi[prefA];
        const pesoB = pesi[prefB];

        return pesoB - pesoA;
      });
    }

    return lista;
  });
}
