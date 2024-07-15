"use client";
import React from "react";
import { CoinSelect } from "./coinSelect";
import { ModeToggle } from "./modeToggle";
import { Coins } from "lucide-react";

type Props = {};

function Navbar({}: Props) {
  return (
    <div className="w-full h-fit bg-transparent flex items-center justify-between px-12 py-4">
      <div className="flex gap-1 items-center justify-center">
        <Coins className="h-5 w-5"/>
        <h1 className="text-sm font-bold">
          coin<span className="text-primary">Science</span>
        </h1>
      </div>

      <div className="flex gap-4 items-center justify-center">
        <CoinSelect />
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
