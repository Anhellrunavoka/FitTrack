import { create } from "zustand";
import { Workout, WorkoutCategory } from "../types/workout";
import { storage } from "./storage";
import { MOCK_WORKOUTS } from "../constants/mockData";
import { createJSONStorage, persist } from "zustand/middleware";
 
type WorkoutStore = {
    workouts: Workout[],
    activeFilter: WorkoutCategory | 'all',
    addWorkout: (workout: Workout) => void,
    deleteWorkout: (id: string) => void,
    updateWorkout: (id: string, workout: Workout) => void,
    setFilter: (filter: WorkoutCategory | 'all') => void,
    completeWorkout: (id: string) => void,
    toggleExerciseComplete: (workoutId: string, exerciseId: string) => void
}
 
export const useWorkoutStore = create<WorkoutStore>()(
    persist(
        (set, get) => ({
                workouts: MOCK_WORKOUTS,
                activeFilter: 'all',
               
                addWorkout: (workout) => { 
                    set(state => ({
                        workouts: [...state.workouts, workout]
                    }))
                },
                deleteWorkout: (id) => { 
                    set(state => ({
                        workouts: state.workouts.filter(w => w.id !== id)
                    }))
                },
                updateWorkout: (id, workout) => {},
                setFilter: (filter) => {
                    set({ activeFilter: filter })
                },
                completeWorkout: (id) => {
                    set(state => ({
                        workouts: state.workouts.map(w => 
                            w.id === id ? { ...w, completedAt: w.completedAt ? undefined : new Date().toISOString() } : w
                        )
                    }))
                },
                toggleExerciseComplete: (workoutId, exerciseId) => {
                    set(state => ({
                        workouts: state.workouts.map(w => {
                            if (w.id !== workoutId) return w;
                            return {
                                ...w,
                                exercises: w.exercises.map(ex => 
                                    ex.id === exerciseId ? { ...ex, isCompleted: !ex.isCompleted } : ex
                                )
                            };
                        })
                    }));
                }
        }),
        {
            name: "workout-store",
            storage: createJSONStorage(() => storage),
            partialize: (state) => ({ workouts: state.workouts }),
        }
    ),
);