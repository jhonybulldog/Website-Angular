import { Component, model } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Subject, debounceTime } from "rxjs";

@Component({
  selector: "app-searchbox",
  styleUrl: "./searchbox.css",
  templateUrl: "./searchbox.html",
})
export class Searchbox {
  value = model.required<string>();

  private typed = new Subject<string>();

  constructor() {
    this.typed
      .pipe(debounceTime(500),  takeUntilDestroyed())
      .subscribe((text) => this.value.set(text));
  }

  searchtext(text: string) {
    this.typed.next(text);
  }
}