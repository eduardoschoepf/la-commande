export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'sanduiche' | 'bebida' | 'adicional';
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerData {
  name: string;
  phone: string;
  address: string;
  neighborhood: string;
  paymentMethod: string;
}