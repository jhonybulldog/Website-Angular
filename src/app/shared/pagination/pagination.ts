import { Component, input, output, computed } from "@angular/core";

@Component({
  imports: [],
  selector: "app-pagination",
  styleUrl: "./pagination.css",
  templateUrl: "./pagination.html",
})
export class Pagination {
  currentpage = input.required<number>();
  numberpage = input.required<number>();
  changepage = output<number>();

  pages = computed(() =>
    Array(this.numberpage()).fill(0).map((_, i) => i + 1),
  );

  goA(pagina: number) {
    this.changepage.emit(pagina);
  }
}
