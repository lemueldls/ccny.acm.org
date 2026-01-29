"use client";

import { Button } from "@heroui/react";
import { useMutation, useQuery } from "convex/react";
import { Carousel, CarouselPageChangeEvent } from "primereact/carousel";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import Quicktime, {
  QuicktimePrompt,
} from "@/app/app/(app)/workshops/[slug]/quicktime";
import MarkdownRenderer from "@/components/markdown-renderer";
import ShineBorder from "@/components/ui/shine-border";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export interface AdminWorkshopPresentPageProps {
  params: Promise<{ slug: string }>;
}

export default function AdminWorkshopPresentPage(
  props: AdminWorkshopPresentPageProps,
) {
  const params = use(props.params);
  const slug = decodeURIComponent(params.slug);
  const workshop = useQuery(api.workshops.getBySlug, { slug });

  const setActiveSlideSegments = useMutation(
    api.activeWorkshops.setActiveSlideSegments,
  );

  const carousel = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(0);

  const [activeQuicktime, setActiveQuicktime] = useState<QuicktimePrompt>();

  useHotkeys("right", () => setPage((p) => p + 1));
  useHotkeys("down", () => setPage((p) => p + 1));

  useHotkeys("left", () => setPage((p) => p - 1));
  useHotkeys("up", () => setPage((p) => p - 1));

  useHotkeys("f", () => carousel.current?.requestFullscreen());

  const slideSegments = structuredClone(workshop?.slideSegments);

  slideSegments?.unshift({
    content: "# <https://code.ccny.acm.org>",
    kind: "markdown",
  });
  slideSegments?.push({ content: "# kthxbye.", kind: "markdown" });

  useEffect(() => {
    if (!slideSegments) {
      return;
    }

    if (page < 0) {
      setPage(0);
    }
    if (page > slideSegments.length - 1) {
      setPage(slideSegments.length - 1);
    }
  }, [page, slideSegments]);

  useEffect(() => {
    if (!workshop) {
      return;
    }
    if (!slideSegments) {
      return;
    }

    const activeSegments = slideSegments.slice(1, page + 1);
    setActiveSlideSegments({
      slideSegments: activeSegments,
      workshopId: workshop._id,
    });
  }, [page, setActiveSlideSegments, slideSegments, workshop]);

  const handlePageChange = useCallback(
    (event: CarouselPageChangeEvent) => {
      setPage(event.page);

      const slideSegment = slideSegments?.[event.page];
      if (slideSegment?.kind === "quicktime") {
        setActiveQuicktime(slideSegment);
      } else {
        setActiveQuicktime(undefined);
      }
    },
    [slideSegments],
  );

  if (!workshop) {
    return <span>Workshop not found</span>;
  }
  if (!slideSegments) {
    return <span>Workshop slides not found</span>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div ref={carousel}>
        <ShineBorder color="#7d55c7" duration={60}>
          <Carousel
            id="slides"
            value={slideSegments}
            showIndicators={false}
            showNavigators={false}
            orientation="vertical"
            verticalViewPortHeight="80vh"
            itemTemplate={(segment) => (
              <SlideSegment
                segment={segment}
                workshopId={workshop._id}
                activeQuicktime={activeQuicktime}
              />
            )}
            page={page}
            // page={Math.max(Math.min(page, slideSegments.length - 1), 0)}
            onPageChange={handlePageChange}
            // pt={{
            //   Item: { className: "h-full items-center justify-center" },
            //   ItemCloned: {
            //     ClassName:
            //       "flex shrink-0 grow w-full h-full items-center justify-center",
            //   },
            // }}
          />
        </ShineBorder>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            #slides h1 {
              text-align: center;
              margin: 10vh auto;
            }
          `,
        }}
      />
    </div>
  );
}

type SlideSegments = typeof api.activeWorkshops.getSlideSegments._returnType;
type SlideSegment = NonNullable<SlideSegments>[number];

function SlideSegment({
  segment,
  workshopId,
  activeQuicktime,
}: {
  segment: SlideSegment;
  workshopId: Id<"workshops">;
  activeQuicktime: QuicktimePrompt | undefined;
}) {
  return (
    <div className="bg-background text-foreground flex aspect-video h-[80vh] flex-col gap-4 p-4 font-bold">
      <div className="h-full p-[2em] text-3xl">
        {segment.kind === "markdown" ? (
          <MarkdownRenderer>{segment.content}</MarkdownRenderer>
        ) : (
          <Quicktime
            workshopId={workshopId}
            prompt={activeQuicktime}
            onEnd={() => console.log("end")}
          />
        )}
      </div>
    </div>
  );
}
