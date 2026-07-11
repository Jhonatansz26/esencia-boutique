"use client";

import { useEffect, useState, useCallback } from "react";

interface PromoBannerProps {
  config?: {
    title?: string;
    image?: string;
    expiresAt?: string;
  };
}

export default function PromoBanner({ config }: PromoBannerProps) {
  const title = config?.title || "2x1 EN PIEZAS SELECCIONADAS";
  const bgImage = config?.image || "/images/hero-bg.jpg";
  const expiresAt = config?.expiresAt;

  const calculateTimeLeft = useCallback(() => {
    if (!expiresAt) return null;
    const difference = +new Date(expiresAt) - +new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [expiresAt]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    if (!expiresAt) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [expiresAt, calculateTimeLeft]);

  if (expiresAt && !timeLeft) return null;

  return (
    <section 
      className="relative py-16 md:py-20 px-6 my-4 bg-cover bg-center text-center overflow-hidden border-y border-[#D4AF37]/20"
      style={{ backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.75), rgba(26, 26, 26, 0.75)), url(${bgImage})` }}
    >
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4 font-sans">
          OFERTA PREMIUM EXTRAORDINARIA
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#FDFBF7] tracking-wide max-w-2xl mb-6 leading-snug">
          {title}
        </h2>

        {timeLeft && (
          <div className="flex gap-4 md:gap-6 mt-2 mb-4 font-sans">
            {[
              { label: "Días", value: timeLeft.days },
              { label: "Horas", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
              { label: "Seg", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[50px] md:min-w-[65px]">
                <span className="text-2xl md:text-3xl font-light font-serif text-[#FDFBF7]">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-white/50 mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="h-px w-16 bg-[#D4AF37]/40 my-4" />
        <p className="text-xs italic text-white/60 tracking-wide font-serif">
          * Descuento aplicado automáticamente en el carrito de WhatsApp. Elige tus piezas favoritas.
        </p>
      </div>
    </section>
  );
}
