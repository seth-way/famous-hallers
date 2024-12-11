"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
// /players/key
const playerKeys = [
  ["MLB", "53616c7465645f5f398c94e1e2a1798b773d6dabcd692141de25bf5f725cc338"],
  ["NBA", "53616c7465645f5fa5449fd3a709753e95fbce0d48f4f515acf8da1a6da436c8"],
  ["NFL", "53616c7465645f5fc6178eeacea21ce59842924a0a124b0cce33551d6076f174"],
  ["NHL", "53616c7465645f5f52620487f55fbdaf076118067ddd58e65f9eeb69e0ff505c"],
];

import { encryptKey } from "@/lib/api";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const encryptKeys = async () => {
      const gKey = await encryptKey("GretzWa01");
      const carKey = await encryptKey("CarteVi01");
      const clemKey = await encryptKey("ClemeRo02");
      console.log("gretzky <>", gKey);
      console.log("carter <>", carKey);
      console.log("clemens <>", clemKey);
    };

    encryptKeys();
  }, []);
  const handleClick = (key: string) => {
    router.push(`/players/${key}`);
  };

  return (
    <div className="flex min-h-[85vh] w-screen flex-col items-center justify-center p-4">
      <h1 className="p-4 font-headline text-4xl md:text-7xl">Famous Hallers</h1>
      <div className="flex flex-wrap items-center space-x-3">
        {playerKeys.map(([league, key], idx) => (
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
