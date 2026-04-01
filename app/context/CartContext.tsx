"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: any;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  subtotal: number;
  total: number;
  isDonating: boolean;
  donationAmount: number;
  isInitialized: boolean;
  isCartOpen: boolean;
  toggleCart: () => void;
  toggleDonation: () => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDonating, setIsDonating] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const donationAmount = 500; // $5.00 in cents

  // 1. INITIAL LOAD: Pull from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("hose-draggers-cart");
    const savedDonation = localStorage.getItem("hose-draggers-donation");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from local storage", error);
      }
    }

    if (savedDonation === "true") {
      setIsDonating(true);
    }

    setIsInitialized(true);
  }, []);

  // 2. PERSISTENCE: Save to LocalStorage whenever cart or donation changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("hose-draggers-cart", JSON.stringify(cart));
      localStorage.setItem("hose-draggers-donation", isDonating.toString());
    }
  }, [cart, isDonating, isInitialized]);

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const toggleDonation = () => setIsDonating((prev) => !prev);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    // Auto-open the drawer when an item is added
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(id);
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setIsDonating(false);
    localStorage.removeItem("hose-draggers-cart");
    localStorage.removeItem("hose-draggers-donation");
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = isDonating ? subtotal + donationAmount : subtotal;

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        total,
        isDonating,
        donationAmount,
        isInitialized,
        isCartOpen,
        toggleCart,
        toggleDonation,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
