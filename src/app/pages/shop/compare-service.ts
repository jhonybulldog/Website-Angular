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
    //attuali prodotti di products
    const current = this.products.value;
    
    //se product è gia all'interno di current
    const exists = current.find((p) => p.id === product.id);

    //se e presente
    if (exists) {
      //Rimuovi
      this.products.next(current.filter((p) => p.id !== product.id));
      console.log("prodotto rimosso")
    }else if(current.length >= 4){
      //se sono gia presenti 4 prodotti notifica
           this.notificationSer.show("Puoi confrontare al massimo 4 prodotti", true);
    }else {
      //aggiungi
      this.products.next([...current, product])
      console.log("prodotto aggiunto")
    }
  }

  //
  isCompare$(id: number): Observable<boolean>{
    return this.products$.pipe(map((list) => !!list.find((p)=> p.id === id)))
  }

  toggleActive() {
    this.active.next(!this.active.value);
    if (this.active.value == false) {
      this.products.next([]);
    }
  }
}
