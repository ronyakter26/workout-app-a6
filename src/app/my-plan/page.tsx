"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import { Oswald, Inter } from "next/font/google";
import { useWorkouts } from "@/context/WorkoutContext";

const oswald = Oswald({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone }=
      useWorkouts();
       const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">(
    "duration",
  );
  const currentList = activeTab === "plan" ? plan : saved;
const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });
const totalMinutes = plan.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = plan.reduce(
    (acc, curr) => acc + curr.caloriesBurned,
    0,
  );
 return (
    <main className="min-h-screen bg-[#0F1115] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`${oswald.className} text-4xl font-bold uppercase tracking-wider`}
          >
            My Plan
          </h1>
 <p className={`${inter.className} text-gray-400 text-sm mt-1`}>
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#15171C] border border-[#252932] rounded-2xl p-6">
            <span className="text-gray-400 text-xs uppercase tracking-wider">
              Exercises
            </span>

             <div
              className={`${oswald.className} text-4xl font-bold text-[#C2F800] mt-1`}
            >
              {plan.length}
            </div>
          </div>
            <div className="bg-[#15171C] border border-[#252932] rounded-2xl p-6">
            <span className="text-gray-400 text-xs uppercase tracking-wider">
              Minutes
            </span>
<div
              className={`${oswald.className} text-4xl font-bold text-white mt-1`}
            >
              {totalMinutes}
            </div>
          </div>
          <div className="bg-[#15171C] border border-[#252932] rounded-2xl p-6">
            <span className="text-gray-400 text-xs uppercase tracking-wider">
              Calories
            </span>
            <div
className={`${oswald.className} text-4xl font-bold text-white mt-1`}
            >
              {totalCalories}
            </div>
          </div>
        </div>
 <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex bg-[#15171C] p-1.5 rounded-xl border border-[#252932]">
            <button
              onClick={() => setActiveTab("plan")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === "plan"
                  ? "bg-[#252932] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
 >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === "saved"
                  ? "bg-[#252932] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>
 <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Sort By
            </span>
 <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#15171C] border border-[#252932] text-white text-sm rounded-xl px-4 py-2 outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
 {sortedList.length === 0 ? (
          <div className="bg-[#15171C] border border-dashed border-[#252932] rounded-3xl p-16 text-center">
            <h3
              className={`${oswald.className} text-2xl font-bold tracking-wider mb-2`}
            >
              NOTHING HERE YET
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="btn bg-[#C2F800] text-black hover:bg-[#b0df00] border-0 font-bold px-8"
            >
              Go to workouts
            </Link>
          </div>
  ) : (
          <div className="space-y-4">
            {sortedList.map((item) => (
              <div
                key={item.id}
                className="bg-[#15171C] border border-[#252932] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition hover:border-gray-700"

              >
 <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative h-16 w-24 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                   <div>
                    <h4
                      className={`${oswald.className} text-lg font-bold uppercase tracking-wider`}
                    >
                      {item.name}
                    </h4>
                    <p className="text-gray-400 text-xs">{item.equipment}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-300">
 <span className="flex items-center gap-1">
                        <Clock size={14} className="text-[#C2F800]" />{" "}
                        {item.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame size={14} className="text-[#C2F800]" />{" "}
                        {item.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={14} className="text-[#C2F800]" />{" "}
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <Link
                    href={`/workouts/${item.id}`}
                    className="btn btn-sm btn-outline border-gray-700 text-white hover:bg-gray-800"
                  >
                    View Details
                  </Link>
                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(item.id)}
                      className="btn btn-sm bg-[#C2F800] text-black hover:bg-[#b0df00] border-0 font-bold gap-1"
                    >
                      <Check size={16} /> Mark as Done
                    </button>    
                                      )}
                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(item.id)
                        : removeFromSaved(item.id)
                    }
                    className="btn btn-sm btn-ghost text-gray-400 hover:text-red-400"
                  >
                    <X size={18} />
                  </button>
                </div>
                  </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}