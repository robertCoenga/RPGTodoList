import React, { useState } from 'react';
import { ExpandableSidebar } from '@/components/ExpandableSidebar';
import { SideCard } from '@/components/SideCard';
import { ProgressBar } from '@/components/ProgressBar';
import { DayCard } from '@/components/DayCard';
import { DayDetailModal } from '@/components/DayDetailModal';
import { CalendarWithTasks } from '@/components/CalendarWithTasks';

/**
 * Página principal do RPG Personal Manager
 * Design: Taverna Neon - Cyberpunk RPG
 * Seção: Geral - Dias
 * Características:
 * - Barra de progresso (Dia, Semana, Mês, Ano)
 * - Cards dos dias da semana com imagens temáticas
 * - Sidebar com projetos e metas
 * - Modal interativo com detalhes de tarefas
 */

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

interface DayData {
  id: string;
  day: string;
  dayName: string;
  date: string;
  imageUrl: string;
  tasksCompleted: number;
  totalTasks: number;
  color: string;
  tasks: Task[];
}

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [tasks, setTasks] = useState<Record<string, Task[]>>({
    monday: [
      { id: '1', title: 'Revisar código do projeto', time: '09:00', tag: 'Importante', project: 'Projeto X', completed: true },
      { id: '2', title: 'Treino de musculação', time: '18:00', tag: 'Normal', habit: 'Exercício', completed: false },
      { id: '3', title: 'Estudar React', time: '20:00', tag: 'Normal', course: 'React Avançado', completed: false },
    ],
    tuesday: [
      { id: '4', title: 'Reunião com time', time: '10:00', tag: 'Importante', project: 'Projeto X', completed: true },
      { id: '5', title: 'Escrever documentação', time: '14:00', tag: 'Normal', project: 'Projeto X', completed: false },
      { id: '6', title: 'Meditação', time: '07:00', tag: 'Normal', habit: 'Bem-estar', completed: true },
    ],
    wednesday: [
      { id: '7', title: 'Code review', time: '11:00', tag: 'Importante', project: 'Projeto Y', completed: false },
      { id: '8', title: 'Treino cardio', time: '19:00', tag: 'Normal', habit: 'Exercício', completed: false },
    ],
    thursday: [
      { id: '9', title: 'Planejamento semanal', time: '09:00', tag: 'Importante', completed: false },
      { id: '10', title: 'Estudar TypeScript', time: '20:00', tag: 'Normal', course: 'TypeScript Pro', completed: false },
      { id: '11', title: 'Treino de musculação', time: '18:00', tag: 'Normal', habit: 'Exercício', completed: false },
    ],
    friday: [
      { id: '12', title: 'Deploy em produção', time: '15:00', tag: 'Importante', project: 'Projeto X', completed: false },
      { id: '13', title: 'Retrospectiva', time: '16:00', tag: 'Normal', completed: false },
      { id: '14', title: 'Relaxamento', time: '20:00', tag: 'Baixa', habit: 'Bem-estar', completed: false },
    ],
  });

  const daysData: DayData[] = [
    {
      id: 'monday',
      day: 'DIA 1',
      dayName: 'Segunda',
      date: '18 de Março',
      imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663250832866/ctKp2BhseTiuMbpXXeDTGv/day-monday-neon-8XGeTsGQTp9uWBgdXTGbfJ.webp',
      tasksCompleted: 2,
      totalTasks: 3,
      color: 'orange',
      tasks: tasks.monday,
    },
    {
      id: 'tuesday',
      day: 'DIA 2',
      dayName: 'Terça',
      date: '19 de Março',
      imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663250832866/ctKp2BhseTiuMbpXXeDTGv/day-tuesday-neon-mXkF3r4F2yw8KbKkHf59yf.webp',
      tasksCompleted: 2,
      totalTasks: 3,
      color: 'green',
      tasks: tasks.tuesday,
    },
    {
      id: 'wednesday',
      day: 'DIA 3',
      dayName: 'Quarta',
      date: '20 de Março',
      imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663250832866/ctKp2BhseTiuMbpXXeDTGv/day-wednesday-neon-bGjdE5CMrnuS9TrfJhy89Z.webp',
      tasksCompleted: 0,
      totalTasks: 2,
      color: 'blue',
      tasks: tasks.wednesday,
    },
    {
      id: 'thursday',
      day: 'DIA 4',
      dayName: 'Quinta',
      date: '21 de Março',
      imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663250832866/ctKp2BhseTiuMbpXXeDTGv/day-thursday-neon-c9t4FgeRQZiXUNygeotN6k.webp',
      tasksCompleted: 0,
      totalTasks: 3,
      color: 'purple',
      tasks: tasks.thursday,
    },
    {
      id: 'friday',
      day: 'DIA 5',
      dayName: 'Sexta',
      date: '22 de Março',
      imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663250832866/ctKp2BhseTiuMbpXXeDTGv/day-friday-neon-RsmBeCqZSDa8QsaBFjh9BX.webp',
      tasksCompleted: 0,
      totalTasks: 3,
      color: 'pink',
      tasks: tasks.friday,
    },
  ];

  const handleTaskToggle = (taskId: string) => {
    if (!selectedDay) return;
    
    setTasks(prev => ({
      ...prev,
      [selectedDay.id]: prev[selectedDay.id].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));

    setSelectedDay(prev => {
      if (!prev) return null;
      const updatedTasks = prev.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      const newCompleted = updatedTasks.filter(t => t.completed).length;
      return {
        ...prev,
        tasksCompleted: newCompleted,
        tasks: updatedTasks,
      };
    });
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <ExpandableSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Main Content with Side Card */}
          <div className="flex gap-8">
            {/* Left Content */}
            <div className="flex-1">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-cyan-300 uppercase tracking-widest mb-2">
              Um dia de cada vez
            </h1>
            <p className="text-slate-400 font-mono text-sm">
              Semana • Março 2026
            </p>
          </div>

          {/* Progress Section */}
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-8 mb-12 neon-glow-cyan">
            <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider mb-6">
              ▶ Progresso Geral
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProgressBar label="Dia" percentage={67} color="cyan" />
              <ProgressBar label="Semana" percentage={37} color="magenta" />
              <ProgressBar label="Mês" percentage={58} color="yellow" />
              <ProgressBar label="Ano" percentage={21} color="cyan" />
            </div>
          </div>

          {/* Days Grid */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider mb-6">
              ▶ Dias da Semana
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {daysData.map((day) => (
                <DayCard
                  key={day.id}
                  day={day.day}
                  dayName={day.dayName}
                  imageUrl={day.imageUrl}
                  tasksCompleted={day.tasksCompleted}
                  totalTasks={day.totalTasks}
                  color={day.color}
                  onClick={() => {
                    const updatedDay = {
                      ...day,
                      tasks: tasks[day.id] || day.tasks,
                      tasksCompleted: (tasks[day.id] || day.tasks).filter(t => t.completed).length,
                    };
                    setSelectedDay(updatedDay);
                  }}
                />
              ))}
            </div>
          </div>

              {/* Calendar Section */}
              <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-8 neon-glow-cyan">
                <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-wider mb-6">
                  ▶ Calendário & Compromissos
                </h2>
                <CalendarWithTasks
                  month={2}
                  year={2026}
                  allTasks={tasks}
                  onDateClick={(date) => console.log('Data clicada:', date)}
                />
              </div>
            </div>

            {/* Right Side Card */}
            <SideCard />
          </div>
        </div>
      </main>

      {/* Day Detail Modal */}
      {selectedDay && (
        <DayDetailModal
          dayName={selectedDay.dayName}
          date={selectedDay.date}
          tasks={selectedDay.tasks}
          onClose={() => setSelectedDay(null)}
          onTaskToggle={handleTaskToggle}
        />
      )}
    </div>
  );
}
