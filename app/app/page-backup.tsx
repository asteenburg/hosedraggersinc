"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "./context/CartContext";
import ProductModal from "../components/ProductModal";
import CartDrawer from "../components/CartDrawer";
import LocalFont from "next/font/local";
import { ShoppingCart, Heart } from "lucide-react";
import DCDescription from "./DCDescription";

// Asset Imports
import HoseDraggersHero from "../public/images/hose-draggers-hero.png";
import HoseDraggerHelmet from "../public/images/7AD82404-B265-4DCB-97FE-6785D25DC9C7.png";
import DiaDeMuertos from "../public/images/dia-de-muertos.png";
import DiaDeMuertosCigar from "../public/images/dia-de-muertos-cigar.png";
import DiaDeMuertosNozzle from "../public/images/dia-de-muertos-nozzle.png";
import DiaDeMuertosChariot from "../public/images/dia-de-muertos-chariot.png";
import DiaDeMuertosAxe from "../public/images/dia-de-muertos-axe.png";
import DiaDeMuertosPoint from "../public/images/dia-de-muertos-point.png";
import DiaDeMuertosAxeW from "../public/images/dia-de-muertos-axe-white.png";

const myCustomFont = LocalFont({
  src: "../public/fonts/billy ohio.ttf",
  variable: "--font-my-custom-font",
});

const products = [
  {
    id: "hose-dragger-helmet",
    name: "Hose Dragger Helmet",
    price: 300,
    image: HoseDraggerHelmet,
  },
  {
    id: "ddlmuertos",
    name: "Dia De Los Muertos",
    price: 300,
    image: DiaDeMuertos,
  },
  {
    id: "ddlmuertos-cigar",
    name: "Dia De Los Muertos (Cigar)",
    price: 350,
    image: DiaDeMuertosCigar,
  },
  {
    id: "ddlmuertos-nozzle",
    name: "Dia De Los Muertos (Nozzle)",
    price: 350,
    image: DiaDeMuertosNozzle,
  },
  {
    id: "ddlmuertos-chariot",
    name: "Dia De Los Muertos (Mahalo)",
    price: 400,
    image: DiaDeMuertosChariot,
  },
  {
    id: "ddlmuertos-axe",
    name: "Dia De Los Muertos (Axe)",
    price: 400,
    image: DiaDeMuertosAxe,
  },
  {
    id: "ddlmuertos-axe-white",
    name: "Dia De Los Muertos (Axe)",
    price: 400,
    image: DiaDeMuertosAxeW,
  },
  {
    id: "ddlmuertos-pointing",
    name: "Dia De Los Muertos (There)",
    price: 400,
    image: DiaDeMuertosPoint,
  },
];

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false); // Controls the drawer

  const { cart, isDonating, toggleDonation } = useCart();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main
      className={`min-h-screen bg-slate-50 text-gray-900 ${myCustomFont.variable} ...`}
    >
      {/* FLOATING CART UI (Z-INDEX 51+) */}
      <div className='fixed bottom-8 right-8 z-[51] flex flex-col items-end gap-4'>
        <button
          onClick={toggleDonation}
          className={`flex items-center gap-3 p-3 rounded-2xl shadow-xl border transition-all ${isDonating ? "bg-orange-500 border-orange-400 text-white" : "bg-white border-gray-100 text-gray-600 hover:bg-gray-50"}`}
        >
          <Heart
            size={18}
            fill={isDonating ? "white" : "none"}
          />
          <span className='text-[10px] font-bold uppercase tracking-tighter'>
            {isDonating ? "Supporting" : "Support the Crew"}
          </span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className='bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group relative'
        >
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className='absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-white'>
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* CART DRAWER (Z-INDEX 55) */}
      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* MEGA HERO SECTION */}
      <section className='relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-between overflow-hidden bg-black pt-20 lg:pt-0'>
        <div
          className='absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/10 blur-[150px] rounded-full transition-transform duration-700 ease-out'
          style={{
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          }}
        />

        <div className='relative mt-24 z-30 px-6 lg:pl-20 lg:w-[45%] text-center lg:text-left'>
          <h1 className='text-6xl lg:text-[8rem] xl:text-[10rem] text-white font-black tracking-tighter uppercase leading-[0.8]'>
            Stickers <br /> Match Your <br />
            <span className='font-[family-name:var(--font-my-custom-font)] text-orange-500 normal-case text-8xl lg:text-[12rem] xl:text-[14rem] inline-block -rotate-3 mt-4'>
              Vibe
            </span>
          </h1>
          <p className='mt-12 text-gray-400 text-lg lg:text-xl font-bold uppercase tracking-[0.3em] max-w-md mx-auto lg:mx-0'>
            Premium High-Heat Decals
          </p>

          <Link href='/shop'>
            <button className='mt-8 mb-20 px-10 py-5 bg-orange-600 text-white font-black uppercase tracking-[0.2em] rounded-full transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-95 shadow-2xl'>
              Shop Stickers
            </button>
          </Link>
        </div>

        <div className='relative z-20 lg:w-[60%] h-full flex items-center lg:justify-end mt-12 lg:mt-0'>
          <div
            className='relative w-full aspect-square lg:h-[95vh] lg:w-[120%] lg:-mr-[15%] transition-transform duration-300 ease-out'
            style={{
              transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px) rotate(${mousePos.x * 0.5}deg)`,
            }}
          >
            <Image
              src={HoseDraggersHero}
              alt='Hero'
              className='object-contain lg:object-right select-none drop-shadow-[-30px_30px_60px_rgba(0,0,0,0.9)]'
              fill
              priority
              sizes='(max-width: 1024px) 100vw, 60vw'
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className='bg-white -mt-12 pt-24 pb-20 px-6 rounded-t-[4rem] relative z-40'>
        <div className='flex items-center gap-4 mb-12'>
          <h2
            className='text-4xl font-black uppercase tracking-tighter'
            id='stickers'
          >
            The Lineup
          </h2>
          <div className='h-[2px] flex-grow bg-gray-100' />
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10'>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenCart={() => setIsCartOpen(true)} // This triggers the drawer
        />
      )}

      <DCDescription />
    </main>
  );
}

function ProductCard({ product, onView }: any) {
  return (
    <button
      onClick={onView}
      className='group flex flex-col items-center w-full text-left'
    >
      <div className='relative w-full aspect-square bg-gray-50 rounded-3xl mb-4 overflow-hidden flex items-center justify-center border border-transparent transition-all group-hover:bg-white group-hover:border-gray-100 group-hover:shadow-xl'>
        <Image
          src={product.image}
          alt={product.name}
          className='w-40 h-40 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6'
        />
        <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4'>
          <div className='w-full bg-white py-2 text-center text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform'>
            Quick View
          </div>
        </div>
      </div>
      <p className='font-bold text-center text-gray-900 group-hover:text-orange-600 transition-colors w-full px-2'>
        {product.name}
      </p>
      <p className='text-gray-500 font-medium'>
        ${(product.price / 100).toFixed(2)}
      </p>
    </button>
  );
}
