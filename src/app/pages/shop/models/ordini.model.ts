import { CartProduct } from "./cart.model";
export interface ordine {
  id: number;
  data: string;
  prodotti: CartProduct[];
  totale: number;
  indirizzo: string;
  metodoPagamento: string;
}
