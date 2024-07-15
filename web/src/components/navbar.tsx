'use client'
import React from "react";
import { CoinSelect } from "./coinSelect";

type Props = {};

function Navbar({}: Props) {
  return (
    <div className="w-full h-fit bg-transparent flex items-center justify-between px-12 py-4">
      <h1 className="text-sm font-bold">coinScience</h1>
      <CoinSelect />
    </div>
  );
}

export default Navbar;
