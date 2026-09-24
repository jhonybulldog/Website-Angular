import { Component, inject, OnInit, signal, computed } from "@angular/core";
import { Prodotti } from "./prodotti.service";
import { Productcard } from "./productcard/productcard";
import { Minicart } from "./minicart/minicart";
import { PreferenzeService } from "./preferenze.service";
import { FormsModule } from "@angular/forms";
@Component({
  imports: [Productcard, Minicart, FormsModule],
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
  limit = 21;
  totaleProdotti = this.prodottiser.totaleProdotti;

  numeroPagine = computed(() => Math.ceil(this.totaleProdotti() / this.limit));

  pagine = computed(() =>
  Array(this.numeroPagine()).fill(0).map((_, i) => i + 1)
  );

  cercaProdotto(testo: string) {
    this.ricerca.set(testo);
  }

  caricaPagina(pagina: number) {
    const skip = (pagina - 1) * this.limit;
    this.paginaCorrente.set(pagina);

    this.prodottiser.caricaProdotti(
      this.limit,
      skip,
      this.categoriaSelezionata(),
    );
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

  selezionacategoria(categoria: string) {
    this.categoriaSelezionata.set(categoria);
    this.caricaPagina(1);
    console.log(categoria);
  }
  ngOnInit() {
    this.caricaPagina(1);
    if (this.categorie().length === 0) {
      this.prodottiser.caricaCategorie();
    }
  }
}
