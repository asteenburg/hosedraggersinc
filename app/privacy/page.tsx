import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className='min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto bg-white shadow-sm rounded-3xl p-8 md:p-12 border border-gray-100'>
        <header className='mb-10'>
          <h1 className='text-3xl font-extrabold text-gray-900 mb-2'>
            Privacy Policy
          </h1>
          <p className='text-gray-500 text-sm'>Last Updated: April 1, 2026</p>
        </header>

        <div className='space-y-8 text-gray-600 leading-relaxed'>
          <section>
            <h2 className='text-xl font-bold text-gray-900 mb-3'>
              1. Information We Collect
            </h2>
            <p>
              When you visit Hose Draggers Inc., we collect information
              necessary to process your orders, including your name, email
              address, shipping address, and payment details.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-bold text-gray-900 mb-3'>
              2. How We Use Your Data
            </h2>
            <ul className='list-disc pl-5 space-y-2'>
              <li>
                To process and fulfill your orders for apparel and stickers.
              </li>
              <li>To send order confirmations and shipping updates.</li>
              <li>
                To improve our website functionality and customer experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className='text-xl font-bold text-gray-900 mb-3'>
              3. Payment Security
            </h2>
            <p>
              Your payment information is processed securely. We do not store
              full credit card numbers on our servers; all transactions are
              handled by our encrypted payment processor Square.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-bold text-gray-900 mb-3'>4. Cookies</h2>
            <p>
              We use cookies to remember your cart items and analyze site
              traffic. You can choose to decline cookies through our consent
              banner, though some features of the site may be limited.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-bold text-gray-900 mb-3'>
              5. Contact Us
            </h2>
            <p>
              If you have questions about your data or wish to request its
              removal, please contact us through our official support channels.
            </p>
          </section>
        </div>

        <div className='mt-12 pt-8 border-t border-gray-100'>
          <Link
            href='/'
            className='text-red-600 font-bold hover:text-red-700 transition-colors'
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
