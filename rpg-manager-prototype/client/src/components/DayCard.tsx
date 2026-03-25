import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface DayCardProps {
  day: string;
  dayName: string;
  imageUrl: string;
  tasksCompleted: number;
  totalTasks: number;
  color: string;
  onClick: () => void;
}

/**
 * Card do dia com imagem temática e progresso
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Imagem de fundo, barra de progresso, efeito hover com glow
 */
export function DayCard({
  day,
  dayName,
  imageUrl,
  tasksCompleted,
  totalTasks,
  color,
  onClick,
}: DayCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const percentage = Math.round((tasksCompleted / totalTasks) * 100);

  const colorMap: Record<string, string> = {
    orange: '#ff9500',
    purple: '#a855f7',
    green: '#10b981',
    blue: '#3b82f6',
    pink: '#ec4899',
  };

  return (
    <div
      className="relative h-48 rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={dayName}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-repeat"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.1) 2px, rgba(0, 217, 255, 0.1) 4px)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-mono text-cyan-300 uppercase tracking-widest">
              {day}
            </p>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">
              {dayName}
            </h3>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-cyan-400"
            style={{ backgroundColor: `${colorMap[color as keyof typeof colorMap]}20` }}
          >
            <ChevronRight
              size={16}
              className="text-cyan-300"
              style={{ opacity: isHovering ? 1 : 0.5, transition: 'opacity 0.3s' }}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-yellow-300">TASKS</span>
            <span className="text-xs font-mono text-yellow-300">
              {tasksCompleted}/{totalTasks}
            </span>
          </div>
          <div className="w-full h-2 bg-black/50 border border-cyan-500/30 rounded-sm overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-500 neon-glow-cyan"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Neon Border on Hover */}
      {isHovering && (
        <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg pointer-events-none animate-pulse" />
      )}
    </div>
  );
}
