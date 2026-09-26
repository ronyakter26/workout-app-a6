"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Bookmark } from "lucide-react";
import { Inter, Oswald } from "next/font/google";
import { useParams } from "next/navigation";
import { useWorkouts } from "@/context/WorkoutContext";

const inter = Inter({
  subsets: ["latin"],
});

const oswald = Oswald({
  subsets: ["latin"],
});

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { addToPlan, addToSaved } = useWorkouts();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`,
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data = await response.json();
        setWorkout(data);
      } catch (error) {
        console.error(error);
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkout();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1115] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#C2F800]"></span>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0F1115] text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          Workout not found
        </h1>

        <Link
          href="/"
          className="btn bg-[#C2F800] text-black border-0"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0F1115] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <Link
          href="/"
          className={`${inter.className} inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm`}
        >
          <ArrowLeft size={16} />
          Back to Library
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left - Image */}
          <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden border border-[#252932] bg-[#15171C]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right - Details */}
          <div>

            {/* Title */}
            <h1
              className={`${oswald.className} text-3xl md:text-4xl font-bold uppercase tracking-wider`}
            >
              {workout.name}
            </h1>

            {/* Description */}
            <p
              className={`${inter.className} text-gray-400 mt-2 text-sm leading-relaxed`}
            >
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="flex flex-wrap gap-2 mt-4">
              {workout.muscleGroups?.map((muscle) => (
                <span
                  key={muscle}
                  className="bg-[#C2F800] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Specs */}
            <div className="mt-6 bg-[#15171C] rounded-xl border border-[#252932] divide-y divide-[#252932] text-sm">

              <div className="flex justify-between p-3.5">
                <span className="text-gray-400 uppercase text-xs">
                  Equipment
                </span>
                <span className="font-semibold">
                  {workout.equipment}
                </span>
              </div>

              <div className="flex justify-between p-3.5">
                <span className="text-gray-400 uppercase text-xs">
                  Difficulty
                </span>
                <span className="font-semibold">
                  {workout.difficulty}
                </span>
              </div>

              <div className="flex justify-between p-3.5">
                <span className="text-gray-400 uppercase text-xs">
                  Sets
                </span>
                <span className="font-semibold">
                  {workout.sets}
                </span>
              </div>

              <div className="flex justify-between p-3.5">
                <span className="text-gray-400 uppercase text-xs">
                  Reps
                </span>
                <span className="font-semibold">
                  {workout.reps}
                </span>
              </div>

              <div className="flex justify-between p-3.5">
                <span className="text-gray-400 uppercase text-xs">
                  Duration
                </span>
                <span className="font-semibold">
                  {workout.duration} min
                </span>
              </div>

              <div className="flex justify-between p-3.5">
                <span className="text-gray-400 uppercase text-xs">
                  Calories
                </span>
                <span className="font-semibold">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex justify-between p-3.5">
                <span className="text-gray-400 uppercase text-xs">
                  Rating
                </span>
                <span className="font-semibold">
                  {workout.rating}
                </span>
              </div>

            </div>

            {/* Instructions */}
            <div className="mt-6">
              <h3
                className={`${oswald.className} uppercase tracking-wider text-sm text-gray-300 mb-3`}
              >
                Instructions
              </h3>

              <ol className="space-y-2 text-sm text-gray-400 list-decimal list-inside">
                {workout.instructions?.map((step, index) => (
                  <li key={index} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <button
                onClick={() => addToPlan(workout)}
                className="btn bg-[#C2F800] text-black hover:bg-[#b0df00] border-0 font-bold flex-1"
              >
                <Check size={18} />
                Add to today's plan
              </button>

              <button
                onClick={() => addToSaved(workout)}
                className="btn btn-outline border-gray-700 text-white hover:bg-gray-800 flex-1"
              >
                <Bookmark size={18} />
                Save for later
              </button>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}