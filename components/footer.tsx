import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 text-gray-600 py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      
      <p className="text-sm">
        © {new Date().getFullYear()} Hose Draggers Inc.
      </p>

      <div>
        <ul>
          <li>
            <Link href="/cart" className="text-sm hover:underline">
              <i className="fa-solid fa-shopping-cart mr-1"></i> Checkout
            </Link>

            <Link href="/shop" className="ml-4 text-sm hover:underline">
              <i className="fa-solid fa-store mr-1"></i> Shop
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <ul>
          <li>
            <Link href="/shipping" className="text-sm hover:underline">
              <i className="fa-solid fa-truck mr-1"></i> Shipping & Returns
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <ul>
          <li>
            <Link
              href="https://www.instagram.com/hosedraggers_inc/"
              className="text-sm hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram mr-1"></i> Instagram
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex space-x-4">
        <Link href="/privacy-policy" className="text-sm hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-sm hover:underline">
          Terms of Service
        </Link>
        <Link href="/contact" className="text-sm hover:underline">
          Contact Us
        </Link>
      </div>

    </footer>
  );
}
