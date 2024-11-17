import { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";

type HiddenInfoProps = {
  text: string;
  placeholder?: string;
  reveal: boolean;
  width: "sm" | "md" | "lg" | "xl";
};
// potential widths -> 2, 4, 6, 8, 12, 16, 20, 24, 32
const widthStyles = {
  sm: "w-16",
  md: "w-32",
  lg: "w-64",
  xl: "w-128",
};

export default function HiddenInfo({
  text,
  placeholder,
  reveal,
  width,
}: HiddenInfoProps) {
  const widthStyle = widthStyles[width];
  return (
    <Card
      className={`rounded bg-gradient-to-br from-success-600/50 to-success-200/50 text-center ${widthStyle}`}
    >
      <CardBody className="p-1 text-center text-xs font-semibold text-white md:text-lg">
        {reveal ? <h3>{text}</h3> : <h3>{placeholder ? placeholder : ""}</h3>}
      </CardBody>
    </Card>
  );
}
