import { Component, inject } from '@angular/core';
import { CompareService } from '../../service/compare-service';
import { ProdottiService } from '../../service/prodotti.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ProductDetails } from '../../models/prodotti.model';

@Component({
  imports: [AsyncPipe, RouterLink],
  selector: 'app-compare',
  styleUrl: './compare.css',
  templateUrl: './compare.html',
})
export class Compare {
  private compareSer = inject(CompareService);
  private prodottiser = inject(ProdottiService);
  loading$: Observable<boolean> = this.prodottiser.loading$


  products$: Observable<Observable<ProductDetails>[]> = this.compareSer.products$.pipe(
    map((list) => list.map((id) => this.prodottiser.productdetail(id).pipe(catchError
      ((error)=>{
        this.compareSer.resetproducts(id);
        return throwError(()=> error);
      })
    ))),
    
  );
  rimuovi(id: number) {
  this.compareSer.toggle(id);
}
}