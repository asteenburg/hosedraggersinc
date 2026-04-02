"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import LocalFont from "next/font/local";
import DiaDeMuertosPointing from "@/public/images/Dia-De-Muertos-Pointing-copy.png";

const myCustomFont = LocalFont({
  src: "../public/fonts/billy ohio.ttf",
  variable: "--font-my-custom-font",
});

export default function DCDescription() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Automatically updates state when the element enters/leaves the view
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Disconnect after it becomes visible to save resources
          // observer.unobserve(entry.target);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Slight delay so it fades in as it clears the bottom
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`
        flex flex-col md:flex-row px-6 bg-gray-300 lg:px-20 mt-8 py-12 gap-12 items-center shadow-md
        transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div className='flex-shrink-0'>
        <Image
          src={DiaDeMuertosPointing}
          alt='Dia De Muertos Pointing'
          width={300}
          height={300}
          className='rounded-lg'
        />
      </div>

      <div>
        <h2
          className='mb-4'
          style={{
            fontFamily: myCustomFont.style.fontFamily,
            fontSize: "3.5rem",
          }}
        >
          The Secret Sauce
        </h2>

        <p className='max-w-xl tracking-wide font-semibold'>
          Die-cut sticker singles are printed with top quality inks on durable
          vinyl material to ensure that your stickers are waterproof, weather
          resistant, dishwasher and microwave safe.
        </p>

        <p className='max-w-xl mt-4 tracking-wide font-semibold'>
          Kiss-cut stickers are printed on a sheet, where the blade cuts only
          through the vinyl layer but leaves a paper backing creating an extra
          border making them super easy to peel and apply.
        </p>
      </div>
    </section>
  );
}
