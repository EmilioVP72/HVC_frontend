'use client';

import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  apiStatus: 'online' | 'offline' | 'checking';
}

export const Navbar: React.FC<NavbarProps> = ({ apiStatus }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--gradient-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              color: '#070708',
              fontSize: '1.2rem',
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.4)',
            }}
          >
            A
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '0.04em' }}>
              AURUM <span className="gold-gradient-text">FITNESS</span>
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Elite Performance
            </span>
          </div>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <Link href="#dashboard" style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>
            Dashboard
          </Link>
          <Link href="#rutinas" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            Rutinas
          </Link>
          <Link href="#arquitectura" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            Arquitectura
          </Link>

          {/* Backend Status Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '999px',
              background: 'rgba(25, 25, 30, 0.8)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.72rem',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: apiStatus === 'online' ? '#22c55e' : apiStatus === 'checking' ? '#eab308' : '#ef4444',
                boxShadow: apiStatus === 'online' ? '0 0 8px #22c55e' : 'none',
              }}
            />
            <span style={{ color: 'var(--text-muted)' }}>
              API Express: <strong style={{ color: apiStatus === 'online' ? 'var(--gold-400)' : '#ef4444' }}>{apiStatus}</strong>
            </span>
          </div>

          <button className="btn-gold" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
            Acceso VIP
          </button>
        </div>
      </div>
    </nav>
  );
};
