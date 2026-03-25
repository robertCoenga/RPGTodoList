import React from 'react';

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: 'cyan' | 'magenta' | 'yellow';
}

/**
 * Componente de barra de progresso com efeito neon
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Glow effect, cores vibrantes, animação de preenchimento
 */
export function ProgressBar({ label, percentage, color = 'cyan' }: ProgressBarProps) {
  const colorMap = {
    cyan: { bg: 'bg-cyan-500', glow: 'neon-glow-cyan' },
    magenta: { bg: 'bg-pink-500', glow: 'neon-glow-magenta' },
    yellow: { bg: 'bg-yellow-400', glow: 'neon-glow-yellow' },
  };

  const { bg, glow } = colorMap[color];

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-cyan-300 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-xs font-mono text-yellow-300">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-slate-900 border border-cyan-500/30 rounded-sm overflow-hidden">
        <div
          className={`h-full ${bg} transition-all duration-500 ${glow}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
