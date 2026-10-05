import { Component, inject, OnInit } from "@angular/core";
import { OrdiniService } from "../ordini.service";
import { Prodotti } from "../prodotti.service";
import { DatePipe, AsyncPipe } from "@angular/common";
import { PreferenzeService } from "../preferenze.service";
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from "../../admin/login/login.service";
import { ProductFavorite } from "../product-favorite";
import { ProductDetails } from "../prodotti.service";
import { RouterLink } from "@angular/router";
@Component({
  imports: [DatePipe, ReactiveFormsModule, AsyncPipe, RouterLink],
  selector: "app-dashboard",
  styleUrl: "./dashboard.css",
  templateUrl: "./dashboard.html",
})
export class Dashboard implements OnInit {
  private ordiniService = inject(OrdiniService);
  ordini = this.ordiniService.ordini;

  private loginser = inject(LoginService);
  private prodottiService = inject(Prodotti);
  private fb = inject(FormBuilder);
  private favoritesService = inject(ProductFavorite);


  favorites$ = this.favoritesService.favorites2$;

  nomeUtente = this.loginser.usernameLoggato;

  immagineProfilo = "/profile.png";

  readonly preferenzeserv = inject(PreferenzeService);

form = this.fb.group({
  preferenze: this.fb.array<ReturnType<typeof this.creaRiga>>([]),
});

  get preferenzeFormArray(): FormArray {
    return this.form.controls.preferenze;
  }

  private creaRiga(categoria = "", preferenza = "") {
    return this.fb.group({
      categoria: [categoria, Validators.required],
      preferenza: [preferenza, Validators.required],
    });
  }
  removeFavorite(product: ProductDetails) {
    this.favoritesService.toggle(product);
  }
  aggiungiRiga() {
    this.preferenzeFormArray.push(this.creaRiga());
  }

  rimuoviRiga(index: number) {
    this.preferenzeFormArray.removeAt(index);
  }

  categorieDisponibili(index?: number) {
    const slugscelti = this.preferenzeFormArray.controls
      .filter((_, i) => i !== index)
      .map((ctrl) => ctrl.get("categoria")?.value);

    return this.prodottiService
      .categorie()
      .filter((c) => !slugscelti.includes(c.slug));
  }

  salvaTutto() {
    const mappa: { [categoria: string]: string } = {};
    for (const item of this.preferenzeFormArray.value) {
      if (item.categoria && item.preferenza) {
        mappa[item.categoria] = item.preferenza;
      }
    }
    this.preferenzeserv.salvaTutteLePreferenze(mappa);
    console.log("[DEBUG] Preferenze salvate manualmente:", mappa);
  }

  preferenzeSalvate() {
    this.preferenzeFormArray.clear();
    const salvate = this.preferenzeserv.tutteLePreferenze();
    for (const categoria of Object.keys(salvate)) {
      this.preferenzeFormArray.push(
        this.creaRiga(categoria, salvate[categoria])
      );
    }
  }

  ngOnInit() {
    this.prodottiService.caricaCategorie();
    this.preferenzeSalvate();
  }
}
