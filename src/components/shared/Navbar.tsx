"use client";

import Image from "next/image";

import logo from "@/assets/logo.png"
import Link from "next/link";
import { useState } from "react";



export default function Navbar() {
const [menuOpen,setMenuOpen]=useState(false);
   
        return (
    <nav className="sticky top-0 z-50 bg-[#151515] text-white">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo + Text */}
        <Link href="/" className="flex items-center gap-2">
<Image
  src={logo}
  alt="FITLOG Logo"
  width={32}
  height={32}
  className="rounded-full"
/>
          <span className="text-lg font-bold">
            FITLOG
          </span>
        </Link>


        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-semibold hover:text-lime-400">
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="text-sm font-semibold hover:text-lime-400"
          >
            My Plan
          </Link>
        </div>


        {/* Desktop Right */}
        <div className="hidden items-center gap-6 md:flex">

          <Link href="/my-plan" className="flex items-center gap-2">
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-xs font-bold text-black">
              0
            </span>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-2">
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#333] px-1 text-xs font-bold">
              0
            </span>
          </Link>

        </div>


        {/* Mobile 3 Dots */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>

      </div>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-700 bg-[#151515] px-6 py-4 md:hidden">

          <div className="flex flex-col gap-4">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-semibold hover:text-lime-400"
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className="font-semibold hover:text-lime-400"
            >
              My Plan
            </Link>

          </div>

        </div>
      )}

    </nav>
  );


}
