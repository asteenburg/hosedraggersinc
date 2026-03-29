import Link from "next/link";

export default function Footer() {
  return (
    <footer className='w-full h-[100] border-t border-gray-200 text-gray-600 py-4 px-6 flex flex-col sm:flex-row justify-between items-center'>
      <p className='text-sm'>© {new Date().getFullYear()} Hose Draggers Inc.</p>
      <div className=''>
        <ul>
          <li>
            <Link
              href='/cart'
              className='text-sm hover:underline'
            >
              <i className='fas fa-shopping-cart mr-1'></i> Checkout
            </Link>
            <Link
              href='/shop'
              className='ml-4 text-sm hover:underline'
            >
              <i className='fas fa-store mr-1'></i> Shop
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <Link
              href='https://www.instagram.com/hosedraggers_inc/?igsh=MXZ5cGR4a2NlYTdnZw%3D%3D&utm_source=qr'
              className='text-sm hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-instagram mr-1'></i> Instagram
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex space-x-4 mt-2 sm:mt-0'>
        <a
          href='/privacy-policy'
          className='text-sm hover:underline'
        >
          Privacy Policy
        </a>
        <a
          href='/terms'
          className='text-sm hover:underline'
        >
          Terms of Service
        </a>
        <a
          href='/contact'
          className='text-sm hover:underline'
        >
          Contact Us
        </a>
      </div>
    </footer>
  );
}
