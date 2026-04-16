import React from 'react';
import { Link } from 'wouter';
import { Zap, Target, BookOpen, Dumbbell, Heart, Scroll, Coins, BarChart3, Castle } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  link?: string;
}

/**
 * Sidebar com projetos e metas
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Ícones pixelados, cores vibrantes, layout vertical
 */
export function Sidebar() {
  const projects: Project[] = [
    { id: '1', name: 'Projetos', icon: <Zap size={16} />, color: 'text-cyan-400', link: '/projects' },
    { id: '2', name: 'Habituação', icon: <Target size={16} />, color: 'text-magenta-400' },
    { id: '3', name: 'Treinar musculação', icon: <Dumbbell size={16} />, color: 'text-yellow-400' },
    { id: '4', name: 'Cuidar da saúde', icon: <Heart size={16} />, color: 'text-pink-400' },
    { id: '5', name: 'Regular o sono', icon: <BookOpen size={16} />, color: 'text-green-400' },
    { id: '6', name: 'Cofre', icon: <Coins size={16} />, color: 'text-yellow-300', link: '/vault' },
    { id: '7', name: 'Gráficos', icon: <BarChart3 size={16} />, color: 'text-green-300', link: '/analytics' },
    { id: '8', name: 'Dungeon', icon: <Castle size={16} />, color: 'text-orange-400', link: '/dungeon' },
    { id: '9', name: 'Notion', icon: <Scroll size={16} />, color: 'text-purple-400' },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r-2 border-cyan-500/30 p-6 overflow-y-auto max-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-sm font-mono text-cyan-300 uppercase tracking-widest mb-2">
          ▶ Sonhos Metas & Objetivos
        </h2>
        <div className="h-px bg-gradient-to-r from-cyan-500 to-transparent" />
      </div>

      {/* Projects List */}
      <nav className="space-y-3">
        {projects.map((project) => {
          const content = (
            <>
              <span className={`${project.color} transition-all duration-300 group-hover:drop-shadow-lg`}>
                {project.icon}
              </span>
              <span className="text-sm text-slate-300 group-hover:text-cyan-300 transition-colors duration-300">
                {project.name}
              </span>
            </>
          );

          if (project.link) {
            return (
              <Link key={project.id} href={project.link}>
                <div className="group flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer transition-all duration-300 hover:bg-slate-900 hover:border-l-2 hover:border-cyan-400 hover:pl-2">
                  {content}
                </div>
              </Link>
            );
          }

          return (
            <div
              key={project.id}
              className="group flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer transition-all duration-300 hover:bg-slate-900 hover:border-l-2 hover:border-cyan-400 hover:pl-2"
            >
              {content}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-cyan-500/20">
        <p className="text-xs text-slate-500 font-mono">
          RPG MANAGER v1.0
        </p>
      </div>
    </aside>
  );
}
