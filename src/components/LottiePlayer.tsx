"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import { assetUrl } from "@/lib/assets";

interface LottiePlayerProps {
  src?: string;
  animationData?: any;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottiePlayer({
  src,
  animationData: directData,
  className = "",
  loop = true,
  autoplay = true,
}: LottiePlayerProps) {
  const [animationData, setAnimationData] = useState<any>(directData || null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!directData && src) {
      const targetUrl = assetUrl(src);
      fetch(targetUrl)
        .then((res) => res.json())
        .then((data) => setAnimationData(data))
        .catch((err) => console.error("Failed to load Lottie animation:", err));
    }
  }, [src, directData]);

  if (!mounted || !animationData) {
    return (
      <div
        className={`flex items-center justify-center bg-transparent animate-pulse ${className}`}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoPlay={autoplay}
        className="w-full h-full"
      />
    </div>
  );
}
