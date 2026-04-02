"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "../app/context/CartContext";
import { X, ShoppingBag, Plus, Minus, Check } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onOpenCart?: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenCart,
}) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [cutType, setCutType] = useState<"Die-Cut" | "Kiss-Cut">("Die-Cut");

  const UPCHARGE = cutType === "Kiss-Cut" ? 100 : 0;
  const finalPrice = product.price + UPCHARGE;

  const handleAdd = () => {
    setIsAdding(true);
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: `${product.id}-${cutType}`,
        name: `${product.name} (${cutType})`,
        price: finalPrice,
        image: product.image,
        quantity: 1, // <--- Add this line here
      });
    }

    setTimeout(() => {
      setIsAdding(false);
      onClose();
      if (onOpenCart) onOpenCart();
    }, 500);
  };

  return (
    <div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4 overflow-y-auto'>
      <div
        className='absolute inset-0'
        onClick={onClose}
      />

      {/* MODAL CONTAINER: Added max-h and tighter padding */}
      <div className='bg-white rounded-[2rem] p-6 max-w-sm w-full relative shadow-2xl animate-in zoom-in duration-300 overflow-hidden max-h-[95vh] flex flex-col'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10'
        >
          <X size={18} />
        </button>

        <div className='flex flex-col items-center'>
          {/* SMALLER IMAGE: Reduced from w-48 to w-32 */}
          <div className='relative w-32 h-32 mb-4'>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className='object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)]'
            />
          </div>

          <h3 className='text-2xl font-black uppercase tracking-tighter text-center leading-tight'>
            {product.name}
          </h3>
          <p className='text-orange-600 font-black text-xl mt-1'>
            ${(finalPrice / 100).toFixed(2)}
          </p>

          {/* COMPACT SELECTION */}
          <div className='w-full mt-4 space-y-2'>
            <p className='text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 text-center mb-1'>
              Select Your Finish
            </p>

            <div className='grid grid-cols-1 gap-2'>
              <button
                onClick={() => setCutType("Die-Cut")}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                  cutType === "Die-Cut"
                    ? "border-orange-500 bg-orange-50/50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className='flex flex-col items-start'>
                  <span className='font-bold text-xs'>Die-Cut Single</span>
                  <span className='text-[9px] text-gray-400 uppercase'>
                    Contour Cut
                  </span>
                </div>
                {cutType === "Die-Cut" && (
                  <Check
                    size={14}
                    className='text-orange-600'
                  />
                )}
              </button>

              <button
                onClick={() => setCutType("Kiss-Cut")}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                  cutType === "Kiss-Cut"
                    ? "border-orange-500 bg-orange-50/50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className='flex flex-col items-start'>
                  <span className='font-bold text-xs'>Kiss-Cut Sheet</span>
                  <span className='text-[9px] text-gray-400 uppercase'>
                    Easy-Peel
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-[9px] font-bold text-orange-600'>
                    +$1.00
                  </span>
                  {cutType === "Kiss-Cut" && (
                    <Check
                      size={14}
                      className='text-orange-600'
                    />
                  )}
                </div>
              </button>
            </div>
          </div>

          <div className='w-full h-[1px] bg-gray-50 my-4' />

          {/* COMPACT QUANTITY SELECTION */}
          <div className='flex items-center justify-between w-full px-4 mb-6'>
            <span className='text-[10px] font-bold uppercase tracking-widest text-gray-400'>
              Quantity
            </span>
            <div className='flex items-center border border-gray-100 rounded-lg bg-gray-50 p-0.5'>
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className='p-1 px-3 hover:text-orange-500 transition-colors'
              >
                <Minus size={14} />
              </button>
              <span className='w-6 text-center text-xs font-bold'>{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className='p-1 px-3 hover:text-orange-500 transition-colors'
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 text-sm ${
              isAdding
                ? "bg-green-600 text-white"
                : "bg-black text-white hover:bg-orange-600"
            }`}
          >
            {isAdding ? (
              "Adding..."
            ) : (
              <>
                <ShoppingBag size={16} /> Add to Haul
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
