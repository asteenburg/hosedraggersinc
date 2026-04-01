"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useMemo } from "react";
import { useCart } from "@/app/context/CartContext";
import LocalFont from "next/font/local";
import {
  ShoppingCart,
  Heart,
  Zap,
  Plus,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import ProductModal from "@/components/ProductModal";
import CartDrawer from "@/components/CartDrawer";

const HoseFont = LocalFont({
  src: "../fonts/Billy_Ohio.ttf", // Make sure this is ONLY ./fonts
  variable: "--font-hose-draggers",
});

/* ---------------- DATA ---------------- */
import HoseDraggerHelmet from "@/public/images/hose-dragger-helmet.png";
import DiaDeMuertos from "@/public/images/dia-de-muertos.png";
import DiaDeMuertosCigar from "@/public/images/dia-de-muertos-cigar.png";
import DiaDeMuertosNozzle from "@/public/images/dia-de-muertos-nozzle.png";
import DiaDeMuertosChariot from "@/public/images/chariot-white-bg.png";
import DiaDeMuertosAxe from "@/public/images/dia-de-muertos-axe.png";
import DiaDeMuertosAxeW from "@/public/images/dia-de-muertos-axe-white.png";
import DiaDeMuertosPoint from "@/public/images/dia-de-muertos-point.png";
import Dalmation from "@/public/images/dalmatian.png";
import DalmationHydrant from "@/public/images/dalmation-hydrant.png";

const products = [
  {
    id: "hose-dragger-helmet",
    name: "Hose Dragger Helmet",
    price: 300,
    image: HoseDraggerHelmet,
    size: '3"x3"',
    options: ["Die-Cut Single", "Kiss-Cut Sheet"],
    upcharge: 200, // Additional 200 ($2.00) for Kiss-Cut
  },
  {
    id: "ddlmuertos",
    name: "Dia De Los Muertos",
    price: 300,
    image: DiaDeMuertos,
    size: '3"x3"',
  },
  {
    id: "ddlmuertos-cigar",
    name: "Dia De Los Muertos (Cigar)",
    price: 350,
    image: DiaDeMuertosCigar,
    size: '3"x3"',
  },
  {
    id: "ddlmuertos-nozzle",
    name: "Dia De Los Muertos (Nozzle)",
    price: 350,
    image: DiaDeMuertosNozzle,
    size: '3"x3"',
  },
  {
    id: "ddlmuertos-chariot",
    name: "Dia De Los Muertos (Mahalo)",
    price: 400,
    image: DiaDeMuertosChariot,
    size: '4"x3"',
  },
  {
    id: "ddlmuertos-axe",
    name: "Dia De Los Muertos (Axe)",
    price: 400,
    image: DiaDeMuertosAxe,
    size: '3"x3"',
  },
  {
    id: "ddlmuertos-axe-white",
    name: "Dia De Los Muertos (Axe)",
    price: 400,
    image: DiaDeMuertosAxeW,
    size: '3"x3"',
  },
  {
    id: "ddlmuertos-pointing",
    name: "Dia De Los Muertos (There)",
    price: 400,
    image: DiaDeMuertosPoint,
    size: '3"x3"',
  },
];

const kidsStickers = [
  {
    id: "Dalmation",
    name: "Fire Dalmatian",
    price: 200,
    image: Dalmation,
    size: '2"x2"',
  },
  {
    id: "Dalmation-Hydrant",
    name: "Hydrant Dalmatian",
    price: 200,
    image: DalmationHydrant,
    size: '2"x2"',
  },
];

/* ---------------- COMPONENTS ---------------- */

function BundleBuilder({ items }: { items: any[] }) {
  const { addToCart } = useCart();
  const [selected, setSelected] = useState<any[]>([]);
  const BUNDLE_PRICE = 1000; // $10.00 deal

  const handleAddBundle = () => {
    const names = selected.map((s) => s.name).join(", ");
    addToCart({
      id: `bundle-${Date.now()}`,
      name: `Sticker 3-Pack: ${names}`,
      price: BUNDLE_PRICE,
      image: selected[0].image,
    });
    setSelected([]);
  };

  return (
    <section className='bg-black rounded-[3rem] p-8 md:p-16 my-20 text-white relative overflow-hidden border border-orange-500/20'>
      <div className='absolute -right-20 -top-20 opacity-10 rotate-12'>
        <Zap
          size={400}
          fill='white'
        />
      </div>

      <div className='relative z-10 flex flex-col lg:flex-row gap-12'>
        <div className='lg:w-1/2'>
          <h2 className='text-5xl font-black uppercase tracking-tighter leading-none italic'>
            Pack <span className='text-orange-500'>Savings</span>
          </h2>
          <p className='text-gray-400 mt-4 font-bold uppercase tracking-widest text-xs'>
            Build a 3-sticker haul for just $10.00
          </p>

          <div className='flex gap-4 mt-8'>
            {[0, 1, 2].map((slot) => (
              <div
                key={slot}
                className={`w-24 h-24 rounded-2xl border-2 flex items-center justify-center relative bg-white/5 transition-all ${selected[slot] ? "border-orange-500 scale-105" : "border-dashed border-gray-700"}`}
              >
                {selected[slot] ? (
                  <Image
                    src={selected[slot].image}
                    alt='slot'
                    fill
                    className='p-3 object-contain'
                  />
                ) : (
                  <span className='text-gray-800 font-black text-2xl'>
                    {slot + 1}
                  </span>
                )}
              </div>
            ))}
          </div>

          <button
            disabled={selected.length < 3}
            onClick={handleAddBundle}
            className='mt-10 bg-orange-600 hover:bg-white hover:text-black disabled:opacity-20 px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all w-full md:w-auto'
          >
            Add Pack to Haul
          </button>
        </div>

        <div className='lg:w-1/2 grid grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-500'>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                selected.length < 3 && setSelected([...selected, item])
              }
              className='bg-gray-900 rounded-xl p-2 hover:bg-orange-500/20 transition-colors'
            >
              <div className='relative aspect-square w-full'>
                <Image
                  src={item.image}
                  alt='item'
                  fill
                  className='object-contain'
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAIN PAGE ---------------- */

export default function ShopPage() {
  const { cart, toggleDonation, isDonating } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <main
      className={`min-h-screen bg-gray-100 text-gray-900 ${HoseFont.variable} selection:bg-orange-500`}
    >
      {/* FLOATING UI */}
      <div className='fixed bottom-8 right-8 z-[51] flex flex-col items-end gap-4'>
        <button
          onClick={toggleDonation}
          className={`p-3 rounded-2xl shadow-xl border flex items-center gap-3 transition-all ${isDonating ? "bg-orange-500 text-white" : "bg-white text-gray-600"}`}
        >
          <Heart
            size={18}
            fill={isDonating ? "white" : "none"}
          />
          <span className='text-[10px] font-bold uppercase tracking-widest'>
            {isDonating ? "Supporting" : "Support?"}
          </span>
        </button>
        <button
          onClick={() => setIsCartOpen(true)}
          className='bg-black text-white p-4 rounded-full shadow-2xl relative'
        >
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className='absolute -top-2 -right-2 bg-orange-600 w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-white'>
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* HERO */}
      <section className='bg-black text-white py-24 px-6 text-center overflow-hidden relative'>
        <h1
          className={`${HoseFont.className} text-8xl md:text-[10rem] bg-gradient-to-r from-orange-500 to-orange-400/80 bg-clip-text text-transparent normal-case -rotate-2 drop-shadow-2xl`}
        >
          The Gear Locker
        </h1>

        <p className='text-gray-400 font-bold uppercase tracking-[0.4em] mt-6 text-xs'>
          Premium High-Heat Vinyl Decals
        </p>
      </section>

      <div className='max-w-7xl mx-auto px-6 py-20'>
        {/* LINEUP GRID */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-20'>
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              className='group cursor-pointer flex flex-col items-center'
            >
              <div className='relative aspect-square w-full bg-gray-50 rounded-3xl mb-4 flex items-center justify-center border border-transparent group-hover:border-gray-100 group-hover:bg-white group-hover:shadow-xl transition-all overflow-hidden'>
                <Image
                  src={p.image}
                  alt={p.name}
                  width={160}
                  height={160}
                  className='object-contain group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500'
                />
                <div className='absolute bottom-4 inset-x-4 bg-white py-2 text-[10px] font-bold text-center uppercase tracking-widest translate-y-12 group-hover:translate-y-0 transition-transform rounded-xl shadow-lg'>
                  Quick View
                </div>
              </div>
              <h3 className='font-bold text-sm text-center'>{p.name}</h3>
              <p className='text-orange-600 font-black'>
                ${(p.price / 100).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* BUNDLE BUILDER CTA */}
        <BundleBuilder items={products} />

        {/* KIDS SECTION */}
        <div className='bg-orange-50 rounded-[3rem] p-12 md:p-20 relative overflow-hidden'>
          <h2 className='text-4xl font-black uppercase tracking-tighter italic mb-10'>
            Little Firefighters
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {kidsStickers.map((k) => (
              <div
                key={k.id}
                onClick={() => setSelectedProduct(k)}
                className='cursor-pointer'
              >
                <div className='relative aspect-square bg-white rounded-3xl mb-4 p-6 shadow-sm flex items-center justify-center'>
                  <Image
                    src={k.image}
                    alt={k.name}
                    className='object-contain'
                    width={120}
                    height={120}
                  />
                </div>
                <p className='text-center font-bold text-sm uppercase'>
                  {k.name}
                </p>
                <p className='text-center text-orange-600 font-black'>
                  ${(k.price / 100).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
