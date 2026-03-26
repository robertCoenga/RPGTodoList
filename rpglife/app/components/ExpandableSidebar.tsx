"use client";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Target,
  University,
  Zap
} from "lucide-react";
import React, { useState } from "react";
import { GiEvilTower } from "react-icons/gi";
import { SiDungeonsanddragons } from "react-icons/si";

interface Module {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

/**
 * Sidebar Expansiva com Módulos Principais
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Colapsável, ícones grandes, design minimalista
 */
export function ExpandableSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const modules: Module[] = [
    {
      id: "0",
      name: "Guilda",
      icon: <University size={24} />,
      color: "text-red-400",
      link: "/pages/home"
    },
    {
      id: "1",
      name: "Projetos",
      icon: <Zap size={24} />,
      color: "text-cyan-400",
      link: "/pages/project"
    },
    {
      id: "2",
      name: "Hábitos",
      icon: <Target size={24} />,
      color: "text-magenta-400",
      link: "/"
    },
    {
      id: "3",
      name: "Cofre",
      icon: <SiDungeonsanddragons size={30} />,
      color: "text-yellow-300",
      link: "/pages/vault"
    },
    {
      id: "4",
      name: "Gráficos",
      icon: <BarChart3 size={24} />,
      color: "text-green-300",
      link: "/pages/analytics"
    },
    {
      id: "5",
      name: "Dungeon",
      icon: <GiEvilTower size={30} />,
      color: "text-orange-400",
      link: "/pages/dungeon"
    }
  ];

  return (
    <aside
      className={`bg-slate-950 border-r-2 border-cyan-500/30 p-4 overflow-y-auto max-h-screen transition-all duration-300 flex flex-col ${
        isExpanded ? "w-64" : "w-24"
      }`}
    >
      {/* Header with Toggle */}
      <div className="flex items-center justify-between mb-8">
        {isExpanded && (
          <h2 className="text-sm font-mono text-cyan-300 uppercase tracking-widest">
            Módulos
          </h2>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-slate-900 rounded-lg transition-colors duration-300 text-cyan-400 hover:text-cyan-300"
          title={isExpanded ? "Colapsar" : "Expandir"}
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="h-px bg-gradient-to-r from-cyan-500 to-transparent mb-6" />
      )}

      {/* Modules List */}
      <nav className="space-y-4 flex-1">
        {modules.map((module) => (
          <a href={module.link}>
            <div
              className={`group flex items-center gap-4 px-3 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-slate-900 hover:border-l-2 hover:border-cyan-400 ${
                isExpanded ? "hover:pl-2" : ""
              }`}
              title={module.name}
            >
              <span
                className={`${module.color} transition-all duration-300 group-hover:drop-shadow-lg flex-shrink-0`}
              >
                {module.icon}
              </span>
              {isExpanded && (
                <span className="text-sm text-slate-300 group-hover:text-cyan-300 transition-colors duration-300 whitespace-nowrap">
                  {module.name}
                </span>
              )}
            </div>
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div
        className={`pt-6 border-t border-cyan-500/20 ${isExpanded ? "" : "text-center"}`}
      >
        <p
          className={`text-xs text-slate-500 font-mono ${isExpanded ? "" : "text-center"}`}
        >
          {isExpanded ? "RPG MANAGER v1.0" : "v1.0"}
        </p>
      </div>
    </aside>
  );
}
