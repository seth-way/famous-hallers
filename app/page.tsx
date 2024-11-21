"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
// /players/key
const playerKeys = [
  "53616c7465645f5fc6178eeacea21ce59842924a0a124b0cce33551d6076f174",
];

export default function Page() {
  const router = useRouter();

  const handleClick = (key: string) => {
    router.push(`/players/${key}`);
  };

  return (
    <div className="flex min-h-[85vh] w-screen flex-col items-center justify-center p-4">
      <h1 className="font-headline p-4 text-4xl md:text-7xl">Famous Hallers</h1>
      <div className="flex flex-wrap items-center space-x-3">
        {playerKeys.map((key, idx) => (
          <Button
            onClick={() => handleClick(key)}
            variant="ghost"
            className="h-auto w-24 border-success-200 bg-khaki p-1 text-xs font-extrabold text-success-300 md:w-32 md:p-2 md:text-base"
            radius="sm"
            key={key}
          >
            {`Puzzle ${idx + 1}`}
          </Button>
        ))}
      </div>
    </div>
  );
}
