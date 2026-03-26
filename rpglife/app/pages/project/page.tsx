"use client";
import {
  BookOpen,
  Filter,
  Heart,
  Plus,
  Scroll,
  Search,
  Shield,
  Target,
  Zap
} from "lucide-react";
import React, { useState } from "react";
import { ExpandableSidebar } from "../../components/ExpandableSidebar";
import { ProjectsTable } from "../../components/ProjectsTable";

/**
 * Página de projetos com layout tipo Notion
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Tabela interativa, filtros, busca, ícones temáticos
 */

interface Project {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  progress: number;
  status: "em-progresso" | "concluido" | "pausado";
  tags: string[];
  dueDate?: string;
}

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: "1",
      name: "CantinaBeat",
      icon: <Zap size={20} />,
      category: "Estudo",
      progress: 45,
      status: "em-progresso",
      tags: ["Estudo"],
      dueDate: "Mar 25"
    },
    {
      id: "2",
      name: "QA - Reports",
      icon: <Shield size={20} />,
      category: "Estudo",
      progress: 62,
      status: "em-progresso",
      tags: ["Estudo"],
      dueDate: "Mar 30"
    },
    {
      id: "3",
      name: "RPG - ToDoList",
      icon: <BookOpen size={20} />,
      category: "Estudo",
      progress: 78,
      status: "em-progresso",
      tags: ["Estudo", "Criativo"],
      dueDate: "Abr 5"
    },
    {
      id: "4",
      name: "Habituação Diária",
      icon: <Target size={20} />,
      category: "Pessoal",
      progress: 100,
      status: "concluido",
      tags: ["Pessoal", "Saúde"],
      dueDate: "Mar 20"
    },
    {
      id: "5",
      name: "Treino Musculação",
      icon: <Heart size={20} />,
      category: "Saúde",
      progress: 85,
      status: "em-progresso",
      tags: ["Saúde"],
      dueDate: "Mar 28"
    },
    {
      id: "6",
      name: "Notion Setup",
      icon: <Scroll size={20} />,
      category: "Pessoal",
      progress: 30,
      status: "pausado",
      tags: ["Pessoal"],
      dueDate: "Abr 10"
    }
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = !selectedFilter || project.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filters = [
    {
      id: "em-progresso",
      label: "Em Progresso",
      count: projects.filter((p) => p.status === "em-progresso").length
    },
    {
      id: "concluido",
      label: "Concluído",
      count: projects.filter((p) => p.status === "concluido").length
    },
    {
      id: "pausado",
      label: "Pausado",
      count: projects.filter((p) => p.status === "pausado").length
    }
  ];

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <ExpandableSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-cyan-300 uppercase tracking-widest mb-2">
              Projetos & Metas
            </h1>
            <p className="text-slate-400 font-mono text-sm">
              Gerencie seus projetos e acompanhe o progresso
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex gap-4 mb-8">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300"
              />
            </div>

            {/* Filter Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-cyan-500/30 rounded-lg text-cyan-300 hover:bg-slate-800 hover:border-cyan-400 transition-all duration-300 font-mono text-sm">
              <Filter size={16} />
              Filtrar
            </button>

            {/* Add New Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500 rounded-lg text-cyan-300 hover:bg-cyan-500/30 transition-all duration-300 font-mono text-sm neon-glow-cyan">
              <Plus size={16} />
              Novo Projeto
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setSelectedFilter(null)}
              className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all duration-300 ${
                selectedFilter === null
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                  : "bg-slate-900/50 border-cyan-500/30 text-slate-400 hover:border-cyan-400"
              }`}
            >
              Todos ({projects.length})
            </button>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                    : "bg-slate-900/50 border-cyan-500/30 text-slate-400 hover:border-cyan-400"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* Projects Table */}
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg overflow-hidden neon-glow-cyan">
            {filteredProjects.length > 0 ? (
              <ProjectsTable
                projects={filteredProjects}
                onProjectClick={(projectId) => {
                  console.log("Projeto clicado:", projectId);
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-slate-500">
                <p className="text-sm">Nenhum projeto encontrado</p>
              </div>
            )}
          </div>

          {/* Stats Footer */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 text-center">
              <p className="text-xs font-mono text-slate-500 uppercase mb-2">
                Total
              </p>
              <p className="text-3xl font-bold text-cyan-400">
                {projects.length}
              </p>
            </div>
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 text-center">
              <p className="text-xs font-mono text-slate-500 uppercase mb-2">
                Em Progresso
              </p>
              <p className="text-3xl font-bold text-blue-400">
                {projects.filter((p) => p.status === "em-progresso").length}
              </p>
            </div>
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 text-center">
              <p className="text-xs font-mono text-slate-500 uppercase mb-2">
                Concluídos
              </p>
              <p className="text-3xl font-bold text-green-400">
                {projects.filter((p) => p.status === "concluido").length}
              </p>
            </div>
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 text-center">
              <p className="text-xs font-mono text-slate-500 uppercase mb-2">
                Progresso Médio
              </p>
              <p className="text-3xl font-bold text-yellow-400">
                {Math.round(
                  projects.reduce((acc, p) => acc + p.progress, 0) /
                    projects.length
                )}
                %
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
