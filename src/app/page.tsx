'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { StatCard } from '../components/ui/StatCard';
import { RoutineCard } from '../components/fitness/RoutineCard';
import { AuthScreen } from '../components/auth/AuthScreen';
import { WorkoutRoutine } from '../types';
import { fetchHealth, fetchWorkoutRoutines } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [routines, setRoutines] = useState<WorkoutRoutine[]>([]);
  const [selectedRoutine, setSelectedRoutine] = useState<WorkoutRoutine | null>(null);
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState(0);

  useEffect(() => {
    async function loadData() {
      // 1. Health check to Express backend
      const health = await fetchHealth();
      setApiStatus(health.status === 'online' ? 'online' : 'offline');

      // 2. Fetch routines from Express API
      const data = await fetchWorkoutRoutines();
      setRoutines(data);
      if (data.length > 0) {
        setSelectedRoutine(data[0]);
      }
    }
    loadData();
  }, []);

  const handleCompleteSet = () => {
    setCompletedSets((prev) => prev + 1);
    setCurrentSet((prev) => (prev < 4 ? prev + 1 : 1));
  };

  // 1. Estado de carga inicial de autenticación
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#070708',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '3px solid rgba(212, 175, 55, 0.2)',
            borderTopColor: 'var(--gold-400)',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <span style={{ color: 'var(--gold-400)', fontSize: '0.88rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Cargando Aurum Fitness...
        </span>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // 2. Si el usuario NO está autenticado, el Login/Registro es lo PRIMERO que ve
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  // 3. Usuario autenticado: Dashboard Principal
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar apiStatus={apiStatus} user={user} onLogout={logout} />

      <main style={{ flex: 1, maxWidth: '1240px', margin: '0 auto', width: '100%', padding: '40px 24px' }}>
        {/* HERO SECTION */}
        <section style={{ textAlign: 'center', marginBottom: '50px', position: 'relative' }}>
          <div style={{ marginBottom: '16px' }}>
            <span className="gold-badge">
              ⚡ Bienvenido Atleta Gold: {user?.firstName} {user?.lastName}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '20px',
            }}
          >
            Tu Centro de Alto Rendimiento <br />
            <span className="gold-gradient-text">Aurum Fitness Suite</span>
          </h1>

          <p
            style={{
              maxWidth: '680px',
              margin: '0 auto 32px auto',
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}
          >
            Sesión activa para <strong style={{ color: 'var(--gold-400)' }}>{user?.email}</strong>. Gestiona tus rutinas de
            hipertrofia y sobrecarga progresiva respaldadas en Supabase PostgreSQL.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#rutinas" className="btn-gold">
              Explorar Rutinas Doradas ⚡
            </a>
            <a href="#arquitectura" className="btn-dark">
              Ver Arquitectura del Sistema 📂
            </a>
          </div>
        </section>

        {/* STATS OVERVIEW */}
        <section id="dashboard" style={{ marginBottom: '56px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
            }}
          >
            <StatCard
              title="CALORÍAS ACTIVAS"
              value="2,840"
              subtitle="Meta diaria completada al 88%"
              badge="+12% hoy"
              icon="🔥"
            />
            <StatCard
              title="VOLUMEN TOTAL (KG)"
              value="18,450"
              subtitle="Sobrecarga progresiva esta semana"
              badge="PR Nuevo"
              icon="🏋️‍♂️"
            />
            <StatCard
              title="SESIONES COMPLETADAS"
              value="24"
              subtitle="Consistencia del mes de Octubre"
              badge="Racha: 6 días"
              icon="⚡"
            />
            <StatCard
              title="ESTADO API EXPRESS"
              value={apiStatus === 'online' ? '200 OK' : 'Local Mock'}
              subtitle={apiStatus === 'online' ? 'Puerto 5000 conectado' : 'Modo desarrollo / Desconectado'}
              badge={apiStatus === 'online' ? 'Activo' : 'Offline'}
              icon="📡"
            />
          </div>
        </section>

        {/* WORKOUT SECTION */}
        <section id="rutinas" style={{ marginBottom: '64px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '28px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <span className="gold-badge" style={{ marginBottom: '8px' }}>Módulo de Entrenamiento</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Programas de Alta Intensidad</h2>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
              Consumiendo endpoint backend: <code style={{ color: 'var(--gold-400)' }}>GET /api/workouts</code>
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {routines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onSelect={(selected) => setSelectedRoutine(selected)}
              />
            ))}
          </div>
        </section>

        {/* ACTIVE SESSION WORKOUT SIMULATOR */}
        {selectedRoutine && (
          <section
            style={{
              marginBottom: '64px',
              background: 'var(--gradient-dark-surface)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              position: 'relative',
              boxShadow: 'var(--gold-glow)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <span className="gold-badge">Sesión en Curso</span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '8px' }}>
                  {selectedRoutine.title}
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Series Registradas:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gold-300)' }}>
                  {completedSets}
                </span>
                <button onClick={handleCompleteSet} className="btn-gold" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  Registrar Serie {currentSet} ✓
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {selectedRoutine.exercises.map((exercise, idx) => (
                <div
                  key={exercise.id}
                  style={{
                    background: 'rgba(10, 10, 12, 0.7)',
                    border: '1px solid var(--border-subtle)',
                    padding: '16px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', fontWeight: 700 }}>
                      Ejercicio #{idx + 1}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                      {exercise.muscleGroup}
                    </span>
                  </div>
                  <strong style={{ fontSize: '0.95rem' }}>{exercise.name}</strong>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', gap: '12px' }}>
                    <span>{exercise.sets} Series</span>
                    <span>•</span>
                    <span>{exercise.reps} Repeticiones</span>
                    {exercise.weightKg && (
                      <>
                        <span>•</span>
                        <span style={{ color: 'var(--gold-300)' }}>{exercise.weightKg} kg</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ARCHITECTURE SUMMARY */}
        <section
          id="arquitectura"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px',
            marginBottom: '40px',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <span className="gold-badge" style={{ marginBottom: '8px' }}>Ingeniería de Software & Seguridad</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Arquitectura por Capas con Supabase</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Autenticación segura y desacoplada mediante DTOs, validaciones Zod, capa de servicio y repositorio Supabase.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            <div
              style={{
                background: 'rgba(10, 10, 12, 0.8)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <h4 style={{ color: 'var(--gold-400)', marginBottom: '12px' }}>
                📁 backend/ (Express + Supabase)
              </h4>
              <ul style={{ listStyle: 'none', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>🔹 <code>routes/auth.routes.ts</code>: Endpoints <code>/register</code>, <code>/login</code>, <code>/me</code></li>
                <li>🔹 <code>validators/auth.validator.ts</code>: Esquemas Zod estrictos</li>
                <li>🔹 <code>controllers/auth.controller.ts</code>: Delegación pura, sin lógica pesada</li>
                <li>🔹 <code>services/auth.service.ts</code>: Reglas de negocio y sanitización</li>
                <li>🔹 <code>repositories/user.repository.ts</code>: Persistencia con Supabase Auth/DB</li>
                <li>🔹 <code>config/supabase.ts</code>: Cliente oficial <code>@supabase/supabase-js</code></li>
              </ul>
            </div>

            <div
              style={{
                background: 'rgba(10, 10, 12, 0.8)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <h4 style={{ color: 'var(--gold-400)', marginBottom: '12px' }}>
                📁 frontend/ (Next.js 16 + Auth Context)
              </h4>
              <ul style={{ listStyle: 'none', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>🔸 <code>components/auth/AuthScreen.tsx</code>: Formulario Login & Registro de lujo</li>
                <li>🔸 <code>context/AuthContext.tsx</code>: Persistencia de sesión en localStorage</li>
                <li>🔸 <code>services/api.ts</code>: Cliente HTTP para <code>loginApi</code> y <code>registerApi</code></li>
                <li>🔸 <code>components/layout/Navbar.tsx</code>: Perfil de usuario y Logout activo</li>
                <li>🔸 <code>app/globals.css</code>: Sistema visual Dorado & Negro puro</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '30px 24px',
          textAlign: 'center',
          color: 'var(--text-dim)',
          fontSize: '0.85rem',
          background: 'var(--bg-surface)',
        }}
      >
        <p>
          Aurum Fitness Suite © 2026 • Diseñado con estética <span style={{ color: 'var(--gold-400)' }}>Dorado & Negro</span>
        </p>
      </footer>
    </div>
  );
}
