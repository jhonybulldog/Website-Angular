export interface ProductDetails {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
}

export interface Category {
  slug: string;
  name: string;
}
