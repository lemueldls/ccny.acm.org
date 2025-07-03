// "use client";

import NextImage from "next/image";
import { Image } from "@heroui/react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemedLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Image
      as={NextImage}
      width={44}
      height={44}
      src={`/logo-on-${resolvedTheme}.webp`}
      alt="Logo"
      suppressHydrationWarning
    />
  );
}
