export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  offer: number;
  category: string;
  material?: string;
  gender?: string;
  occasion?: string;
  boughtQuantity: number;
  stock: number;
  tags?: string[];
  priority?: number;
  expiryDate?: string | Date;
  imageUrls: string[];
  discountedPrice: number;
}
