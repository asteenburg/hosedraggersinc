"use client";

import { useCart, CartItem } from "@/app/context/CartContext";
import { Plus, Minus, X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// If you have static imports for recommendations, they look like this:
// import stickerAxe from "@/public/stickers/axe.png";

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { cart, updateQuantity, removeFromCart, subtotal, addToCart } =
    useCart();

  // Example Recommendations logic that was causing your build error
  const recommendations = [
    {
      id: "rec-1",
      name: "Classic Fire Axe Sticker",
      price: 500,
      // If this is a StaticImageData object from an import,
      // we handle it in the onClick below.
      image: "/stickers/axe-gold.png",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-hidden'>
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col'>
        {/* HEADER */}
        <div className='p-6 border-b flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <ShoppingBag className='text-orange-600' />
            <h2 className='text-xl font-black uppercase italic tracking-tighter'>
              Your Gear
            </h2>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <X size={24} />
          </button>
        </div>

        {/* CART ITEMS */}
        <div className='flex-1 overflow-y-auto p-6 space-y-6'>
          {cart.length === 0 ? (
            <div className='text-center py-20'>
              <p className='text-gray-400 font-bold uppercase tracking-widest text-sm'>
                Your cart is empty
              </p>
              <button
                onClick={onClose}
                className='mt-4 text-orange-600 font-black uppercase text-xs border-b-2 border-orange-600'
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
                <div className='relative h-20 w-20 bg-gray-50 rounded-xl border p-2'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className='object-contain p-1'
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='font-black uppercase text-sm leading-tight'>
                    {item.name}
                  </h3>
                  <p className='text-orange-600 font-bold text-xs mt-1'>
                    ${(item.price / 100).toFixed(2)}
                  </p>

                  <div className='flex items-center gap-3 mt-3'>
                    <div className='flex items-center border rounded-lg overflow-hidden'>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className='p-1 px-2 hover:bg-gray-100'
                      >
                        <Minus size={12} />
                      </button>
                      <span className='px-2 text-xs font-bold'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className='p-1 px-2 hover:bg-gray-100'
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className='text-[10px] font-black uppercase text-gray-400 hover:text-red-500 transition-colors'
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* RECOMMENDATIONS SECTION (The part that caused the error) */}
          <div className='pt-10'>
            <h4 className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4'>
              Add to your order
            </h4>
            <div className='grid grid-cols-1 gap-3'>
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className='group flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-100'
                >
                  <div className='flex items-center gap-3'>
                    <div className='h-12 w-12 relative'>
                      <Image
                        src={rec.image}
                        alt={rec.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                    <div>
                      <p className='text-xs font-black uppercase'>{rec.name}</p>
                      <p className='text-[10px] font-bold text-gray-500'>
                        ${(rec.price / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      addToCart({
                        id: rec.id,
                        name: rec.name,
                        price: rec.price,
                        // FIX: Ensure image is a string. If 'rec.image' is a StaticImageData object,
                        // use 'rec.image.src'. If it's already a string, just use 'rec.image'.
                        image:
                          typeof rec.image === "string"
                            ? rec.image
                            : (rec.image as any).src,
                      })
                    }
                    className='p-2 bg-white rounded-lg shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all'
                  >
                    <Plus size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className='p-6 border-t bg-gray-50/50'>
          <div className='flex justify-between items-end mb-6'>
            <span className='text-xs font-black uppercase tracking-widest text-gray-400'>
              Subtotal
            </span>
            <span className='text-3xl font-black tracking-tighter italic'>
              ${(subtotal / 100).toFixed(2)}
            </span>
          </div>

          <Link
            href='/checkout'
            onClick={onClose}
            className='block w-full bg-black text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-black/10 active:scale-[0.98]'
          >
            Checkout Now
          </Link>
        </div>
      </div>
    </div>
  );
}
