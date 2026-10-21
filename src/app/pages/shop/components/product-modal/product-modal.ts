import { Component , inject} from '@angular/core';
import { ProductDetails } from '../../models/prodotti.model';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog'
import { CartService } from '../../service/cart.service';
import { LoginService } from '../../../../core/login/service/login.service';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-product-modal',
  styleUrl: './product-modal.css',
  templateUrl: './product-modal.html',
})
export class ProductModal {
  private carrello = inject(CartService)
  private loginser = inject(LoginService)
   data = inject<ProductDetails>(DIALOG_DATA)
   dialogRef = inject(DialogRef)
   loggedIn = this.loginser.loggedIn;
   addtoCart(id: number){
    this.carrello.addToCart(id)
   }
}

