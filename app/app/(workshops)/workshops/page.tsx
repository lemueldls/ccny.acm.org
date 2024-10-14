import { workshops } from "@/lib/workshops";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";

export default function AppHomePage() {
  return (
    <Card isBlurred>
      <CardHeader>Workshops</CardHeader>

      <CardBody className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(28rem,1fr))]">
        {workshops.map((workshop, index) => (
          <Card key={index}>
            <CardHeader>{workshop.title}</CardHeader>

            <CardBody>{workshop.description}</CardBody>

            <CardFooter>
              <Button
                as={Link}
                href={`/workshops/${workshop.id}`}
                color="default"
                variant="flat"
              >
                View Workshop
              </Button>
            </CardFooter>
          </Card>
        ))}
      </CardBody>
    </Card>
  );
}
