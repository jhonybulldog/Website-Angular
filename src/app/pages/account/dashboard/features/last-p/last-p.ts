import { Component, inject } from "@angular/core";
import { OrdiniService } from "../../../../shop/service/ordini.service";
import { DatePipe } from "@angular/common";
import { dashboard } from "../../dashboard";

@Component({
  imports: [DatePipe, dashboard],
  selector: "app-last-p",
  styleUrl: "./last-p.css",
  templateUrl: "./last-p.html",
})
export class LastP {
  private ordiniService = inject(OrdiniService);
  ordini = this.ordiniService.ordini;
}
