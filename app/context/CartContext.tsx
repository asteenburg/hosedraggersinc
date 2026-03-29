"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

/* ---------------- TYPES ---------------- */

export type CartItem = {
  id: string;
  name: string;
  price: number; // in cents
  image: any;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  total: number; // total in cents
  isDonating: boolean; // NEW
  donationAmount: number; // NEW
  toggleDonation: () => void; // NEW
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

/* ---------------- CONTEXT ---------------- */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDonating, setIsDonating] = useState(false); // NEW
  const [isInitialized, setIsInitialized] = useState(false);

  const donationAmount = 500; // $5.00 in cents

  // 1. Load cart & donation from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart-storage");
    const savedDonation = localStorage.getItem("donation-storage");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }

    if (savedDonation) {
      setIsDonating(savedDonation === "true");
    }

    setIsInitialized(true);
  }, []);

  // 2. Save cart & donation to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart-storage", JSON.stringify(cart));
      localStorage.setItem("donation-storage", isDonating.toString());
    }
  }, [cart, isDonating, isInitialized]);

  /* TOGGLE DONATION */
  const toggleDonation = () => setIsDonating((prev) => !prev);

  /* ADD ITEM */
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  /* UPDATE QUANTITY */
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  /* REMOVE ITEM */
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  /* CLEAR CART */
  const clearCart = () => {
    setCart([]);
    setIsDonating(false); // Reset donation on clear
  };

  /* TOTAL CALCULATION */
  // The base total of products
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  // Add donation if active
  const total = isDonating ? subtotal + donationAmount : subtotal;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
        isDonating, // EXPOSED
        donationAmount, // EXPOSED
        toggleDonation, // EXPOSED
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
