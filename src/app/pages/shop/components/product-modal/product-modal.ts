import { Component , inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog'
import { CartService } from '../../service/cart.service';
import { LoginService } from '../../../../core/login/service/login.service';
import { RouterLink } from '@angular/router';
import { ProdottiService } from '../../service/prodotti.service';
import { Loader } from '../../../../shared/loader/loader';
@Component({
  imports: [RouterLink, Loader],
  selector: 'app-product-modal',
  styleUrl: './product-modal.css',
  templateUrl: './product-modal.html',
})
export class ProductModal {
  private carrello = inject(CartService);
  private loginser = inject(LoginService);
  private prodottiser = inject(ProdottiService);
  private productId = inject<number>(DIALOG_DATA);
  dialogRef = inject(DialogRef);
  loggedIn = this.loginser.loggedIn;

  prodotto$ = this.prodottiser.productdetail(this.productId);

  addtoCart(id: number) {
    this.carrello.addToCart(id);
  }
}

