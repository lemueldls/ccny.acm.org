"use client";

import NextImage from "next/image";
import { Image } from "@heroui/react";

import { useTheme } from "next-themes";

export default function ThemedLogo() {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      as={NextImage}
      width={44}
      height={44}
      src={`/logo-on-${resolvedTheme}.png`}
      alt="Logo"
      suppressHydrationWarning
    />
  )
}