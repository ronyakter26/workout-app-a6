export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* daisyUI loading spinner with custom accent color */}
        <span className="loading loading-spinner loading-lg text-[#C2F800]"></span>
        <p className="text-gray-400 text-sm tracking-wider uppercase font-medium animate-pulse">
          Loading workouts…
        </p>
      </div>
    </main>
  );
}