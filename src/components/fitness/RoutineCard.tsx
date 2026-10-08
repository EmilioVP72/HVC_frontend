import React from 'react';
import { WorkoutRoutine } from '../../types';

interface RoutineCardProps {
  routine: WorkoutRoutine;
  onSelect?: (routine: WorkoutRoutine) => void;
}

export const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onSelect }) => {
  return (
    <div
      className="gold-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '18px',
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span className="gold-badge">
            Nivel {routine.difficulty}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ⏱️ {routine.durationMinutes} min
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
          {routine.title}
        </h3>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '16px' }}>
          {routine.description}
        </p>

        {/* Exercises preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-400)', fontWeight: 700 }}>
            Ejercicios Clave ({routine.exercises.length})
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {routine.exercises.slice(0, 3).map((ex) => (
              <span
                key={ex.id}
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-main)',
                }}
              >
                {ex.name} ({ex.sets}x{ex.reps})
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase' }}>
            Gasto Estimado
          </span>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gold-300)' }}>
            🔥 {routine.targetCaloriesBurn} kcal
          </span>
        </div>

        <button
          className="btn-gold"
          style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          onClick={() => onSelect && onSelect(routine)}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};
