"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import icon from "~~/assets/icon.png";

/**
 * Site header
 */
export const Header = () => {
  return (
    <div className="sticky bg-dark lg:static top-0 navbar h-20 flex-shrink-0 justify-between z-20  shadow-secondary px-0 sm:px-2 border-b-4 border-b-dark-3">
      <div className="flex w-full justify-center">
        <Link href="/" passHref className="flex justify-center items-center gap-2 ml-4 mr-6 shrink-0 m-auto">
          <div className="flex items-center gap-2">
            <Image className="w-20" src={icon} alt="PokemonNFT" />
            <span className="font-bold leading-tight text-muted">Pokemon List</span>
          </div>
        </Link>
      </div>
      <div className="absolute h-full right-0 pr-3">
        <button className="btn btn-primary">Connect</button>
      </div>
    </div>
  );
};
