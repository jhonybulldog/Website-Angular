import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PreferenzeService {
  private preferenze = signal<{ [categoria: string]: string }>({});
  formapertochiuso = signal(true);

  alternaForm() {
    this.formapertochiuso.update((aperto) => !aperto);
  }

  salvaPreferenza(categoria: string, preferenza: string) {
    this.preferenze.update((p) => ({ ...p, [categoria]: preferenza }));
  }

  getPreferenza(categoria: string): string {
    return this.preferenze()[categoria] || "";
  }
    tutteLePreferenze(): { [categoria: string]: string } {
    return this.preferenze();
  }
}
