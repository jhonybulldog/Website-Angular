import { Component, inject, OnInit } from "@angular/core";
import { Prodotti, ProductDetails, Category } from "../prodotti.service";
import { toObservable } from "@angular/core/rxjs-interop";
import { map, combineLatest } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { ordine, OrdiniService } from "../ordini.service";
import { BaseChartDirective, NgChartsConfiguration } from "ng2-charts";
import { ChartConfiguration } from "chart.js";
@Component({
  imports: [AsyncPipe, BaseChartDirective],
  selector: "app-stats",
  styleUrl: "./stats.css",
  templateUrl: "./stats.html",
})
export class Stats implements OnInit {
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


  avgpiece$ = combineLatest([this.orders$, this.categories$]).pipe(
    map(([orders, categories]) => this.avgorder(orders, categories, "psold")),
  );
  metricoptions = [
    { label: "rating medio", shop$: this.avgRating$ },
    { label: "prezzo medio", shop$: this.avgPrice$ },
    { label: "pezzi acquistati", order$: this.avgpiece$ },
  ];

  chartoptions: ChartConfiguration["options"] = {
    scales: {
      y: {min: 0},
    }
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
    return {
      labels: items.map((items) => items.label),
      datasets: [{ data: items.map((items) => items.value) }],
    };
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
  totalSpent$ = this.orders$.pipe(
  map((orders) => {
    let total = 0;
    for (const order of orders) {
      total += order.totale;
    }
    return total;
  }),
);
  ngOnInit() {
    this.productser.caricaProdotti(200, 0);
    this.productser.caricaCategorie();
  }
}
