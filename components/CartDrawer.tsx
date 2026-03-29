"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { X, Minus, Plus, Trash2, ArrowRight, Heart, Gift } from "lucide-react";

/* --- RECOMMENDATION ASSETS --- */
import Dalmation from "@/public/images/dalmatian.png";
import DalmationHydrant from "@/public/images/dalmation-hydrant.png";

const RECOMMENDATIONS = [
  { id: "Dalmation", name: "Fire Dalmatian", price: 200, image: Dalmation },
  {
    id: "Dalmation-Hydrant",
    name: "Hydrant Dalmatian",
    price: 200,
    image: DalmationHydrant,
  },
];

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const {
    cart,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    addToCart,
    isDonating,
    donationAmount,
  } = useCart();

  const filteredRecs = RECOMMENDATIONS.filter(
    (rec) => !cart.some((item) => item.id.includes(rec.id)),
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-[55] flex justify-end'>
      {/* BACKDROP */}
      <div
        className='absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300'
        onClick={onClose}
      />

      {/* DRAWER PANEL */}
      <div className='relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500'>
        {/* HEADER */}
        <div className='p-6 border-b flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-black uppercase tracking-tighter italic'>
              Your Haul
            </h2>
            <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>
              {cart.length} {cart.length === 1 ? "Item" : "Items"} Ready to Ship
            </p>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <X size={24} />
          </button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className='flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide'>
          {/* CART ITEMS LIST */}
          <div className='space-y-6'>
            {cart.length === 0 ? (
              <div className='py-20 text-center'>
                <p className='text-gray-400 font-medium'>
                  Your locker is empty.
                </p>
                <button
                  onClick={onClose}
                  className='mt-4 text-orange-600 font-black uppercase text-sm underline underline-offset-4'
                >
                  Grab some Gear
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className='flex gap-4 items-start'
                >
                  <div className='relative w-20 h-20 bg-gray-50 rounded-2xl flex-shrink-0 p-2 border border-gray-100'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className='object-contain p-1'
                    />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <p className='font-bold text-gray-900 leading-tight truncate'>
                      {/* Removes the (Die-Cut) or (Kiss-Cut) from the title text for a cleaner look */}
                      {item.name.split(" (")[0]}
                    </p>

                    {/* NEW: CUT TYPE BADGE */}
                    <div className='inline-block mt-1 px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded-md'>
                      <p className='text-[8px] font-black uppercase tracking-wider text-gray-600'>
                        {item.id.includes("Kiss-Cut")
                          ? "Kiss-Cut Sheet"
                          : "Die-Cut Single"}
                      </p>
                    </div>

                    <p className='text-orange-600 font-black mt-1 text-sm'>
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </p>

                    <div className='flex items-center gap-3 mt-3'>
                      <div className='flex items-center border rounded-xl bg-gray-50 p-0.5'>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className='p-1 px-2 hover:text-orange-600 transition-colors'
                        >
                          <Minus size={12} />
                        </button>
                        <span className='w-6 text-center text-xs font-bold'>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className='p-1 px-2 hover:text-orange-600 transition-colors'
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className='text-gray-300 hover:text-red-500 transition-colors ml-auto'
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* DONATION STATUS */}
          {isDonating && (
            <div className='bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2'>
              <div className='bg-orange-500 p-2 rounded-lg text-white'>
                <Heart
                  size={20}
                  fill='white'
                />
              </div>
              <div className='flex-1'>
                <p className='text-xs font-bold uppercase tracking-tight text-orange-800'>
                  Mission Support Added
                </p>
                <p className='text-[10px] text-orange-600 font-medium leading-tight'>
                  Thank you for supporting the crew.
                </p>
              </div>
              <span className='font-black text-orange-800'>
                ${(donationAmount / 100).toFixed(2)}
              </span>
            </div>
          )}

          {/* RECOMMENDED ADD-ONS */}
          {filteredRecs.length > 0 && (
            <div className='pt-8 border-t border-dashed border-gray-200'>
              <div className='flex items-center gap-2 mb-4'>
                <Gift
                  size={16}
                  className='text-orange-500'
                />
                <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400'>
                  Quick Locker Add-ons
                </h3>
              </div>
              <div className='space-y-3'>
                {filteredRecs.map((rec) => (
                  <div
                    key={rec.id}
                    className='flex items-center gap-4 bg-gray-50 p-3 rounded-2xl group border border-transparent hover:border-orange-200 transition-all'
                  >
                    <div className='relative w-12 h-12 bg-white rounded-xl p-1 shadow-sm'>
                      <Image
                        src={rec.image}
                        alt={rec.name}
                        fill
                        className='object-contain p-1'
                      />
                    </div>
                    <div className='flex-1'>
                      <p className='text-xs font-bold truncate'>{rec.name}</p>
                      <p className='text-orange-600 font-black text-xs mt-0.5'>
                        ${(rec.price / 100).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(rec)}
                      className='bg-white p-2 rounded-lg shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all'
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className='p-6 bg-gray-50 border-t space-y-4'>
          <div className='flex justify-between items-center mb-2 px-1'>
            <span className='text-gray-400 font-bold uppercase text-[10px] tracking-widest'>
              Total Haul
            </span>
            <span className='text-3xl font-[family-name:var(--font-my-custom-font)] text-orange-600 leading-none'>
              ${(total / 100).toFixed(2)}
            </span>
          </div>

          <Link
            href='/checkout'
            onClick={onClose}
            className='block'
          >
            <button
              disabled={cart.length === 0}
              className='w-full bg-black hover:bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl disabled:bg-gray-200 disabled:shadow-none'
            >
              Secure Checkout <ArrowRight size={20} />
            </button>
          </Link>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className='w-full text-center text-gray-400 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest transition-colors'
            >
              Empty Locker
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
