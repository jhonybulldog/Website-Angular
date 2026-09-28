import { Component, input, model } from "@angular/core";
import { Category } from "../prodotti.service";

@Component({
  selector: "app-categoryselect",
  styleUrl: "./categoryselect.css",
  templateUrl: "./categoryselect.html",
})
export class Categoryselect {
  categorie = input.required<Category[]>();
  value = model.required<string>();
}