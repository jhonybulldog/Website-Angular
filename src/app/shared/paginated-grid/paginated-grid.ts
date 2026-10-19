import { NgTemplateOutlet } from "@angular/common";
import {
  Component,
  TemplateRef,
  computed,
  contentChild,
  effect,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from "@angular/core";
import { LimitSelector } from "../limit-selector/limit-selector";
import { Pagination } from "../pagination/pagination";
import { Searchbox } from "../searchbox/searchbox";
import { ActivatedRoute } from "@angular/router";

@Component({
  imports: [NgTemplateOutlet, LimitSelector, Pagination, Searchbox],
  selector: "app-paginated-grid",
  styleUrl: "./paginated-grid.css",
  templateUrl: "./paginated-grid.html",
})
export class PaginatedGrid<T extends { id: number }> {
  private route = inject(ActivatedRoute);
  items = input.required<T[]>();
  total = input.required<number>();
  filters = input<{
    categoria?: string;
    ordine?: { label: string; sortBy: string; order: string };
  }>({});
  load = output<{ limit: number; skip: number; search: string }>();
  template = contentChild.required(TemplateRef);
  ricerca = signal(this.route.snapshot.queryParamMap.get("search") ?? "");
  limit = signal(Number(this.route.snapshot.queryParamMap.get("limit")) || 21);
  skip = Number(this.route.snapshot.queryParamMap.get("skip")) || 0;
  pagina = signal(this.skip / this.limit() + 1);
  numeroPagine = computed(() => Math.ceil(this.total() / this.limit()));

  constructor() {
    effect(() => {
      this.filters();
      let skip = (this.pagina() - 1) * this.limit();
      this.load.emit({
        limit: this.limit(),
        skip: skip,
        search: this.ricerca(),
      });
    });
  }
}
