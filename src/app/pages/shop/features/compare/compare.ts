import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { CompareService } from "../../service/compare-service";
import { CompareColumn } from "../../components/compare-column/compare-column";

@Component({
  imports: [AsyncPipe, RouterLink, CompareColumn],
  selector: "app-compare",
  styleUrl: "./compare.css",
  templateUrl: "./compare.html",
})
export class Compare {
  private compareSer = inject(CompareService);
  ids$ = this.compareSer.products$;
}