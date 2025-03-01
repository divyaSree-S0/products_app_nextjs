import { create } from 'zustand';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type StoreState = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
};

export const useStore = create<StoreState>((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => ({ cart: [...state.cart, product] })),
}));

type ProductState = {
  products: {
    id: number;
    name: string;
    rating: number;
    price: number;
    image: string;
    desc: string;
  }[];
};

export const useProductStore = create<ProductState>(() => ({
  products: [
    {
      id: 1,
      name: "Unicorn Sprinkles",
      rating: 4.0,
      price: 7.8,
      image: "/donut1.png",
      desc: "A fluffy fresh cooked donut covered by a creamy strawberry flavour with rainbow sprinkles.",
    },
    {
      id: 2,
      name: "Dark Sprinkles",
      rating: 4.0,
      price: 6.8,
      image: "/donut2.png",
      desc: "Chocolate with sprinkles.",
    },
    {
      id: 1,
      name: "Unicorn Sprinkles",
      rating: 4.0,
      price: 7.8,
      image: "/donut1.png",
      desc: "A fluffy fresh cooked donut covered by a creamy strawberry flavour with rainbow sprinkles.",
    },
    {
      id: 2,
      name: "Dark Sprinkles",
      rating: 4.0,
      price: 6.8,
      image: "/donut2.png",
      desc: "Chocolate with sprinkles.",
    },{
      id: 2,
      name: "Dark Sprinkles",
      rating: 4.0,
      price: 6.8,
      image: "/donut2.png",
      desc: "Chocolate with sprinkles.",
    },
  ],
}));
