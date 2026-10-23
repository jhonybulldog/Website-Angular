import { Component, inject, input } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { catchError, EMPTY, Observable, switchMap } from "rxjs";
import { CompareService } from "../../service/compare-service";
import { ProdottiService } from "../../service/prodotti.service";
import { Loader } from "../../../../shared/loader/loader";
import { ProductDetails } from "../../models/prodotti.model";

@Component({
  imports: [Loader],
  selector: "app-compare-column",
  styleUrl: "./compare-column.css",
  templateUrl: "./compare-column.html",
})
export class CompareColumn {
  private compareSer = inject(CompareService);
  private prodottiser = inject(ProdottiService);
  id = input.required<number>();
  private id$ = toObservable(this.id);

  product$: Observable<ProductDetails> = this.id$.pipe(
    switchMap((id) =>
      this.prodottiser.productdetail(id).pipe(
        catchError(() => {
          this.compareSer.resetproducts(id);
          return EMPTY;
        }),
      ),
    ),
  );

  rimuovi() {
    this.compareSer.toggle(this.id());
  }
}