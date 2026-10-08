'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface AuthScreenProps {
  onSuccess?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status & error states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        if (!email.trim() || !password) {
          throw new Error('Por favor ingresa tu correo y contraseña');
        }
        await login({ email, password });
      } else {
        if (!firstName.trim() || !lastName.trim()) {
          throw new Error('Por favor completa tus nombres y apellidos');
        }
        if (!email.trim() || !password) {
          throw new Error('Por favor ingresa tu correo y una contraseña');
        }
        if (password.length < 6) {
          throw new Error('La contraseña debe contener al menos 6 caracteres');
        }
        await register({
          firstName,
          lastName,
          email,
          password,
        });
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      setErrorMsg((err as Error).message || 'Error en la autenticación');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoFill = () => {
    if (mode === 'login') {
      setEmail('carlos@aurum.com');
      setPassword('password123');
    } else {
      setFirstName('Alejandro');
      setLastName('Valdez');
      setEmail(`atleta_${Math.floor(Math.random() * 900 + 100)}@aurum.com`);
      setPassword('goldpass2026');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(212, 175, 55, 0.1) 0%, #070708 75%)',
      }}
    >
      <div
        className="gold-card"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '38px 32px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 55, 0.18)',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          background: 'rgba(16, 16, 20, 0.88)',
          backdropFilter: 'blur(24px)',
          borderRadius: '24px',
        }}
      >
        {/* Emblem & Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'var(--gradient-gold)',
              margin: '0 auto 14px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              fontWeight: 900,
              color: '#070708',
              boxShadow: '0 0 24px rgba(212, 175, 55, 0.45)',
            }}
          >
            A
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            AURUM <span className="gold-gradient-text">FITNESS</span>
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {mode === 'login'
              ? 'Inicia sesión para acceder a tus entrenamientos'
              : 'Registra tu membresía y transforma tu rendimiento'}
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px 14px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#fca5a5',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {mode === 'register' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label
                  htmlFor="input-firstname"
                  style={{ display: 'block', fontSize: '0.78rem', color: 'var(--gold-400)', fontWeight: 600, marginBottom: '6px' }}
                >
                  Nombre(s) *
                </label>
                <input
                  id="input-firstname"
                  type="text"
                  required
                  placeholder="Ej. Carlos"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'rgba(10, 10, 12, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold-400)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
              </div>

              <div>
                <label
                  htmlFor="input-lastname"
                  style={{ display: 'block', fontSize: '0.78rem', color: 'var(--gold-400)', fontWeight: 600, marginBottom: '6px' }}
                >
                  Apellidos *
                </label>
                <input
                  id="input-lastname"
                  type="text"
                  required
                  placeholder="Ej. Mendoza"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'rgba(10, 10, 12, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold-400)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="input-email"
              style={{ display: 'block', fontSize: '0.78rem', color: 'var(--gold-400)', fontWeight: 600, marginBottom: '6px' }}
            >
              Correo Electrónico *
            </label>
            <input
              id="input-email"
              type="email"
              required
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(10, 10, 12, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                fontSize: '0.88rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold-400)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label
                htmlFor="input-password"
                style={{ fontSize: '0.78rem', color: 'var(--gold-400)', fontWeight: 600 }}
              >
                Contraseña *
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                }}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            <input
              id="input-password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder={mode === 'register' ? 'Mínimo 6 caracteres' : '••••••••'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(10, 10, 12, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                fontSize: '0.88rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold-400)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
            />
          </div>

          <button
            id="btn-auth-submit"
            type="submit"
            disabled={isSubmitting}
            className="btn-gold"
            style={{
              width: '100%',
              padding: '14px',
              marginTop: '8px',
              fontSize: '0.95rem',
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? (
              <span>Verificando credenciales...</span>
            ) : mode === 'login' ? (
              'Iniciar Sesión ⚡'
            ) : (
              'Crear Cuenta & Comenzar 🏆'
            )}
          </button>
        </form>

        {/* Demo Quick-fill button */}
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleDemoFill}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-dim)',
              fontSize: '0.74rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            ⚡ Cargar datos de prueba
          </button>
        </div>

        {/* Switcher link */}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)',
            textAlign: 'center',
            fontSize: '0.84rem',
            color: 'var(--text-muted)',
          }}
        >
          {mode === 'login' ? (
            <span>
              ¿No tienes una cuenta aún?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setMode('register');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--gold-400)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                  font: 'inherit',
                }}
              >
                Regístrate aquí
              </button>
            </span>
          ) : (
            <span>
              ¿Ya eres miembro de Aurum?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setMode('login');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--gold-400)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                  font: 'inherit',
                }}
              >
                Inicia sesión aquí
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
