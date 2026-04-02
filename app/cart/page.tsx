"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Added for redirection
import { useCart } from "@/app/context/CartContext";
import SquarePaymentForm from "@/components/SquarePaymentForm";

export default function CartPage() {
  const { cart, subtotal, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const router = useRouter();

  // The logic to run once the Square payment is successful
  const handlePaymentSuccess = () => {
    alert("Payment successful! Thank you for your order.");
    clearCart();
    // Optional: router.push('/success');
  };

  return (
    <main className='min-h-screen bg-gray-50 p-6 lg:p-20'>
      <h1 className='text-3xl font-bold mb-6'>Your Cart</h1>

      {cart.length === 0 ? (
        <div className='text-center text-gray-500'>
          <p>Your cart is empty.</p>
          <Link href='/'>
            <button className='mt-4 bg-black text-white px-6 py-2 rounded-md'>
              Return Home
            </button>
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Cart Items */}
          <div className='space-y-4'>
            {cart.map((item) => (
              <div
                key={item.id}
                className='flex items-center gap-4 bg-white p-4 rounded-lg shadow'
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className='object-contain rounded'
                />
                <div className='flex-1'>
                  <p className='font-medium'>{item.name}</p>
                  <p className='text-gray-600'>
                    ${(item.price / 100).toFixed(2)}
                  </p>
                  <div className='flex items-center gap-2 mt-2'>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className='px-2 py-1 bg-gray-200 rounded'
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className='px-2 py-1 bg-gray-200 rounded'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <p className='font-semibold'>
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className='text-red-500 text-sm mt-1'
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout / Summary */}
          <div className='bg-white p-6 rounded-lg shadow space-y-4'>
            <h2 className='text-xl font-bold'>Order Summary</h2>
            <p className='text-gray-700'>
              Total:{" "}
              <span className='font-semibold'>
                ${(subtotal / 100).toFixed(2)}
              </span>
            </p>

            {/* Now passing the required onPaymentSuccess prop */}
            <SquarePaymentForm
              amount={subtotal}
              onPaymentSuccess={handlePaymentSuccess}
            />

            <button
              onClick={clearCart}
              className='w-full mt-2 bg-red-500 text-white py-2 rounded-md text-sm'
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
