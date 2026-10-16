import { Component, inject } from "@angular/core";
import { ProdottiService } from "../../service/prodotti.service";
import { ProductDetails, Category } from "../../models/prodotti.model";
import { toObservable } from "@angular/core/rxjs-interop";
import { map, combineLatest } from "rxjs";
import { AsyncPipe, DecimalPipe } from "@angular/common";
import { OrdiniService } from "../../service/ordini.service";
import { ordine } from "../../models/ordini.model";
import { BaseChartDirective } from "ng2-charts";
import { ChartConfiguration } from "chart.js";
@Component({
  imports: [AsyncPipe, BaseChartDirective, DecimalPipe],
  selector: "app-stats",
  styleUrl: "./stats.css",
  templateUrl: "./stats.html",
})
export class Stats{
  private productser = inject(ProdottiService);
  private ordiniser = inject(OrdiniService);
  categories$ = this.productser.caricaCategorie();
  products$ = this.productser
    .caricaProdotti(200, 0)
    .pipe(map((risposta) => risposta.products));
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

  avgpiece$ = combineLatest([
    this.orders$,
    this.categories$,
    this.products$,
  ]).pipe(
    map(([orders, categories, products]) =>
      this.avgorder(orders, categories, products, "psold"),
    ),
  );
  metricoptions = [
    { label: "rating medio", shop$: this.avgRating$ },
    { label: "prezzo medio", shop$: this.avgPrice$ },
    { label: "pezzi acquistati", order$: this.avgpiece$ },
  ];

  chartoptions: ChartConfiguration["options"] = {
    scales: {
      y: {
        min: 0,
        ticks: {
          precision: 0,
        },
      },
    },
  };
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
    products: ProductDetails[],
    metric: "tsold" | "psold",
  ) {
    const items = orders.flatMap((order) => order.prodotti);
    const totals = categories.map((category) => {
      const categoryItems = items.filter((item) => {
        const product = products.find((p) => p.id === item.id);
        return product?.category === category.slug;
      });
      const total = categoryItems.reduce((sum, item) => {
        if (metric === "tsold") {
          return sum + item.price * item.quantity;
        }
        return sum + item.quantity;
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
}
