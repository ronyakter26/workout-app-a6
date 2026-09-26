import Link from "next/link";
import Image from "next/image";
import bannerImg from "@/assets/banner.png";
import { Inter, Oswald } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const oswald = Oswald({
  subsets: ["latin"],
});


       
const Banner = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:px-6 lg:px-0">
      <div className="grid items-center gap-8 border rounded-3xl border-[#3B4A5A] bg-[#15171C] px-6 py-10 md:px-10 lg:grid-cols-2 lg:px-12 lg:py-12">
        {/* Left Content */}
        <div>
          <p
            className={`${inter.className} text-xs font-bold uppercase tracking-[0.2em] text-[#C2F800]`}
          >
            WORKOUT LIBRARY
          </p>

          <h1
            className={`${oswald.className} mt-5 text-6xl font-bold uppercase leading-[0.95] text-white md:text-6xl lg:text-6xl`}
          >
            TRAIN WITH INTENT. LOG <br />
            EVERY SET.
          </h1>

          <p
            className={`${inter.className} mt-6 max-w-xl text-sm leading-6 text-gray-400 md:text-base md:leading-7`}
          >
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            <br />
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
  href="#library"
  className={`${inter.className} mt-8 inline-block rounded-md border-0 bg-[#C2F800] px-6 py-3 text-xs font-bold uppercase text-black transition hover:bg-lime-300`}
>
  BROWSE WORKOUTS
</Link>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src={bannerImg}
            alt="Workout Banner"
            priority
            className="w-[250px] md:w-[300px] lg:w-[360px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;