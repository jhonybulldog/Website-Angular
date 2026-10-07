import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { Prodotti, ProductDetails, Category } from "../prodotti.service";
import { toObservable } from "@angular/core/rxjs-interop";
import { map, combineLatest } from "rxjs";
import { AsyncPipe, DecimalPipe } from "@angular/common";
import { ordine, OrdiniService } from "../ordini.service";
import { BaseChartDirective } from "ng2-charts";
@Component({
  imports: [ReactiveFormsModule, AsyncPipe, DecimalPipe, BaseChartDirective],
  selector: "app-stats",
  styleUrl: "./stats.css",
  templateUrl: "./stats.html",
})
export class Stats implements OnInit {
  private fb = inject(FormBuilder);
  private productser = inject(Prodotti);
  private ordiniser = inject(OrdiniService);
  categories$ = toObservable(this.productser.categorie);
  products$ = toObservable(this.productser.prod);
  orders$ = toObservable(this.ordiniser.ordini);

  avgPrice$ = combineLatest([this.products$, this.categories$]).pipe(
    map(([products, categories]) =>
      this.average(products, categories, "price"),
    ),
  );

  avgRating$ = combineLatest([this.products$, this.categories$]).pipe(
    map(([products, categories]) =>
      this.average(products, categories, "rating"),
    ),
  );

  avgtotal$ = combineLatest([this.orders$, this.categories$]).pipe(
    map(([orders, categories]) => this.avgorder(orders, categories, "tsold")),
  );

  avgpiece$ = combineLatest([this.orders$, this.categories$]).pipe(
    map(([orders, categories]) => this.avgorder(orders, categories, "psold")),
  );
  metricoptions = [
    { label: "seleziona metrica" },
    { label: "rating medio", data$: this.avgRating$ },
    { label: "prezzo medio", data$: this.avgPrice$ },
    { label: "totale speso", charts$: this.avgtotal$ },
    { label: "pezzo acquistati", charts$: this.avgpiece$ },
  ];
  get chartsformarray() {
    return this.form.controls.charts;
  }

  private createChart() {
    return this.fb.group({
      metric: [this.metricoptions[0]],
    });
  }

  form = this.fb.group({
    charts: this.fb.array<ReturnType<typeof this.createChart>>([]),
  });

  addcharts() {
    this.chartsformarray.push(this.createChart());
  }

  removecharts(index: number) {
    this.chartsformarray.removeAt(index);
  }

  private average(
    products: ProductDetails[],
    categories: Category[],
    field: "price" | "rating",
  ) {
    const items = categories.map((category) => {
      const list = products.filter((p) => p.category === category.slug);
      const total = list.reduce((sum, p) => sum + (p[field] ?? 0), 0);
      return {
        label: category.name,
        value: total / list.length,
        count: list.length,
      };
    });
    const max = Math.max(...items.map((item) => item.value));
    return items
      .map((item) => ({
        ...item,
        percent: max > 0 ? (item.value / max) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);
  }

  private avgorder(
    orders: ordine[],
    categories: Category[],
    metric: "tsold" | "psold",
  ) {
    const items = orders.flatMap((order) => order.prodotti);
    const totals = categories.map((category) => {
      const categoryItems = items.filter(
        (item) => item.prodotto.category === category.slug,
      );
      const total = categoryItems.reduce((sum, item) => {
        if (metric === "tsold") {
          return sum + item.prodotto.price * item.quantita;
        }
        return sum + item.quantita;
      }, 0);
      return {
        label: category.name,
        value: total,
        count: categoryItems.length,
      };
    });
    return {
      labels: totals.map((item) => item.label),
      datasets: [{ data: totals.map((item) => item.value) }],
    };
  }
  ngOnInit() {
    this.productser.caricaProdotti(200, 0);
    this.productser.caricaCategorie();
  }
}
