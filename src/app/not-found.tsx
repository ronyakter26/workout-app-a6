import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-white flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-[#C2F800] text-sm font-bold tracking-widest">
          404
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-3">
          WORKOUT NOT FOUND
        </h1>

        <p className="text-gray-400 mt-3">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 bg-[#C2F800] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#b0df00]"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}