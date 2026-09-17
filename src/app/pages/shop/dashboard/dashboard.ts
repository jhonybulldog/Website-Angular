import { Component , inject} from '@angular/core';
import { OrdiniService } from '../ordini.service';
import { CartService } from '../carrello/cart.service';
@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private ordiniser = inject(OrdiniService)
  ordini = this.ordiniser.ordini;
  private carelloser = inject(CartService)
}
