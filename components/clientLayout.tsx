"use client";

import { CartProvider, useCart } from "@/app/context/CartContext";
import Navbar from "./navbar";
import CartDrawer from "./CartDrawer";
import { ShoppingCart, Heart } from "lucide-react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <ClientContent>{children}</ClientContent>
    </CartProvider>
  );
}

function ClientContent({ children }: { children: React.ReactNode }) {
  const { cart, isDonating, toggleDonation, isCartOpen, toggleCart } =
    useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Navbar sits at the top of the page */}
      <Navbar onCartOpen={toggleCart} />

      <main className='relative z-0'>{children}</main>

      {/* Floating UI - High Z-index but lower than Drawer */}
      <div className='fixed bottom-28 right-8 z-[90] flex flex-col items-end gap-4 pointer-events-none'>
        <button
          onClick={toggleDonation}
          className={`pointer-events-auto flex items-center gap-3 p-3 rounded-2xl shadow-xl border transition-all ${
            isDonating
              ? "bg-orange-600 border-orange-500 text-white"
              : "bg-white border-gray-100 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Heart
            size={18}
            fill={isDonating ? "white" : "none"}
          />
          <span className='text-[10px] font-black uppercase tracking-tighter'>
            {isDonating ? "Supporting" : "Support the Crew"}
          </span>
        </button>

        <button
          onClick={toggleCart}
          className='pointer-events-auto bg-black text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group relative border-4 border-white'
        >
          <ShoppingCart size={28} />
          {itemCount > 0 && (
            <span className='absolute -top-1 -right-1 bg-orange-600 text-white text-[11px] w-7 h-7 rounded-full flex items-center justify-center font-black border-2 border-white'>
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* CartDrawer - Highest Z-index to cover Navbar and content */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
      />
    </>
  );
}
