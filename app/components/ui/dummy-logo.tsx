import { Card, CardBody } from "@nextui-org/react";
import Logo from "@/app/assets/svgs/Logo";

export default function DummyLogo() {
  return (
    <Card className="h-10 w-10 animate-pulse-subtle rounded-md bg-gradient-to-br from-success-500/60 to-success-100/50 p-0 md:h-16 md:w-16">
      <CardBody className="relative h-full w-full p-1">
        <div className="flex h-full w-full items-center justify-center p-1">
          <Logo className="text-khaki" height="100%" />
        </div>
      </CardBody>
    </Card>
  );
}
