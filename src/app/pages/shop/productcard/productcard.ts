import { Component, input } from "@angular/core";
import { ListaProdotti } from "../prodotti.service";
import { RouterLink } from "@angular/router";
@Component({
  imports: [RouterLink],
  selector: "app-productcard",
  styleUrl: "./productcard.css",
  templateUrl: "./productcard.html",
})
export class Productcard {
  proddi = input.required<ListaProdotti>();
}
