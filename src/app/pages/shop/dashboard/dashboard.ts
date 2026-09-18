import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { OrdiniService } from "../ordini.service";
import { Prodotti } from "../prodotti.service";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PreferenzeService } from "../preferenze.service";
@Component({
  imports: [DatePipe, FormsModule],
  selector: "app-dashboard",
  styleUrl: "./dashboard.css",
  templateUrl: "./dashboard.html",
})
export class Dashboard implements OnInit {
  private ordiniser = inject(OrdiniService);

  ordini = this.ordiniser.ordini;

  prodottiser = inject(Prodotti);

  nomeUtente = "Federico";
  emailUtente = "federico@email.it";
  passwordUtente = "password";
  immagineProfilo = "/profile.png";

  ricercaCategoria = signal("");

  readonly preferenzeserv = inject(PreferenzeService)

  tutteCategorie = computed(() => {
    const categorieProdotti = this.prodottiser
      .prod()
      .map((prodotto) => prodotto.category);

    return [
      ...new Set([...categorieProdotti, ...this.prodottiser.categorianuove()]),
    ];
  });

  categorieFiltrate = computed(() => {
    const ricerca = this.ricercaCategoria().toLowerCase().trim();
    return this.tutteCategorie().filter((categoria) =>
      categoria.toLowerCase().includes(ricerca),
    );
  });


  ngOnInit() {
    if (this.ordini().length === 0) {
      this.prodottiser.caricaProdotti();
    }
  }
}
