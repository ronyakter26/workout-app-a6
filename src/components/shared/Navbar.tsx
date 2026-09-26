
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu } from "lucide-react";

import logo from "@/assets/logo.png";
import { useWorkouts } from "@/context/WorkoutContext";

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved } = useWorkouts();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#161922]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">

        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu */}
          <div className="dropdown md:hidden">
            <button
              tabIndex={0}
              className="text-white"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <ul
              tabIndex={0}
              className="dropdown-content menu mt-3 w-52 rounded-box border border-gray-800 bg-[#161922] p-2 text-white shadow"
            >
              <li>
                <Link
                  href="/"
                  className={
                    isActive("/")
                      ? "font-bold text-[#C2F800]"
                      : "font-semibold"
                  }
                >
                  Workouts
                </Link>
              </li>

              <li>
                <Link
                  href="/my-plan"
                  className={
                    isActive("/my-plan")
                      ? "font-bold text-[#C2F800]"
                      : "font-semibold"
                  }
                >
                  My Plan
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="FITLOG Logo"
              width={32}
              height={32}
              className="rounded-full"
            />

            <span className="text-xl font-bold tracking-wider text-white">
              FIT<span className="text-[#C2F800]">LOG</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">

          <Link
            href="/"
            className={`font-medium transition-colors ${
              isActive("/")
                ? "border-b-2 border-[#C2F800] pb-1 text-[#C2F800]"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`font-medium transition-colors ${
              isActive("/my-plan")
                ? "border-b-2 border-[#C2F800] pb-1 text-[#C2F800]"
                : "text-gray-300 hover:text-white"
            }`}
          >
            My Plan
          </Link>

        </div>

        {/* Right: Plan + Saved */}
        <div className="flex items-center gap-2 md:gap-4">

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-white transition hover:bg-[#15171C]"
          >
            Plan

            <span className="rounded-full bg-[#C2F800] px-2 py-1 text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="hidden items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-white transition hover:bg-[#15171C] sm:flex"
          >
            Saved

            <span className="rounded-full border border-gray-600 px-2 py-1 text-xs font-bold text-white">
              {saved.length}
            </span>
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;