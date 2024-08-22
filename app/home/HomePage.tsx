"use client";
import { Divider } from "@nextui-org/react";
import { Carousel } from "primereact/carousel";

export default function HomePage() {
  const events = [
    {
      title: "UI/UX Design Workshop",
      date: "2022-12-01",
      time: "10:00",
      location: "Online",
      description:
        "Learn how to design beautiful user interfaces and experiences.",
    },
    {
      title: "Frontend Development Workshop",
      date: "2022-12-02",
      time: "10:00",
      location: "Online",
      description:
        "Learn how to build modern web applications using the latest technologies.",
    },
    {
      title: "Backend Development Workshop",
      date: "2022-12-03",
      time: "10:00",
      location: "Online",
      description: "Learn how to build scalable and secure web applications.",
    },
    {
      title: "Fullstack Development Workshop",
      date: "2022-12-04",
      time: "10:00",
      location: "Online",
      description:
        "Learn how to build modern web applications from start to finish.",
    },
  ];
  const activeEvent = "UI/UX Design Workshop";

  interface Brand {
    name: string;
    image: string;
  }

  function BrandTemplate(brand: Brand) {
    return <img src={brand.image} className="h-full" alt={brand.name} />;
  }

  return (
    <div className="flex min-h-screen flex-col ">
      {/* {activeEvent && (
              <div className="active-two-tone-step-animation p-4 text-white">
                <p>Active event: {activeEvent}</p>
              </div>
            )} */}

      <div className="container mx-auto flex flex-col gap-8 px-24 py-8">
        <h1
          className={`text-primary mb-4 text-8xl font-bold ${majorMonoDisplay}`}
        >
          Beavers Code
        </h1>

        <div className="grid h-72 grid-cols-12 grid-rows-12 items-center gap-8 ">
          <img
            src="/ccny-collab.svg"
            className="col-span-6 row-span-12 row-start-1"
            alt="CCNY Collab"
          />
          <Divider orientation="vertical" className="row-span-10 row-start-2" />
          <Carousel
            className="col-span-5 row-span-8 row-start-3"
            value={[{ name: "ACM", image: "/acm.svg" }]}
            numVisible={1}
            numScroll={1}
            circular
            showIndicators={false}
            showNavigators={false}
            orientation="vertical"
            autoplayInterval={3000}
            itemTemplate={BrandTemplate}
          />
        </div>
      </div>
    </div>
  );
}
