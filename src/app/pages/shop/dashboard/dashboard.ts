import { Component, inject, OnInit } from "@angular/core";
import { OrdiniService } from "../ordini.service";
import { Prodotti } from "../prodotti.service";
import { DatePipe } from "@angular/common";
import { PreferenzeService } from "../preferenze.service";
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from "../../admin/login/login.service";

@Component({
  imports: [DatePipe, ReactiveFormsModule],
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

  nomeUtente = this.loginser.usernameLoggato;

  immagineProfilo = "/profile.png";

  readonly preferenzeserv = inject(PreferenzeService);

  form = this.fb.group({
    preferenze: this.fb.array<typeof this.creaRiga>([]),
  });

  get preferenzeFormArray(): FormArray {
    return this.form.controls.preferenze;
  }

  private creaRiga() {
    return this.fb.group({
      categoria: ["", Validators.required],
      preferenza: ["", Validators.required],
    });
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
    for (const cate of this.preferenzeFormArray.value) {
      this.preferenzeserv.salvaPreferenza(cate.categoria, cate.preferenza);
    }
    console.log("Preferenze salvate:", this.preferenzeFormArray.value);
  }

 preferenzeSalvate() {
  const salvate = this.preferenzeserv.tutteLePreferenze();
  for (const categoria of Object.keys(salvate)) {
    this.preferenzeFormArray.push(
      this.fb.group({
        categoria: [categoria, Validators.required],
        preferenza: [salvate[categoria], Validators.required],
      })
    )
  }
}
  ngOnInit() {
    this.prodottiService.caricaCategorie();
      this.preferenzeSalvate();
  }
}
