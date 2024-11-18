import { Card } from "@nextui-org/react";

type DummyInfoProps = {
  width: "sm" | "md" | "lg" | "xl";
};

const widthStyles = {
  sm: "w-16",
  md: "w-32",
  lg: "w-64",
  xl: "w-128",
};

export default function DummyInfo({ width }: DummyInfoProps) {
  const widthStyle = widthStyles[width];

  return (
    <Card
      className={`rounded-md bg-gradient-to-br from-success-500/60 to-success-100/50 text-center ${widthStyle} animate-pulse-subtle`}
    ></Card>
  );
}
