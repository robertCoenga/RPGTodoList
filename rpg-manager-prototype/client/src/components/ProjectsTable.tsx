import React, { useState } from 'react';
import { ChevronRight, Zap, Shield, Heart, BookOpen, Target } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  progress: number;
  status: 'em-progresso' | 'concluido' | 'pausado';
  tags: string[];
  dueDate?: string;
}

interface ProjectsTableProps {
  projects: Project[];
  onProjectClick?: (projectId: string) => void;
}

/**
 * Tabela de projetos com layout tipo Notion
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Tabela interativa, ícones pixelados, barras de progresso, badges
 */
export function ProjectsTable({ projects, onProjectClick }: ProjectsTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const statusColors = {
    'em-progresso': { bg: 'bg-blue-900/30', text: 'text-blue-300', border: 'border-blue-500/30' },
    'concluido': { bg: 'bg-green-900/30', text: 'text-green-300', border: 'border-green-500/30' },
    'pausado': { bg: 'bg-yellow-900/30', text: 'text-yellow-300', border: 'border-yellow-500/30' },
  };

  const statusLabels = {
    'em-progresso': 'Em Progresso',
    'concluido': 'Concluído',
    'pausado': 'Pausado',
  };

  const tagColorMap: Record<string, string> = {
    'Estudo': 'bg-cyan-900/40 text-cyan-300 border-cyan-500/30',
    'Trabalho': 'bg-magenta-900/40 text-magenta-300 border-magenta-500/30',
    'Pessoal': 'bg-yellow-900/40 text-yellow-300 border-yellow-500/30',
    'Saúde': 'bg-green-900/40 text-green-300 border-green-500/30',
    'Criativo': 'bg-purple-900/40 text-purple-300 border-purple-500/30',
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr className="border-b-2 border-cyan-500/30 bg-slate-900/50">
            <th className="px-6 py-4 text-left text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Projeto
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Prazo
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Conclusão
            </th>
            <th className="px-6 py-4 text-right text-sm font-bold text-cyan-300 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {projects.map((project, index) => {
            const isHovered = hoveredRow === project.id;
            const statusColor = statusColors[project.status];

            return (
              <tr
                key={project.id}
                className={`border-b border-cyan-500/20 transition-all duration-300 cursor-pointer group ${
                  isHovered ? 'bg-slate-800/50 border-cyan-500/50' : 'bg-slate-900/30 hover:bg-slate-800/30'
                } ${index % 2 === 0 ? 'bg-opacity-50' : ''}`}
                onMouseEnter={() => setHoveredRow(project.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onProjectClick?.(project.id)}
              >
                {/* Projeto */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {project.icon}
                    </div>
                    <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {project.name}
                    </span>
                  </div>
                </td>

                {/* Categoria */}
                <td className="px-6 py-5">
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    {project.category}
                  </span>
                </td>

                {/* Prazo - Barra de Progresso Visual */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    {/* Barra de Progresso */}
                    <div className="flex-1 h-2 bg-slate-800 border border-cyan-500/20 rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-500"
                        style={{
                          width: `${project.progress}%`,
                          boxShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
                        }}
                      />
                    </div>
                    {/* Ícones de Milestone */}
                    <div className="flex gap-1">
                      {[0, 33, 66, 100].map((milestone) => (
                        <div
                          key={milestone}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            project.progress >= milestone
                              ? 'bg-cyan-400'
                              : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </td>

                {/* Conclusão - Data ou Status */}
                <td className="px-6 py-5">
                  <span className="text-sm text-slate-400 font-mono">
                    {project.dueDate || '—'}
                  </span>
                </td>

                {/* Status e Tags */}
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-2">
                    {/* Tags */}
                    <div className="flex gap-2 mr-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-1 rounded border font-mono ${
                            tagColorMap[tag] || 'bg-slate-800 text-slate-300 border-slate-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`px-3 py-1 rounded-sm border text-xs font-mono font-bold transition-all duration-300 ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}
                    >
                      {statusLabels[project.status]}
                    </div>

                    {/* Chevron */}
                    <ChevronRight
                      size={18}
                      className={`text-cyan-400 transition-all duration-300 ${
                        isHovered ? 'translate-x-1' : ''
                      }`}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
