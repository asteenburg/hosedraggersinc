"use client";

import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    isDonating,
    donationAmount,
    subtotal: total, // <--- This maps subtotal to the name 'total'
  } = useCart();

  return (
    <>
      {/* OVERLAY - z-[100] ensures it covers the Navbar */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100 z-[100]" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* DRAWER PANEL - z-[110] stays on top of the overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? "translate-x-0 z-[110]" : "translate-x-full"
        }`}
      >
        <div className='flex flex-col h-full'>
          {/* HEADER */}
          <div className='p-6 border-b flex items-center justify-between bg-black text-white'>
            <div className='flex items-center gap-3'>
              <ShoppingBag className='text-orange-500' />
              <h2 className='text-xl font-black uppercase tracking-tighter'>
                Compartment
              </h2>
            </div>
            <button
              onClick={onClose}
              className='p-2 hover:bg-white/10 rounded-full transition-colors'
            >
              <X size={24} />
            </button>
          </div>

          {/* CART ITEMS */}
          <div className='flex-grow overflow-y-auto p-6 space-y-6'>
            {cart.length === 0 ? (
              <div className='text-center py-20'>
                <p className='text-gray-400 font-bold uppercase tracking-widest text-sm'>
                  Your cart is empty
                </p>
                <button
                  onClick={onClose}
                  className='mt-4 text-orange-600 font-black uppercase text-xs hover:underline'
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className='flex gap-4 items-center'
                >
                  <div className='relative w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 flex-shrink-0'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className='object-contain p-2'
                    />
                  </div>
                  <div className='flex-grow'>
                    <h3 className='font-bold text-gray-900 text-sm uppercase leading-tight'>
                      {item.name}
                    </h3>
                    <p className='text-orange-600 font-black text-sm'>
                      ${(item.price / 100).toFixed(2)}
                    </p>
                    <div className='flex items-center gap-3 mt-2'>
                      <div className='flex items-center border rounded-lg bg-gray-50'>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className='p-1 px-2 hover:text-orange-600'
                        >
                          <Minus size={14} />
                        </button>
                        <span className='text-xs font-bold w-4 text-center'>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className='p-1 px-2 hover:text-orange-600'
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className='text-gray-400 hover:text-red-500 transition-colors'
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER / TOTALS */}
          {cart.length > 0 && (
            <div className='p-6 border-t bg-gray-50 space-y-4'>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm font-bold text-gray-500'>
                  <span>Subtotal</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
                {isDonating && (
                  <div className='flex justify-between text-sm font-bold text-green-600'>
                    <span>Crew Donation</span>
                    <span>${(donationAmount / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className='flex justify-between text-xl font-black uppercase tracking-tighter text-gray-900 pt-2 border-t border-gray-200'>
                  <span>Total</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
              </div>

              <Link
                href='/checkout'
                onClick={onClose}
                className='block w-full'
              >
                <button className='w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-600 transition-all hover:scale-[1.02] active:scale-95 shadow-xl'>
                  Proceed to Checkout <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
