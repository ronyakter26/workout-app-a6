"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

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

type WorkoutContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [plan, saved]);

  const addToPlan = (workout: Workout) => {
    if (plan.some((w) => w.id === workout.id)) {
      toast.error("Workout is already in today's plan!");
      return;
    }
    if (plan.length >= 5) {
      toast.error("Cap of 5 lifts reached for today!");
      return;
    }
    setPlan([...plan, workout]);
    toast.success("Added to today's plan!");
  };

  const removeFromPlan = (id: number) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast.success("Removed from plan");
  };

  const addToSaved = (workout: Workout) => {
    if (saved.some((w) => w.id === workout.id)) {
      toast.error("Already saved for later!");
      return;
    }
    setSaved([...saved, workout]);
    toast.success("Saved for later!");
  };

  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((w) => w.id !== id));
    toast.success("Removed from saved");
  };

  const markAsDone = (id: number) => {
    toast.success("Workout marked as done! Great job! 🎉");
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        markAsDone,
      }}
    >
      <Toaster position="bottom-right" />
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context)
    throw new Error("useWorkouts must be used within a WorkoutProvider");
  return context;
}