import React, { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, Clock, Tag, BookOpen, Zap, CheckCircle2, Circle, Plus } from 'lucide-react';

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

/**
 * Página de detalhes do dia
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Visualização completa de tarefas, edição inline, adicionar novas tarefas
 */
export default function DayDetail() {
  const [match, params] = useRoute('/day/:id');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Revisar código do projeto', time: '09:00', tag: 'Importante', project: 'Projeto X', completed: true },
    { id: '2', title: 'Treino de musculação', time: '18:00', tag: 'Normal', habit: 'Exercício', completed: false },
    { id: '3', title: 'Estudar React', time: '20:00', tag: 'Normal', course: 'React Avançado', completed: false },
  ]);

  const dayName = params?.id || 'Segunda';
  const completedCount = tasks.filter(t => t.completed).length;
  const percentage = Math.round((completedCount / tasks.length) * 100);

  const tagColors: Record<string, string> = {
    'Importante': 'bg-red-900/30 text-red-300 border-red-500/30',
    'Normal': 'bg-blue-900/30 text-blue-300 border-blue-500/30',
    'Baixa': 'bg-gray-900/30 text-gray-300 border-gray-500/30',
  };

  const handleTaskToggle = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  if (!match) return null;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b-2 border-cyan-500/30 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-300 text-cyan-400 hover:text-cyan-300">
                <ArrowLeft size={24} />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-cyan-300 uppercase tracking-wider">
                {dayName}
              </h1>
              <p className="text-sm text-slate-400 font-mono">18 de Março de 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Card */}
        <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-8 mb-8 neon-glow-cyan">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-mono text-yellow-300 uppercase">Progresso do Dia</span>
            <span className="text-sm font-mono text-cyan-300">{completedCount}/{tasks.length}</span>
          </div>
          <div className="w-full h-4 bg-slate-900 border border-cyan-500/30 rounded-sm overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-500 neon-glow-cyan"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-4">
            {completedCount} de {tasks.length} tarefas concluídas
          </p>
        </div>

        {/* Tasks Section */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider">
              ▶ Tarefas do Dia
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/50 text-cyan-300 hover:bg-slate-800 transition-colors duration-300 font-mono text-sm">
              <Plus size={16} />
              Nova Tarefa
            </button>
          </div>

          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
                task.completed
                  ? 'bg-slate-800/50 border-cyan-500/20 opacity-60'
                  : 'bg-slate-800 border-cyan-500/50 hover:border-cyan-400 hover:bg-slate-700'
              }`}
              onClick={() => handleTaskToggle(task.id)}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className="mt-1 flex-shrink-0">
                  {task.completed ? (
                    <CheckCircle2 size={24} className="text-cyan-400 neon-glow-cyan" />
                  ) : (
                    <Circle size={24} className="text-slate-500 group-hover:text-cyan-400" />
                  )}
                </div>

                {/* Task Content */}
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                    {task.title}
                  </h3>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-3 mt-3">
                    {task.time && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock size={16} />
                        <span className="font-mono">{task.time}</span>
                      </div>
                    )}

                    {task.tag && (
                      <span className={`text-xs px-3 py-1 rounded border font-mono ${tagColors[task.tag] || tagColors['Normal']}`}>
                        {task.tag}
                      </span>
                    )}

                    {task.course && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <BookOpen size={16} />
                        <span>{task.course}</span>
                      </div>
                    )}

                    {task.project && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Zap size={16} />
                        <span>{task.project}</span>
                      </div>
                    )}

                    {task.habit && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Tag size={16} />
                        <span>{task.habit}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 text-center">
            <p className="text-xs font-mono text-slate-500 uppercase mb-2">Concluídas</p>
            <p className="text-3xl font-bold text-cyan-400">{completedCount}</p>
          </div>
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 text-center">
            <p className="text-xs font-mono text-slate-500 uppercase mb-2">Pendentes</p>
            <p className="text-3xl font-bold text-yellow-400">{tasks.length - completedCount}</p>
          </div>
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 text-center">
            <p className="text-xs font-mono text-slate-500 uppercase mb-2">Progresso</p>
            <p className="text-3xl font-bold text-magenta-400">{percentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
