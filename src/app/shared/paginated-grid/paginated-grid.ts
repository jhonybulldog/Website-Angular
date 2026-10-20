import { NgTemplateOutlet } from "@angular/common";
import {
  Component,
  TemplateRef,
  computed,
  contentChild,
  effect,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { LimitSelector } from "../limit-selector/limit-selector";
import { Pagination } from "../pagination/pagination";
import { Searchbox } from "../searchbox/searchbox";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  imports: [NgTemplateOutlet, LimitSelector, Pagination, Searchbox],
  selector: "app-paginated-grid",
  styleUrl: "./paginated-grid.css",
  templateUrl: "./paginated-grid.html",
})
export class PaginatedGrid<T extends { id: number }> {
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  prefix = input("")
  items = input.required<T[]>();
  total = input.required<number>();
  filters = input<{
    categoria?: string;
    ordine?: { label: string; sortBy: string; order: string };
  }>({});
  load = output<{ limit: number; skip: number; search: string }>();
  template = contentChild.required(TemplateRef);
  ricerca = signal("");
  limit = signal( 21);
  pagina = signal(1);
  numeroPagine = computed(() => Math.ceil(this.total() / this.limit()));
  
ngOnInit() {
  this.ricerca.set(this.route.snapshot.queryParamMap.get(this.prefix() + "search") ?? "");
  this.limit.set(Number(this.route.snapshot.queryParamMap.get(this.prefix() + "limit")) || 21);
  const skip = Number(this.route.snapshot.queryParamMap.get(this.prefix() + "skip")) || 0;
  this.pagina.set(skip / this.limit() + 1);
}
  constructor() {
    effect(() => {
      this.filters();
      let skip = (this.pagina() - 1) * this.limit();
      this.router.navigate([], {
        queryParams: {
          [this.prefix() + "limit"]: this.limit(),
          [this.prefix() + "skip"]: skip,
          [this.prefix() + "search"]: this.ricerca(),
        },
        queryParamsHandling: "merge",
        replaceUrl: true
      })
      this.load.emit({
        limit: this.limit(),
        skip: skip,
        search: this.ricerca(),
      });
    });
  }
}
