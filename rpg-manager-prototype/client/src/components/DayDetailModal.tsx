import React, { useState } from 'react';
import { X, Clock, Tag, BookOpen, Zap, CheckCircle2, Circle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  time: string;
  tag: string;
  course?: string;
  project?: string;
  habit?: string;
  completed: boolean;
}

interface DayDetailModalProps {
  dayName: string;
  date: string;
  tasks: Task[];
  onClose: () => void;
  onTaskToggle: (taskId: string) => void;
}

/**
 * Modal de detalhes do dia com lista de tarefas
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Lista detalhada, tags coloridas, checkboxes animados
 */
export function DayDetailModal({
  dayName,
  date,
  tasks,
  onClose,
  onTaskToggle,
}: DayDetailModalProps) {
  const completedCount = tasks.filter(t => t.completed).length;
  const percentage = Math.round((completedCount / tasks.length) * 100);

  const tagColors: Record<string, string> = {
    'Importante': 'bg-red-900/30 text-red-300 border-red-500/30',
    'Normal': 'bg-blue-900/30 text-blue-300 border-blue-500/30',
    'Baixa': 'bg-gray-900/30 text-gray-300 border-gray-500/30',
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border-2 border-cyan-500 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col neon-glow-cyan">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-cyan-500/30 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 uppercase tracking-wider">
              {dayName}
            </h2>
            <p className="text-sm text-slate-400 font-mono mt-1">{date}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-300 text-cyan-400 hover:text-cyan-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/50 border-b border-cyan-500/30 px-6 py-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-mono text-yellow-300 uppercase">Progresso</span>
            <span className="text-sm font-mono text-cyan-300">{completedCount}/{tasks.length}</span>
          </div>
          <div className="w-full h-3 bg-slate-900 border border-cyan-500/30 rounded-sm overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-500 neon-glow-cyan"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Tasks List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {tasks.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-slate-500">
              <p className="text-sm">Nenhuma tarefa para este dia</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                  task.completed
                    ? 'bg-slate-800/50 border-cyan-500/20 opacity-60'
                    : 'bg-slate-800 border-cyan-500/50 hover:border-cyan-400 hover:bg-slate-700'
                }`}
                onClick={() => onTaskToggle(task.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <div className="mt-1 flex-shrink-0">
                    {task.completed ? (
                      <CheckCircle2 size={20} className="text-cyan-400 neon-glow-cyan" />
                    ) : (
                      <Circle size={20} className="text-slate-500 group-hover:text-cyan-400" />
                    )}
                  </div>

                  {/* Task Content */}
                  <div className="flex-1">
                    <h3 className={`font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                      {task.title}
                    </h3>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {task.time && (
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock size={14} />
                          <span className="font-mono">{task.time}</span>
                        </div>
                      )}

                      {task.tag && (
                        <span className={`text-xs px-2 py-1 rounded border font-mono ${tagColors[task.tag] || tagColors['Normal']}`}>
                          {task.tag}
                        </span>
                      )}

                      {task.course && (
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <BookOpen size={14} />
                          <span>{task.course}</span>
                        </div>
                      )}

                      {task.project && (
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Zap size={14} />
                          <span>{task.project}</span>
                        </div>
                      )}

                      {task.habit && (
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Tag size={14} />
                          <span>{task.habit}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-800/50 border-t border-cyan-500/30 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-cyan-500/50 text-cyan-300 hover:bg-slate-700 transition-colors duration-300 font-mono text-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
