"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { Home, User, UserCheck } from "lucide-react";

export default function NavBar() {
  const scrolled = useScroll(50);

  return (
    <>
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled
            ? "border-b border-black bg-white/20 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Home color="white"/>
          </Link>
          <Link href="/" className="flex items-center font-display text-2xl">
            <User color="white"/>
          </Link>
        </div>
      </div>
    </>
  );
}