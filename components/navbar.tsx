"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

interface NavbarProps {
  onCartOpen: () => void; // <- explicitly type the prop
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const pathname = usePathname();
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkHeroPage = pathname === "/" || pathname === "/shop";
  const useWhiteText = isDarkHeroPage && !isScrolled;

  return (
    <nav
      className={`fixed top-0 w-full z-[51] transition-all duration-300 bg-linear-to-r from-black/30 to-transparent ${
        isScrolled ? "backdrop-blur-md py-4 shadow-md" : "bg-transparent py-6"
      }`}
    >
      <div className='max-w-7xl mx-auto px-8 flex justify-between items-center'>
        <Link
          href='/'
          className={`text-2xl font-black uppercase tracking-tighter italic transition-colors ${
            useWhiteText ? "text-white" : "text-black"
          }`}
        >
          Hose Draggers <span className='text-orange-600'>Inc.</span>
        </Link>

        <div
          className={`hidden md:flex gap-10 font-bold uppercase text-[15px] tracking-[0.3em] ${
            useWhiteText ? "text-white/100" : "text-orange-500"
          }`}
        >
          <Link
            href='/'
            className='hover:text-orange-600 transition-colors'
          >
            Home
          </Link>
          <Link
            href='/shop'
            className='hover:text-orange-600 transition-colors'
          >
            Shop
          </Link>
        </div>

        <button
          onClick={onCartOpen} // ✅ This now matches the typed prop
          className={`relative p-2 ${useWhiteText ? "text-white" : "text-black"}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle
              cx='8'
              cy='21'
              r='1'
            />
            <circle
              cx='19'
              cy='21'
              r='1'
            />
            <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
          </svg>
          {count > 0 && (
            <span className='absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black'>
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
