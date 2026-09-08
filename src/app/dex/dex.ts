import { Component, inject, signal, computed } from "@angular/core";
import { DexService } from "./dex.service";
@Component({
  imports: [],
  selector: "app-dex",
  styleUrl: "./dex.css",
  templateUrl: "./dex.html",
})
export class Dex {

   dexService = inject(DexService);

  searchTerm = signal("")
   

  filtredTypes = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    if(term.length === 0 ){
      return this.dexService.typeOrder;
    }
    return this.dexService.typeOrder.filter(type => type.toLowerCase().includes(term))
  })

   onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  clearSearch(){
    this.searchTerm.set('')
  };
}
