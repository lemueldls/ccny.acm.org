"use client";

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  ScrollShadow,
  Skeleton,
} from "@heroui/react";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { api } from "@/convex/_generated/api";
import { GalleryImage } from "@/convex/gallery";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export interface InstagramGalleryProps {
  variant?: "slider" | "collage";
  limit?: number;
  shuffle?: boolean;
}

export default function InstagramGallery({
  variant = "collage",
  limit,
  shuffle,
}: InstagramGalleryProps) {
  const allImages = useQuery(api.gallery.get);

  if (shuffle && allImages) {
    allImages.sort(() => Math.random() - 0.5);
  }

  if (allImages === undefined) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(12)].map((_, i) => (
          <Skeleton key={i} className="h-80 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (allImages.length === 0) {
    return (
      <div className="bg-default/10 border-default-300 rounded-xl border border-dashed p-12 text-center">
        <p className="text-default-500 text-xl">
          No images found in the gallery.
        </p>
      </div>
    );
  }

  const images = limit ? allImages.slice(0, limit) : allImages;

  if (variant === "slider") {
    // return <InstagramSliderGallery images={images} />;
    return <InstagramCarouselGallery images={images} />;
  }

  // return <InstagramMasonryGallery images={images} />;
  return <InstagramGridGallery images={images} />;
}

function InstagramSliderGallery({ images }: { images: GalleryImage[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full"
    >
      <ScrollShadow
        orientation="horizontal"
        className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-8 sm:gap-6"
      >
        {images.map((image) => (
          <Card
            as={Link}
            href="/gallery"
            key={image._id}
            className="bg-default/20 group relative h-64 min-w-32 shrink-0 snap-center overflow-hidden"
            shadow="sm"
          >
            <CardBody className="h-full overflow-hidden p-0">
              <Image
                src={image.url}
                alt={image.caption || "Gallery Image"}
                height={256}
                isZoomed
              />
            </CardBody>
          </Card>
        ))}

        <Card
          className="group border-primary/30 bg-primary/5 relative flex h-[250px] w-[200px] shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-500"
          shadow="none"
        >
          <Link
            href="/gallery"
            className="flex h-full w-full flex-col items-center justify-center gap-4 text-center transition-transform duration-300 group-hover:scale-105"
          >
            <div className="bg-primary shadow-primary/30 group-hover:shadow-primary/50 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              <ArrowRightIcon className="h-6 w-6" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-primary text-xl font-bold">
                Full Gallery
              </span>
              <span className="text-default-500 text-xs font-semibold tracking-widest uppercase">
                Explore More
              </span>
            </div>
          </Link>
        </Card>
      </ScrollShadow>
    </motion.div>
  );
}

// Contains arrows for moving left and right when avaliable and auto scrolls through images when idle
function InstagramCarouselGallery({
  images,
  autoScroll = true,
}: {
  images: GalleryImage[];
  autoScroll?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isIdle, setIsIdle] = useState(true);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      setShowLeftButton(scrollContainer.scrollLeft > 0);
      setShowRightButton(
        scrollContainer.scrollLeft <
          scrollContainer.scrollWidth - scrollContainer.clientWidth,
      );
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollLeft = useCallback(() => {
    scrollRef.current?.scrollBy({ left: -512, behavior: "smooth" });
  }, []);

  const scrollRight = useCallback(() => {
    scrollRef.current?.scrollBy({ left: 512, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!autoScroll || !isIdle) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      scrollContainer.scrollBy({ left: 512, behavior: "smooth" });
    }, 2500);

    return () => clearInterval(interval);
  }, [autoScroll, isIdle]);

  const handleMouseEnter = useCallback(() => {
    setIsIdle(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsIdle(true);
  }, []);

  const handleTouchStart = useCallback(() => {
    setIsIdle(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <ScrollShadow
        ref={scrollRef}
        hideScrollBar
        orientation="horizontal"
        className="flex h-64 w-full snap-x snap-proximity gap-4 overflow-x-auto sm:gap-6"
      >
        {images.map((image) => (
          <Card
            as={Link}
            href="/gallery"
            key={image._id}
            className="bg-default/20 group relative h-64 min-w-32 shrink-0 snap-center overflow-hidden"
            shadow="sm"
          >
            <Image
              src={image.url}
              alt={image.caption || "Gallery Image"}
              height={256}
              isZoomed
            />
          </Card>
        ))}

        {/* <Card
          className="group border-primary/30 bg-primary/5 relative flex shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-500"
          shadow="none"
        >
          <Link
            href="/gallery"
            className="flex h-full w-50 flex-col items-center justify-center gap-4 text-center transition-transform duration-300 group-hover:scale-105"
          >
            <div className="bg-primary shadow-primary/30 group-hover:shadow-primary/50 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              <ArrowRightIcon className="h-6 w-6" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-primary text-xl font-bold">Full Gallery</span>
              <span className="text-default-500 text-xs font-semibold tracking-widest uppercase">
                See More
              </span>
            </div>
          </Link>
          </Card> */}
      </ScrollShadow>

      {showLeftButton && (
        <Button
          onPress={scrollLeft}
          className="absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 sm:flex"
          size="lg"
          isIconOnly
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
      )}

      {showRightButton && (
        <Button
          onPress={scrollRight}
          className="absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 sm:flex"
          size="lg"
          isIconOnly
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
      )}
    </motion.div>
  );
}

function InstagramGridGallery({ images }: { images: GalleryImage[] }) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 640: 1, 768: 2, 1024: 3, 1280: 4 }}
    >
      <Masonry gutter="1rem">
        {images.map((image, index) => (
          <motion.div
            key={image._id}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            viewport={{ once: true }}
            initial={{
              opacity: 0,
              scale: 0.8,
              rotate: ((index % 3) - 1) * 5,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: ((index % 3) - 1) * 1.5,
              transition: { duration: 0.5 },
            }}
            whileHover={{ rotate: 0 }}
          >
            <Card isFooterBlurred className="group bg-default/10" shadow="lg">
              <CardBody className="p-0">
                <Image src={image.url} alt={image.caption || "Gallery Image"} />
              </CardBody>

              <CardFooter className="bg-default/50 absolute bottom-1 z-10 ml-1 flex w-[calc(100%-0.5rem)] flex-col items-start overflow-hidden rounded-xl border-1 border-white/20 py-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {image.caption && (
                  <p className="text-tiny mb-1 text-white/80">
                    {image.caption}
                  </p>
                )}
                {image.date && (
                  <p className="self-end text-[10px] font-medium text-white/60">
                    {new Date(image.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
