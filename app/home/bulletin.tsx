import { Card, CardBody, CardHeader } from "@heroui/react";

export default function HomePageBulletin() {
  return (

    <div className="container mx-auto my-8 flex flex-col gap-8 p-4">
      <h2 id="events" className="text-3xl font-bold">
        Bulletin
      </h2>
      <Card className="w-full max-w-[75rem] bg-background/60 px-16 py-8 dark:bg-default/10">
        <CardBody></CardBody>
      </Card>
    </div>
  );
}
