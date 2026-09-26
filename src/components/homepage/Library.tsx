"use client";

import { useEffect, useState } from "react";
import { Inter, Oswald } from "next/font/google";

import WorkoutCard from "./WorkoutCard";

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

const Library = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("https://api.abcz.workers.dev/api/fitlog");

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load workouts.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section
  id="library"
  className="container mx-auto px-4 py-16 md:px-6 lg:px-0"
>
      <div className="mb-8">
        <h2
          className={`${oswald.className} text-4xl font-bold uppercase text-white md:text-5xl`}
        >
          THE LIBRARY
        </h2>

        <p className={`${inter.className} mt-1 text-sm text-gray-500`}>
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-20 text-center">
          <p className={`${inter.className} text-sm text-gray-400`}>
            Loading workouts...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="py-20 text-center">
          <p className={`${inter.className} text-sm text-red-400`}>{error}</p>
        </div>
      )}

      {/* Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Library;