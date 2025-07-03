"use client";

import { CalendarIcon } from "@heroicons/react/20/solid";
import { ClockIcon, MapPinIcon } from "@heroicons/react/16/solid";
import { Card, CardBody, CardHeader, cn } from "@heroui/react";

const bulletinItems = [
  {
    id: 1,
    type: "event",
    title: "Annual Club BBQ",
    date: "March 15, 2024",
    time: "6:00 PM",
    location: "Central Park Pavilion",
    description:
      "Join us for our annual BBQ! Food, games, and great company. Bring your family and friends!",
    color: "bg-secondary border-secondary-900 text-secondary-foreground",
    rotation: "rotate-2",
    urgent: false,
  },
  {
    id: 2,
    type: "news",
    title: "New Member Welcome",
    date: "March 10, 2024",
    description:
      "Please welcome our 5 new members who joined this month. Let's make them feel at home!",
    color: "bg-primary border-primary-900 text-primary-foreground",
    rotation: "-rotate-1",
    urgent: false,
  },
  {
    id: 3,
    type: "event",
    title: "Emergency Meeting",
    date: "March 12, 2024",
    time: "7:30 PM",
    location: "Community Center Room B",
    description:
      "Important club matters to discuss. All members please attend.",
    color: "bg-success border-success-900 text-success-foreground",
    rotation: "rotate-3",
    urgent: true,
  },
  {
    id: 4,
    type: "news",
    title: "Fundraiser Success!",
    date: "March 8, 2024",
    description:
      "Thanks to everyone who participated in our bake sale. We raised $850 for the local food bank!",
    color: "bg-danger border-danger-900 text-danger-foreground",
    rotation: "-rotate-2",
    urgent: false,
  },
  {
    id: 5,
    type: "event",
    title: "Movie Night",
    date: "March 20, 2024",
    time: "8:00 PM",
    location: "Johnson's Backyard",
    description:
      "Outdoor movie screening under the stars. Popcorn and drinks provided!",
    color: "bg-primary border-primary-900 text-primary-foreground",
    rotation: "rotate-1",
    urgent: false,
  },
  {
    id: 6,
    type: "news",
    title: "Club Dues Reminder",
    date: "March 5, 2024",
    description:
      "Friendly reminder that quarterly dues are due by March 31st. See treasurer for payment options.",
    color: "bg-primary border-primary-900 text-primary-foreground",
    rotation: "-rotate-3",
    urgent: false,
  },
];

export default function HomePageBulletin() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <Card>
        <CardBody>
          <div className="bg-default/20 relative rounded border-4 p-6 shadow-inner">
            {/* Corner screws */}
            {/* <div className="absolute top-2 left-2 h-3 w-3 rounded-full border border-gray-500 bg-gray-400 shadow-inner"></div>
        <div className="absolute top-2 right-2 h-3 w-3 rounded-full border border-gray-500 bg-gray-400 shadow-inner"></div>
        <div className="absolute bottom-2 left-2 h-3 w-3 rounded-full border border-gray-500 bg-gray-400 shadow-inner"></div>
        <div className="absolute right-2 bottom-2 h-3 w-3 rounded-full border border-gray-500 bg-gray-400 shadow-inner"></div> */}

            {/* Wood grain texture overlay */}
            {/* <div
          className="absolute inset-0 rounded opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              hsl(var(--heroui-background) / 1) 2px,
              hsl(var(--heroui-background) / 1) 4px
            )`,
          }}
        /> */}

            <div className="mb-8 text-center">
              <h1 className="mb-2 text-4xl font-bold">Bulletin Board</h1>
              {/* <p>Latest news and upcoming events</p> */}
            </div>

            <div className="grid auto-rows-max grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {bulletinItems.map((item) => (
                <div key={item.id}>
                  <div
                    className={`relative transform transition-all duration-300 hover:z-10 hover:scale-105 ${item.rotation}`}
                  >
                    {/* <div className="absolute -top-2 left-1/2 z-20 -translate-x-1/2 transform">
                    <PinIcon className="w-6 h-6 text-red-600 fill-red-600" />
                  </div> */}

                    <Card
                      className={cn(
                        "border-2 shadow-lg transition-shadow duration-300 hover:shadow-xl",
                        item.color,
                      )}
                    >
                      <CardHeader className="pb-3 text-lg leading-tight font-bold">
                        {item.title}
                      </CardHeader>

                      <CardBody className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon className="h-4 w-4" />
                          <span className="font-medium">{item.date}</span>
                        </div>

                        {item.time && (
                          <div className="flex items-center gap-2 text-sm">
                            <ClockIcon className="h-4 w-4" />
                            <span>{item.time}</span>
                          </div>
                        )}

                        {item.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPinIcon className="h-4 w-4" />
                            <span>{item.location}</span>
                          </div>
                        )}

                        <p className="mt-3 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </CardBody>
                    </Card>

                    {/* Tape effect */}
                    <div className="absolute -top-1 -right-1 h-6 w-8 rotate-45 transform border border-gray-300 bg-gray-200 opacity-70"></div>
                    <div className="absolute -bottom-1 -left-1 h-8 w-6 -rotate-12 transform border border-gray-300 bg-gray-200 opacity-70"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-amber-700">
                Have something to post? Contact the club secretary or email us
                at bulletin@ourclub.com
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
