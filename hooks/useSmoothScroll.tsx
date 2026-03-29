"use client";

import { useEffect, useState } from "react";

export default function useSmoothScroll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let current = window.scrollY;
    let target = current;
    const ease = 0.08;

    const onScroll = () => {
      target = window.scrollY;
    };

    const smoothScroll = () => {
      current += (target - current) * ease;
      setScrollY(current);
      requestAnimationFrame(smoothScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    smoothScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollY;
}
