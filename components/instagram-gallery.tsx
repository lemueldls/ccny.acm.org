"use client";

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  cn,
  Image,
  Link,
  ScrollShadow,
  Skeleton,
} from "@heroui/react";
import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { api } from "@/convex/_generated/api";
import { GalleryImage } from "@/convex/gallery";

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const images = useMemo(() => {
    if (!allImages) return [];
    let processed = [...allImages];
    if (shuffle) {
      processed.sort(() => Math.random() - 0.5);
    }
    return limit ? processed.slice(0, limit) : processed;
  }, [allImages, shuffle, limit]);

  const handleOpen = useCallback(
    (index: number) => {
      if (pathname === "/gallery") {
        const params = new URLSearchParams(searchParams);
        params.set("img", images[index]._id);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      } else {
        setSelectedIndex(index);
      }
    },
    [images, pathname, router, searchParams],
  );

  const handleNext = useCallback(() => {
    const currentIdx =
      pathname === "/gallery" && searchParams.get("img")
        ? images.findIndex((img) => img._id === searchParams.get("img"))
        : selectedIndex;

    if (currentIdx !== null && currentIdx !== -1) {
      handleOpen((currentIdx + 1) % images.length);
    }
  }, [handleOpen, selectedIndex, images, pathname, searchParams]);

  const handlePrev = useCallback(() => {
    const currentIdx =
      pathname === "/gallery" && searchParams.get("img")
        ? images.findIndex((img) => img._id === searchParams.get("img"))
        : selectedIndex;

    if (currentIdx !== null && currentIdx !== -1) {
      handleOpen((currentIdx - 1 + images.length) % images.length);
    }
  }, [handleOpen, selectedIndex, images, pathname, searchParams]);

  const handleClose = useCallback(() => {
    if (pathname === "/gallery") {
      const params = new URLSearchParams(searchParams);
      params.delete("img");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    } else {
      setSelectedIndex(null);
    }
  }, [pathname, router, searchParams]);

  const imagesToMap = useMemo(() => images, [images]);

  useEffect(() => {
    if (pathname !== "/gallery") return;
    const imgId = searchParams.get("img");
    if (imagesToMap.length > 0) {
      const index = imgId ? imagesToMap.findIndex((img) => img._id === imgId) : -1;
      setSelectedIndex(index !== -1 ? index : null);
    }
  }, [searchParams, imagesToMap, pathname]);

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
        <p className="text-default-500 text-xl">No images found in the gallery.</p>
      </div>
    );
  }

  if (variant === "slider") {
    return <InstagramGalleryCarousel images={images} />;
  }

  return (
    <>
      <InstagramGalleryGrid images={images} onImageClick={handleOpen} />

      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            images={images}
            selectedIndex={selectedIndex}
            onClose={handleClose}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function InstagramGalleryCarousel({
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
        scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth,
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
            href={`/gallery?img=${image._id}`}
            key={image._id}
            className="bg-default/20 group relative h-64 min-w-32 shrink-0 snap-center overflow-hidden"
            shadow="sm"
          >
            <Image src={image.url} alt={image.caption || "Gallery Image"} height={256} isZoomed />
          </Card>
        ))}

        <Card
          className="group border-primary/30 bg-primary/5 relative flex shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-500"
          shadow="none"
        >
          <Link
            href="/gallery"
            className="flex h-full w-50 flex-col items-center justify-center gap-4 text-center transition-transform duration-300 group-hover:scale-105"
          >
            <div className="bg-primary shadow-primary/30 group-hover:shadow-primary/50 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
              <ArrowRightIcon className="h-6 w-6" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-primary text-xl font-bold">Full Gallery</span>
              <span className="text-default-500 text-xs font-semibold tracking-widest uppercase">
                See More
              </span>
            </div>
          </Link>
        </Card>
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

function InstagramGalleryGrid({
  images,
  onImageClick,
}: {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 640: 1, 768: 2, 1024: 3, 1280: 4 }}>
      <Masonry gutter="1rem">
        {images.map((image, index) => (
          <motion.div
            key={image._id}
            onClick={() => onImageClick(index)}
            className="cursor-pointer"
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
                {image.caption && <p className="text-tiny mb-1 text-white/80">{image.caption}</p>}
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

function Lightbox({
  images,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: GalleryImage[];
  selectedIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  useHotkeys("esc", onClose, { enabled: selectedIndex !== null });
  useHotkeys("right", onNext, { enabled: selectedIndex !== null });
  useHotkeys("left", onPrev, { enabled: selectedIndex !== null });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      containerRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  if (selectedIndex === null) return null;

  const currentImage = images[selectedIndex];

  return (
    <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl md:p-12"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
          if (e.key === "ArrowRight") onNext();
          if (e.key === "ArrowLeft") onPrev();
        }}
      >
        <Button
          isIconOnly
          radius="full"
          variant="flat"
          color="primary"
          size="lg"
          onPress={() => onClose()}
          className="absolute top-6 right-6 z-110 transition-colors"
        >
          <XMarkIcon className="size-6" />
        </Button>

        <Button
          isIconOnly
          radius="full"
          variant="flat"
          color="primary"
          size="lg"
          onPress={() => onPrev()}
          className="absolute bottom-4 left-6 z-110 -translate-y-1/2 sm:top-1/2"
        >
          <ChevronLeftIcon className="size-6" />
        </Button>

        <Button
          isIconOnly
          radius="full"
          variant="flat"
          color="primary"
          size="lg"
          onPress={() => onNext()}
          className="absolute right-6 bottom-4 z-110 -translate-y-1/2 sm:top-1/2"
        >
          <ChevronRightIcon className="size-6" />
        </Button>

        <div
          className="relative flex h-full w-full flex-col items-center justify-between outline-none"
          // onClick={(e) => e.stopPropagation()}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter" || e.key === " ") e.stopPropagation();
          // }}
          role="presentation"
        >
          <div className="flex flex-1 items-center justify-center">
            <motion.div
              key={currentImage._id}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="flex flex-col items-center justify-center gap-6"
            >
              <div className="relative flex max-h-[70vh] items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={currentImage.url}
                  alt={currentImage.caption || ""}
                  className="max-h-[70vh] w-auto max-w-[90vw] object-contain"
                />
              </div>

              {(currentImage.caption || currentImage.date) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-3xl space-y-2 text-center text-pretty"
                >
                  {currentImage.date && (
                    <p className="text-sm font-medium tracking-wide text-white/50 uppercase">
                      {new Date(currentImage.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}

                  {currentImage.caption && (
                    <h3 className="font-semibold text-white md:text-lg">{currentImage.caption}</h3>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* <div className="absolute bottom-0 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium tracking-widest text-white/60 uppercase backdrop-blur-md">
            {selectedIndex + 1} / {images.length}
          </div> */}
        </div>
      </motion.div>
  );
}
