import { Target, TrendingUp, Zap } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface Project {
  id: string;
  name: string;
  progress: number;
  status: "em-progresso" | "concluido" | "pausado";
}

interface Habit {
  id: string;
  name: string;
  completion: number;
  streak: number;
  icon: string;
}

interface SideCardProps {
  projects?: Project[];
  habits?: Habit[];
}

/**
 * Card Lateral - Projetos em Andamento e Hábitos
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Exibe resumo de projetos e hábitos na Home
 */
export function SideCard({ projects = [], habits = [] }: SideCardProps) {
  const defaultProjects: Project[] = [
    { id: "1", name: "CantinaBeat", progress: 45, status: "em-progresso" },
    { id: "2", name: "QA - Reports", progress: 72, status: "em-progresso" },
    { id: "3", name: "RPG - ToDoList", progress: 85, status: "em-progresso" }
  ];

  const defaultHabits: Habit[] = [
    { id: "1", name: "Exercício", completion: 90, streak: 12, icon: "💪" },
    { id: "2", name: "Meditação", completion: 60, streak: 5, icon: "🧘" },
    { id: "3", name: "Leitura", completion: 75, streak: 8, icon: "📚" },
    { id: "4", name: "Estudo", completion: 67, streak: 6, icon: "🎓" }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displayHabits = habits.length > 0 ? habits : defaultHabits;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em-progresso":
        return "bg-blue-900/30 border-blue-500/30 text-blue-300";
      case "concluido":
        return "bg-green-900/30 border-green-500/30 text-green-300";
      case "pausado":
        return "bg-yellow-900/30 border-yellow-500/30 text-yellow-300";
      default:
        return "bg-slate-900/30 border-slate-500/30 text-slate-300";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-80 bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 neon-glow-cyan h-fit sticky top-8">
      {/* Header */}
      <div className="bg-cyan-900/10 border border-cyan-500/30 rounded-lg p-8 mb-12 neon-glow-cyan">
        <div className="flex flex-col gap-2">
          <ProgressBar label="Dia" percentage={67} color="cyan" />
          <ProgressBar label="Semana" percentage={37} color="magenta" />
          <ProgressBar label="Mês" percentage={58} color="yellow" />
          <ProgressBar label="Ano" percentage={21} color="cyan" />
        </div>
      </div>
      <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider mb-6 flex items-center gap-2">
        <Zap size={20} />
        Metas
      </h2>

      <div className="mb-8">
        <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <TrendingUp size={16} />
          Projetos em Andamento
        </h3>
        <div className="space-y-3">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white truncate">
                  {project.name}
                </span>
                <span
                  className={`text-xs font-mono px-2 py-1 rounded border ${getStatusColor(project.status)}`}
                >
                  {project.progress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                <div
                  className={`h-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Habits Section */}
      <div>
        <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Target size={16} />
          Hábitos
        </h3>
        <div className="space-y-2">
          {displayHabits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between bg-slate-800/50 border border-cyan-500/20 rounded-lg p-3"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="text-lg">{habit.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {habit.name}
                  </p>
                  <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden border border-slate-600 mt-1">
                    <div
                      className={`h-full transition-all duration-300 ${getProgressColor(habit.completion)}`}
                      style={{ width: `${habit.completion}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                <span className="text-xs font-mono text-yellow-300">
                  🔥 {habit.streak}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
