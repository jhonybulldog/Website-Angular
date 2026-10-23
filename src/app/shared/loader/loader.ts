import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import { Component, TemplateRef, contentChild, input, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { catchError, EMPTY, Observable, switchMap } from "rxjs";

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
private source$ = toObservable(this.source);

dati$ = this.source$.pipe(
  switchMap((source) =>
    source.pipe(
      catchError(() => {
        this.errore.set(true);
        return EMPTY;
      }),
    ),
  ),
);
}