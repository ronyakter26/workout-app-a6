import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import { Inter, Oswald } from "next/font/google";

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
  duration: number;
  caloriesBurned: number;
  rating: number;
};

type WorkoutCardProps = {
  workout: Workout;
};

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link href={`/workouts/${workout.id}`}>
      <article className="overflow-hidden rounded-xl border border-[#252932] bg-[#15171C] transition duration-300 hover:-translate-y-1 hover:border-[#C2F800]">
        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Muscle Groups */}
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className={`${inter.className} rounded-full bg-[#C2F800] px-2.5 py-1 text-[9px] font-bold uppercase text-black`}
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h2
            className={`${oswald.className} mt-3 text-lg font-bold uppercase text-white`}
          >
            {workout.name}
          </h2>

          {/* Equipment */}
          <p className={`${inter.className} mt-1 text-xs text-gray-500`}>
            {workout.equipment}
          </p>

          {/* Divider */}
          <div className="my-4 border-t border-[#252932]" />

          {/* Stats */}
          <div
            className={`${inter.className} flex items-center justify-between text-[10px] text-gray-400`}
          >
            <span className="flex items-center gap-1">
              <Clock3 size={12} />
              {workout.duration} min
            </span>

            <span className="flex items-center gap-1">
              <Flame size={12} />
              {workout.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-1">
              <Star size={12} />
              {workout.rating}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default WorkoutCard;