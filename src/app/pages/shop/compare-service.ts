import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { ProductDetails } from "./prodotti.service";
import { NotificationService } from "./notification/notification-service";

@Injectable({ providedIn: "root" })
export class CompareService {
  private products = new BehaviorSubject<ProductDetails[]>([]);
  products$ = this.products.asObservable();
  private active = new BehaviorSubject<boolean>(false);
  active$ = this.active.asObservable();
  private notificationSer = inject(NotificationService)
  toggle(product: ProductDetails) {
    const current = this.products.value;
  
    const exists = current.some((p) => p.id === product.id);
    if (exists) {
      this.products.next(current.filter((p) => p.id !== product.id));
      console.log("tolto dalla comparazione");
    }else if(current.length >= 4){
           this.notificationSer.show("Puoi confrontare al massimo 4 prodotti");
    }else {
      this.products.next([...current, product]);
      console.log("aggiunto alla comparazione");
    }
  }

  isCompare$(id: number): Observable<boolean> {
    return this.products$.pipe(map((list) => list.some((p) => p.id === id)));
  }

  toggleActive() {
    this.active.next(!this.active.value);
    if (this.active.value == false) {
      this.products.next([]);
    }
  }
}
