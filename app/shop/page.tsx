// app/shop/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProductModal from "../../components/ProductModal";

// FIXED: Defined Interface to remove 'any' errors
interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
}

// Asset Imports
import HoseDraggerHelmet from "../../public/images/hose-dragger-helmet.png";
import DiaDeMuertos from "../../public/images/dia-de-muertos.png";
import DiaDeMuertosCigar from "../../public/images/dia-de-muertos-cigar.png";
import DiaDeMuertosNozzle from "../../public/images/dia-de-muertos-nozzle.png";
import DiaDeMuertosChariot from "../../public/images/chariot-white-bg.png";
import DiaDeMuertosAxe from "../../public/images/dia-de-muertos-axe.png";
import DiaDeMuertosAxeW from "../../public/images/dia-de-muertos-axe-white.png";
import DiaDeMuertosPoint from "../../public/images/dia-de-muertos-point.png";

// FIXED: Defined products array inside the file so it's found
const products: Product[] = [
  {
    id: "hose-dragger-helmet",
    name: "Hose Dragger Helmet",
    price: 900,
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

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart, toggleCart } = useCart();

  return (
    <div className='min-h-screen bg-white pb-20'>
      <div className='bg-black text-white py-16 px-6'>
        <div className='max-w-7xl mx-auto'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-orange-500 font-bold uppercase text-xs mb-8'
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className='text-5xl font-black uppercase tracking-tighter'>
            The Lineup
          </h1>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 mt-12'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {products.map((product: Product) => (
            <div
              key={product.id}
              className='group flex flex-col'
            >
              <button
                onClick={() => setSelectedProduct(product)}
                className='relative aspect-square bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 mb-4 transition-all hover:shadow-2xl'
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className='object-contain p-6'
                />
              </button>
              <div className='flex justify-between items-center px-2'>
                <div>
                  <p className='font-black uppercase text-sm text-gray-900'>
                    {product.name}
                  </p>
                  <p className='text-orange-600 font-black'>
                    ${(product.price / 100).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className='bg-black text-white p-3 rounded-2xl hover:bg-orange-600'
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenCart={toggleCart}
        />
      )}
    </div>
  );
}
