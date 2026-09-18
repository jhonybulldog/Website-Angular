import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { OrdiniService } from "../ordini.service";
import { Prodotti } from "../prodotti.service";

@Component({
  imports: [],
  selector: "app-dashboard",
  styleUrl: "./dashboard.css",
  templateUrl: "./dashboard.html",
})
export class Dashboard implements OnInit {
  private ordiniser = inject(OrdiniService);
  ordini = this.ordiniser.ordini;
  prodottiser = inject(Prodotti);
  categoriePreferite = signal<{ categoria: string; preferenza: string }[]>([]);
  categoriaSelezionata = signal("");
  preferenzaSelezionata = signal("");
  nomeUtente = signal("Federico");
  emailUtente = signal("federico@email.it");
  passwordUtente = signal("password");
  immagineProfilo = signal("/profile.png");
  tutteCategorie = computed(() => {
    const categorieProdotti = this.prodottiser
      .prod()
      .map((prodotto) => prodotto.category);

    return [
      ...new Set([...categorieProdotti, ...this.prodottiser.categorianuove()]),
    ];
  });
  salvaPreferenza() {
    if (!this.categoriaSelezionata() || !this.preferenzaSelezionata()) {
      return;
    }

    this.categoriePreferite.update((preferenze) => {
      const esistente = preferenze.find(
        (item) => item.categoria === this.categoriaSelezionata(),
      );

      if (esistente) {
        return preferenze.map((item) =>
          item.categoria === this.categoriaSelezionata()
            ? {
                ...item,
                preferenza: this.preferenzaSelezionata(),
              }
            : item,
        );
      }

      return [
        ...preferenze,
        {
          categoria: this.categoriaSelezionata(),
          preferenza: this.preferenzaSelezionata(),
        },
      ];
    });

    this.categoriaSelezionata.set("");
    this.preferenzaSelezionata.set("");
  }
  ngOnInit() {
    if (this.prodottiser.prod().length === 0) {
      this.prodottiser.caricaProdotti();
    }
  }
}
