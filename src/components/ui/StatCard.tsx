import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  badge?: string;
  icon: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, badge, icon }) => {
  return (
    <div className="gold-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.02em' }}>
          {title}
        </span>
        <span
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--gradient-gold-subtle)',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
          }}
        >
          {icon}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          {value}
        </span>
        {badge && (
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '999px',
              background: 'rgba(212, 175, 55, 0.15)',
              color: 'var(--gold-400)',
              border: '1px solid var(--border-gold)',
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', margin: 0 }}>
        {subtitle}
      </p>
    </div>
  );
};
