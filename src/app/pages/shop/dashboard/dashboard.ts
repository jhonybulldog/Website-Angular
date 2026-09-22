import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { OrdiniService } from "../ordini.service";
import { Prodotti } from "../prodotti.service";
import { DatePipe } from "@angular/common";
import { PreferenzeService } from "../preferenze.service";
@Component({
  imports: [DatePipe],
  selector: "app-dashboard",
  styleUrl: "./dashboard.css",
  templateUrl: "./dashboard.html",
})
export class Dashboard implements OnInit {
  private ordiniService = inject(OrdiniService);
  ordini = this.ordiniService.ordini;

  private prodottiService = inject(Prodotti);

  nomeUtente = "Federico";
  emailUtente = "federico@email.it";
  immagineProfilo = "/profile.png";

  ricercaCategoria = signal("");

  readonly preferenzeserv = inject(PreferenzeService);

  tutteCategorie = computed(() => {
    return this.prodottiService.categorie();
  });

  categorieFiltrate = computed(() => {
    const ricerca = this.ricercaCategoria().toLowerCase().trim();
    return this.tutteCategorie().filter((categoria) => categoria.name.toLowerCase().includes(ricerca)).map((categoria) => ({
        categoria,
        preferenza: this.preferenzeserv.getPreferenza(categoria.slug),
      }));
  });

  salvaPreferenza(slug: string, valore: string) {
    const valorePreferenza = valore.trim();
    this.preferenzeserv.salvaPreferenza(slug, valorePreferenza);
    console.log(`preferenza aggiornata - nome preferenza: ${valorePreferenza}`);
  }

  ngOnInit() {
    this.prodottiService.caricaCategorie();
  }
}