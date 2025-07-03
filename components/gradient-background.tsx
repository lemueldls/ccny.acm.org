import { Image } from "@heroui/react";
import NextImage from "next/image";

export default function GradientBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed -bottom-[40%] -left-[20%] z-[-2] hidden dark:opacity-70 dark:md:block"
      >
        <Image
          as={NextImage}
          width={1266}
          height={1211}
          alt="left background"
          src="/gradients/docs-left.webp"
          disableSkeleton
          priority
        />
      </div>

      <div
        aria-hidden="true"
        className="fixed -top-[80%] -right-[60%] z-[-2] hidden rotate-12 2xl:-top-[60%] 2xl:-right-[45%] dark:opacity-70 dark:md:block"
      >
        <Image
          as={NextImage}
          width={1833}
          height={1822}
          alt="right background"
          src="/gradients/docs-right.webp"
          disableSkeleton
          priority
        />
      </div>
    </>
  );
}
