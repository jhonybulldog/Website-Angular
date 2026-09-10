import { Component , input} from '@angular/core';
import { ListaProdotti } from '../prodotti.service';
@Component({
  imports: [],
  selector: 'app-productcard',
  styleUrl: './productcard.css',
  templateUrl: './productcard.html',
})
export class Productcard {

  proddi = input.required<ListaProdotti>()

}
