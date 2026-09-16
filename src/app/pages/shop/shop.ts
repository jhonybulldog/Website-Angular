import { Component, inject, OnInit, signal, computed } from "@angular/core";
import { Prodotti } from "./prodotti.service";
import { Productcard } from "./productcard/productcard";
import { Minicart } from "./minicart/minicart";
@Component({
  imports: [Productcard, Minicart],
  selector: "app-shop",
  styleUrl: "./shop.css",
  templateUrl: "./shop.html",
})
export class Shop implements OnInit{
  private prodottiser = inject(Prodotti);
  prodotti = this.prodottiser.prod;
  categoriaSelezionata = signal<string>("");
  ricerca = signal<string>("");

  cercaProdotto(testo: string) {
    this.ricerca.set(testo);
  }


ngOnInit(){
  if(this.prodotti().length===0){
    this.prodottiser.caricaProdotti();
  }
}
categorie = computed(() => [
  ...new Set([
    ...this.prodotti().map((prodotto) => prodotto.category),
    ...this.prodottiser.categorianuove()
  ])
]);

  selezionacategoria(categoria: string) {
    this.categoriaSelezionata.set(categoria);
    console.log(categoria);
  }

  filtroprod = computed(() => {
    const categoria = this.categoriaSelezionata();
    const testo = this.ricerca();

    if (categoria === "" && testo === "") {
      return this.prodotti();
    } else {
     return this.prodotti().filter((prodotto) => {
        const selezionecategoria = categoria === ""||prodotto.category === categoria;
        const selezionetesto = prodotto.title.toLowerCase().includes(testo.toLowerCase());
        return selezionecategoria && selezionetesto;
      });
    }
  });

}
