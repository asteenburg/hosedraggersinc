"use client";
import Navbar from "./navbar";
import CartDrawer from "./CartDrawer";
import { useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
      {children}
    </>
  );
}
