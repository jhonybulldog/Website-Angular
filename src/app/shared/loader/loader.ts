import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import { Component, TemplateRef, computed, contentChild, input, signal } from "@angular/core";
import { catchError, EMPTY, Observable } from "rxjs";

@Component({
  imports: [AsyncPipe, NgTemplateOutlet],
  selector: "app-loader",
  styleUrl: "./loader.css",
  templateUrl: "./loader.html",
})
export class Loader<T> {
  source = input.required<Observable<T>>();
  text = input("caricamento...");
  errorText = input("Si è verificato un errore");
  template = contentChild.required(TemplateRef);
  errore = signal(false);

  dati$ = computed(() =>
    this.source().pipe(
      catchError(() => {
        this.errore.set(true);
        return EMPTY;
      }),
    ),
  );
}