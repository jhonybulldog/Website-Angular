import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { NotificationService } from "../../../core/notification/notification-service";

@Injectable({ providedIn: "root" })
export class CompareService {
  private products = new BehaviorSubject<number[]>(
    JSON.parse(localStorage.getItem("compare") ?? "[]"),
  );
  products$ = this.products.asObservable();
  private active = new BehaviorSubject<boolean>(false);
  active$ = this.active.asObservable();
  private notificationSer = inject(NotificationService);

  toggle(id: number) {
    //attuali prodotti di products
    const current = this.products.value;

    //se product è gia all'interno di current
    const exists = current.includes(id);

    //se e presente
    if (exists) {
      //Rimuovi
      this.products.next(current.filter((p) => p !== id));
      console.log("prodotto rimosso");
    } else if (current.length >= 4) {
      //se sono gia presenti 4 prodotti notifica
      this.notificationSer.show("Puoi confrontare al massimo 4 prodotti", true);
    } else {
      //aggiungi
      this.products.next([...current, id]);
      console.log("prodotto aggiunto");
    }
    localStorage.setItem("compare", JSON.stringify(this.products.value));
  }

  //reset products
  resetproducts(id: number){
    const current = this.products.value;
    this.products.next(current.filter((p) => p !== id));
    localStorage.setItem("compare", JSON.stringify(this.products.value));
  }

  //
  isCompare$(id: number): Observable<boolean> {

    return this.products$.pipe(map((list) => list.includes(id)));
  }

  toggleActive() {
    this.active.next(!this.active.value);

  }
}
