export interface Exercise {
  id: string;
  name: string;
  muscleGroup: 'pecho' | 'espalda' | 'piernas' | 'hombros' | 'brazos' | 'core';
  sets: number;
  reps: number;
  weightKg?: number;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  description: string;
  difficulty: 'principiante' | 'intermedio' | 'avanzado' | 'elite';
  durationMinutes: number;
  exercises: Exercise[];
  targetCaloriesBurn: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string | null;
}

export interface FitnessMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}
