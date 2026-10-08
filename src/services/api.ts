import { ApiResponse, WorkoutRoutine } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchHealth(): Promise<{ status: string; uptime: number }> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API Health check falló');
    const json: ApiResponse<{ status: string; uptime: number }> = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error al conectar con backend:', error);
    return { status: 'offline', uptime: 0 };
  }
}

export async function fetchWorkoutRoutines(): Promise<WorkoutRoutine[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/workouts`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) throw new Error('Error al obtener rutinas');
    const json: ApiResponse<WorkoutRoutine[]> = await res.json();
    return json.data || [];
  } catch (error) {
    console.warn('Backend no disponible, usando respaldo offline:', error);
    // Fallback data para SSR o cuando el backend está arrancando
    return [
      {
        id: 'gold-fallback-1',
        title: 'Hipertrofia Gold: Torso Superior',
        description: 'Rutina de alto impacto diseñada para hipertrofia y fuerza en torso superior.',
        difficulty: 'avanzado',
        durationMinutes: 60,
        targetCaloriesBurn: 550,
        createdAt: new Date().toISOString(),
        exercises: [
          { id: '1', name: 'Press Banca Plano', muscleGroup: 'pecho', sets: 4, reps: 8, weightKg: 80 },
          { id: '2', name: 'Dominadas con Lastre', muscleGroup: 'espalda', sets: 4, reps: 6, weightKg: 10 },
          { id: '3', name: 'Press Militar', muscleGroup: 'hombros', sets: 3, reps: 10, weightKg: 24 },
        ],
      },
      {
        id: 'gold-fallback-2',
        title: 'Fuerza & Potencia: Tren Inferior',
        description: 'Sobrecarga progresiva biomecánica en cuádriceps, glúteos e isquios.',
        difficulty: 'elite',
        durationMinutes: 70,
        targetCaloriesBurn: 620,
        createdAt: new Date().toISOString(),
        exercises: [
          { id: '4', name: 'Sentadilla Trasera', muscleGroup: 'piernas', sets: 5, reps: 5, weightKg: 120 },
          { id: '5', name: 'Peso Muerto Rumano', muscleGroup: 'piernas', sets: 4, reps: 8, weightKg: 100 },
        ],
      },
    ];
  }
}
