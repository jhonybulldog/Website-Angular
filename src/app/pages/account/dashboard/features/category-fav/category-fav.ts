import { Component, inject, OnInit, signal } from "@angular/core";
import { PreferenzeService } from "../../../../shop/service/preferenze.service";
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Category } from "../../../../shop/models/prodotti.model";
import { ProdottiService } from "../../../../shop/service/prodotti.service";

@Component({
  imports: [ReactiveFormsModule],
  selector: "app-category-fav",
  styleUrl: "./category-fav.css",
  templateUrl: "./category-fav.html",
})
export class CategoryFav implements OnInit {
  readonly preferenzeserv = inject(PreferenzeService);

    private prodottiService = inject(ProdottiService);
  private fb = inject(FormBuilder);
  categorie = signal<Category[]>([]);
  favoritesService: any;
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

    return this.categorie().filter((c) => !slugscelti.includes(c.slug));
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
        this.creaRiga(categoria, salvate[categoria]),
      );
    }
  }

  ngOnInit(): void {
    this.prodottiService.caricaCategorie().subscribe((risposta) => {
      this.categorie.set(risposta);
    });
    this.preferenzeSalvate();
  }
}
