"use client";

import { ScrollShadow } from "@heroui/react";
import { cn } from "@heroui/react";
import { useEffect } from "react";

import HomePageHeader from "@/app/home/header";
import InstagramGallery from "@/components/instagram-gallery";
import { brand } from "@/lib/fonts";

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HomePageHeader />

      <ScrollShadow visibility="both" className="circuit-board mb-8 flex-1 p-4 pb-8">
        <div className="container mx-auto flex flex-col gap-12 px-4 py-12">
          <div className="space-y-4 text-center">
            <h1 className={cn("text-6xl font-bold")}>Gallery</h1>
            <p className="text-default-500 mx-auto max-w-2xl text-xl">
              Capturing the moments, workshops, and community at ACM @ CCNY.
            </p>
          </div>

          <InstagramGallery />
        </div>
      </ScrollShadow>

      <footer className="texture bg-background/60 dark:bg-default/10 flex flex-col gap-4 p-4">
        <div className="m-4 flex flex-col justify-center gap-4 text-center sm:flex-row sm:gap-16 sm:text-left">
          <div>
            <span className="text-default-500">&copy; 2025 ACM @ CCNY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
