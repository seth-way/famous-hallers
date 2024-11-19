import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { ReactNode } from "react";

type SectionProps = {
  heading?: string;
  children: ReactNode;
};

export default function Section({ heading, children }: SectionProps) {
  return (
    <Card className="max-h-full rounded-md bg-[#bdbdbd]/30 font-bold">
      {heading && (
        <>
          <CardHeader className="justify-center p-1 md:p-3">
            <h2>{heading}</h2>
          </CardHeader>
          <Divider />
        </>
      )}
      <CardBody className="flex h-full w-full flex-col items-center gap-2 overflow-y-auto p-2 md:gap-4 md:p-4">
        {children}
      </CardBody>
    </Card>
  );
}
