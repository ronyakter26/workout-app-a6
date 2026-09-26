import Image from "next/image";
import logo from "@/assets/logo.png";
export default function Footer() {
  return (
    <footer className="border-t border-[#252932] bg-[#0F1115] py-8 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="FitLog Logo" width={24} height={24} />
          <span className="text-white font-extrabold tracking-wider text-sm">
            FITLOG
          </span>
        </div>
        <p className="text-xs text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}