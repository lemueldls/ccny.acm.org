"use client";

import { cn } from "@heroui/react";

import HomePageHeader from "@/app/home/header";
import InstagramGallery from "@/components/instagram-gallery";

import HomePageFooter from "../footer";

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HomePageHeader />

      <div className="container mx-auto flex flex-col gap-12 px-4 py-12">
        <div className="space-y-4 text-center">
          <h1 className={cn("text-6xl font-bold")}>Gallery</h1>
          <p className="text-default-500 mx-auto max-w-2xl text-xl">
            Capturing the moments, workshops, and community at ACM @ CCNY.
          </p>
        </div>

        <InstagramGallery />
      </div>

      <HomePageFooter />
    </div>
  );
}
