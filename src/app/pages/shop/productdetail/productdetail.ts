import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ListaProdotti, Prodotti } from "../prodotti.service";
import { CartService } from "../carrello/cart.service";
@Component({
  imports: [RouterLink],
  standalone: true,
  selector: "app-productdetail",
  styleUrl: "./productdetail.css",
  templateUrl: "./productdetail.html",
  providers: [Prodotti]
})
export class Productdetail implements OnInit {
  private route = inject(ActivatedRoute)
  private prodottiser = inject(Prodotti)
  private carrello = inject(CartService)

  idprodotto: string | null = null;
  prodotto: ListaProdotti | undefined;
  ngOnInit(): void {
    this.idprodotto = this.route.snapshot.paramMap.get("id");

    const id = Number(this.idprodotto);
    this.prodotto = this.prodottiser.prod.find(prodotto => prodotto.id === id);
  }
  
  
  aggiungicarrello(){
    if(this.prodotto !== undefined){
    this.carrello.aggiungiCarrello(this.prodotto)
    }else{
      console.log("non aggiunto al carrello")
    }
  }
}
