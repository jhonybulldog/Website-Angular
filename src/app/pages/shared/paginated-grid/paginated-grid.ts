import { NgTemplateOutlet } from "@angular/common";
import {
  Component,
  TemplateRef,
  computed,
  contentChild,
  input,
  linkedSignal,
  signal,
} from "@angular/core";
import { LimitSelector } from "../limit-selector/limit-selector";
import { Pagination } from "../pagination/pagination";

@Component({
  imports: [NgTemplateOutlet, LimitSelector, Pagination],
  selector: "app-paginated-grid",
  styleUrl: "./paginated-grid.css",
  templateUrl: "./paginated-grid.html",
})
export class PaginatedGrid<T extends { id: number }> {
  items = input.required<T[]>();
  template = contentChild.required(TemplateRef);

  limit = signal(21);
  paginaCorrente = linkedSignal(() => {
    this.items();
    return 1;
  });

  numeroPagine = computed(() => Math.ceil(this.items().length / this.limit()));

  itemspage = computed(() => {
    const skip = (this.paginaCorrente() - 1) * this.limit();
    return this.items().slice(skip, skip + this.limit());
  });

  caricaPagina(pagina: number) {
    this.paginaCorrente.set(pagina);
  }
  
}