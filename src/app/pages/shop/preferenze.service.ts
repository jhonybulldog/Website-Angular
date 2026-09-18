import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PreferenzeService {
  preferenze: { [categoria: string]: string } = {};

  formapertochiuso = signal(true);
  alternaForm() {
    this.formapertochiuso.update((aperto) => !aperto);
  }
}
