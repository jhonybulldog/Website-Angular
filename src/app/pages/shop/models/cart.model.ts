import { ProductDetails } from "./prodotti.model";
export interface ProdottiCarrello {
  prodotto: ProductDetails;
  quantita: number;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  total: number;
  products: CartProduct[];
}
