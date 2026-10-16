import { Component, inject } from "@angular/core";
import { CompareService } from "../../service/compare-service";
import { AsyncPipe } from "@angular/common";
import { map } from "rxjs";
import { RouterLink } from "@angular/router";

@Component({
  imports: [AsyncPipe, RouterLink],
  selector: "app-compare-b",
  styleUrl: "./compare-b.css",
  templateUrl: "./compare-b.html",
})
export class CompareB {
  private compareserv = inject(CompareService);
  active$ = this.compareserv.active$;
  isCanCompare$ = this.compareserv.products$.pipe(map((list) => list.length >= 2));

  toggle() {
    this.compareserv.toggleActive();
  }
}
