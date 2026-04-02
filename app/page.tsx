"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCart } from "./context/CartContext";
import ProductModal from "../components/ProductModal";
import CartDrawer from "../components/CartDrawer";
import LocalFont from "next/font/local";
import Mission from "./mission";
import {
  ShoppingCart,
  Heart,
  Droplet,
  Sun,
  HandCoins,
  Check,
} from "lucide-react";
import useSmoothScroll from "@/hooks/useSmoothScroll";

// Asset Imports
import HoseDraggersHero from "../public/images/hose-draggers-hero.png";
import HoseDraggerHelmet from "../public/images/hose-dragger-helmet.png";
import DiaDeMuertos from "../public/images/dia-de-muertos.png";
import DiaDeMuertosCigar from "../public/images/dia-de-muertos-cigar.png";
import DiaDeMuertosNozzle from "../public/images/dia-de-muertos-nozzle.png";
import DiaDeMuertosChariot from "../public/images/chariot-white-bg.png";
import DiaDeMuertosAxe from "../public/images/dia-de-muertos-axe.png";
import DiaDeMuertosPoint from "../public/images/dia-de-muertos-point.png";
import DiaDeMuertosAxeW from "../public/images/dia-de-muertos-axe-white.png";
import DiaDeMuertosPointing from "@/public/images/dia-de-muertos-pointing.png";

const HoseFont = LocalFont({
  src: "./fonts/Billy_Ohio.ttf",
  variable: "--font-hose-draggers",
});

const products = [
  {
    id: "hose-dragger-helmet",
    name: "Hose Dragger Helmet",
    price: 900,
    image: HoseDraggerHelmet,
  },
  {
    id: "ddlmuertos",
    name: "Dia De Los Muertos",
    price: 900,
    image: DiaDeMuertos,
  },
  {
    id: "ddlmuertos-cigar",
    name: "Dia De Los Muertos (Cigar)",
    price: 900,
    image: DiaDeMuertosCigar,
  },
  {
    id: "ddlmuertos-nozzle",
    name: "Dia De Los Muertos (Nozzle)",
    price: 900,
    image: DiaDeMuertosNozzle,
  },
  {
    id: "ddlmuertos-chariot",
    name: "Dia De Los Muertos (Mahalo)",
    price: 900,
    image: DiaDeMuertosChariot,
  },
  {
    id: "ddlmuertos-axe",
    name: "Dia De Los Muertos (Axe)",
    price: 900,
    image: DiaDeMuertosAxe,
  },
  {
    id: "ddlmuertos-axe-white",
    name: "Dia De Los Muertos (Axe)",
    price: 900,
    image: DiaDeMuertosAxeW,
  },
  {
    id: "ddlmuertos-pointing",
    name: "Dia De Los Muertos (There)",
    price: 900,
    image: DiaDeMuertosPoint,
  },
];

function DCDescription() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollY = useSmoothScroll();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionTop = rect.top + scrollY;
    const start = scrollY + windowHeight;
    const end = scrollY + windowHeight * 0.2;
    const visible = Math.min(
      Math.max((start - sectionTop) / (start - end), 0),
      1,
    );
    setOpacity(visible);
  }, [scrollY]);

  return (
    <section
      ref={sectionRef}
      className='flex flex-col md:flex-row px-6 bg-white/30 backdrop-blur-xl lg:px-20 mt-20 py-16 gap-12 items-center rounded-[2rem] border border-white/40 shadow-2xl max-w-7xl mx-auto mb-20 transition-opacity duration-300'
      style={{ opacity }}
    >
      <div className='flex-shrink-0 relative group'>
        <div className='absolute -inset-4 bg-orange-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity' />
        <Image
          src={DiaDeMuertosPointing}
          alt='Dia De Muertos Pointing'
          width={300}
          height={300}
          className='rounded-lg relative z-10 drop-shadow-2xl'
        />
      </div>
      <div className='relative z-10'>
        <h2
          className='mb-6 text-orange-600'
          style={{
            fontFamily: HoseFont.style.fontFamily,
            fontSize: "4.5rem",
            lineHeight: "1",
          }}
        >
          The Secret Sauce
        </h2>
        <div className='space-y-6'>
          <div className='bg-white/40 p-4 rounded-2xl border border-white/20'>
            <h4 className='text-xs font-black uppercase tracking-[0.2em] mb-2 text-orange-600'>
              Die-Cut Singles
            </h4>
            <p className='max-w-xl tracking-wide font-semibold text-gray-800 leading-relaxed'>
              Printed with top quality inks on durable vinyl to ensure they are
              waterproof, weather resistant, dishwasher and microwave safe.
            </p>
          </div>
          <div className='bg-white/40 p-4 rounded-2xl border border-white/20'>
            <h4 className='text-xs font-black uppercase tracking-[0.2em] mb-2 text-orange-600'>
              Kiss-Cut Sheets
            </h4>
            <p className='max-w-xl tracking-wide font-semibold text-gray-800 leading-relaxed'>
              The blade cuts only through the vinyl layer, leaving a paper
              backing—making them super easy to peel and apply.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // FIXED: Strictly use Global State from Context
  const { cart, isDonating, toggleDonation, isCartOpen, toggleCart } =
    useCart();

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
      className={`min-h-screen bg-gradient-to-b from-black text-gray-900 ${HoseFont.variable} selection:bg-orange-500 selection:text-white`}
    >
      {/* FLOATING CART UI - Elevated Z-index and pointer control */}
      {/*<div className='fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4'>
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
          onClick={(e) => {
            e.preventDefault();
            toggleCart(); // FIXED: Triggers global context open/close
          }}
          className='bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group relative pointer-events-auto'
        >
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className='absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-white'>
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>*/}

      {/* HERO SECTION */}
      <section className='relative min-h-[75vh] flex flex-col lg:flex-row items-center justify-between overflow-hidden bg-black pt-20 lg:pt-0'>
        <div
          className='absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/10 blur-[150px] rounded-full'
          style={{
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          }}
        />
        <div className='relative mt-24 z-30 px-6 lg:pl-20 lg:w-[45%] text-center lg:text-left'>
          <h1 className='text-6xl lg:text-[7rem] xl:text-[7rem] text-white font-black tracking-tighter uppercase leading-[0.8]'>
            Stickers <br /> That Match Your <br />
            <span
              className={`${HoseFont.className} text-orange-500 normal-case text-8xl lg:text-[12rem] xl:text-[14rem] inline-block -rotate-3 mt-4`}
            >
              Vibe
            </span>
          </h1>
          <p className='mt-12 text-gray-400 text-lg lg:text-xl font-bold uppercase tracking-[0.3em]'>
            Premium High-Heat Decals
          </p>
          <Link href='/shop'>
            <button className='mt-8 mb-24 px-10 py-5 bg-orange-600 text-white font-black uppercase tracking-[0.2em] rounded-full hover:scale-110 transition-all'>
              Shop Stickers
            </button>
          </Link>
        </div>
        <div className='relative z-20 lg:w-[60%] h-full flex items-center lg:justify-end'>
          <div
            className='relative w-full aspect-square lg:h-[95vh] lg:w-[120%] lg:-mr-[2%] transition-transform'
            style={{
              transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
            }}
          >
            <Image
              src={HoseDraggersHero}
              alt='Hero'
              className='object-contain lg:object-right select-none drop-shadow-[-30px_30px_60px_rgba(0,0,0,0.9)]'
              fill
              priority
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className='bg-white -mt-12 md:mx-8 mx-auto pt-24 pb-20 px-6 rounded-[2rem] relative z-40'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center gap-4 mb-12 pt-8'>
            <h2 className='text-4xl font-black uppercase tracking-tighter'>
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
        </div>
      </section>

      <Mission />
      <DCDescription />

      {/* Modals & Drawer */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenCart={toggleCart}
        />
      )}

      {/* FIXED: Using Global Context state for visibility */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
      />
    </main>
  );
}

function ProductCard({ product, onView }: any) {
  return (
    <button
      onClick={onView}
      className='group flex flex-col items-center w-full'
    >
      <div className='relative w-full aspect-square bg-white/40 backdrop-blur-md rounded-3xl mb-4 overflow-hidden flex items-center justify-center border border-white/20 transition-all hover:bg-white/60'>
        <Image
          src={product.image}
          alt={product.name}
          className='w-40 h-40 object-contain transition-transform group-hover:scale-110'
        />
      </div>
      <p className='font-bold text-center text-gray-900'>{product.name}</p>
      <p className='text-gray-500 font-black text-sm'>
        ${(product.price / 100).toFixed(2)}
      </p>
    </button>
  );
}
