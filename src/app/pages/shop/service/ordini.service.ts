import { Injectable, signal } from "@angular/core";
import { ordine } from "../models/ordini.model";

@Injectable({
  providedIn: "root",
})
export class OrdiniService {
  ordini = signal<ordine[]>([]);

  salvaOrdine(ordine: ordine) {
    this.ordini.update((ordini) => [...ordini, ordine]);
  }
}