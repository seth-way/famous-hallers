import { Card, CardBody } from "@nextui-org/react";

type DummyInfoProps = {
  width: "sm" | "md" | "lg" | "xl";
};

const widthStyles = {
  sm: "w-20",
  md: "w-32",
  lg: "w-64",
  xl: "w-128",
};

export default function DummyInfo({ width }: DummyInfoProps) {
  const widthStyle = widthStyles[width];

  return (
    <Card
      className={`rounded-md bg-gradient-to-br from-success-500/60 to-success-100/50 text-center text-xs md:text-lg ${widthStyle} animate-pulse-subtle`}
    >
      <CardBody className="justify-center p-1 text-center text-xs font-semibold md:text-lg">
        <h3>&nbsp;</h3>
      </CardBody>
    </Card>
  );
}
