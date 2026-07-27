"use client";
import { useState } from "react";
import { CalendarWithTasks } from "../../components/CalendarWithTasks";
import { DayCard } from "../../components/DayCard";
import { DayDetailModal } from "../../components/DayDetailModal";
import {questService} from "../../../services/quest.service"
import { useQuery } from "@tanstack/react-query";
import { getWeekDay } from "@/shared/enums/weekNames.enum";

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


interface DayData {
  dayName: string;
  date: String;
  quests: quest[];
}

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const dateWeek = new Date("2026-04-28")
  const {data,isLoading, error} = useQuery<calendar>({
      queryKey: ["calendarWeek", dateWeek],
      queryFn: async () => {
       return questService.getQuestsByWeek("1",String(dateWeek));
    }
  })

  let days: DayData[] = Object.entries(data ?? {}).map(([date, day]) => ({
      dayName: getWeekDay(new Date(`${date}T00:00:00`).getDay()),
      date,
      quests: day.quests,
    }));
      

  const handleTaskToggle = (taskId: string) => {
    if (!selectedDay) return;

    // setTasks((prev) => ({
    //   ...prev,
    //   [selectedDay.id]: prev[selectedDay.id].map((task) =>
    //     task.id === taskId ? { ...task, completed: !task.completed } : task
    //   )
    // }));

    // setSelectedDay((prev) => {
    //   if (!prev) return null;
    //   const updatedTasks = prev.tasks.map((task) =>
    //     task.id === taskId ? { ...task, completed: !task.completed } : task
    //   );
    //   const newCompleted = updatedTasks.filter((t) => t.completed).length;
    //   return {
    //     ...prev,
    //     tasksCompleted: newCompleted,
    //     tasks: updatedTasks
    //   };
    // });
  };

  return (
    <div className="flex h-screen bg-black/40 overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Main Content with Side Card */}
          <div className="flex gap-8">
            {/* Left Content */}
            <div className="flex-1">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#be002a] uppercase tracking-wider mb-6">
                  Quests
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border border-[#be002a] p-9 rounded-xl">
                  {days.map((day) => (
                    <DayCard
                      key={day.dayName}
                      day={day.date}
                      dayName={day.dayName}
                      tasksCompleted={(day.quests).filter(
                            (t) => t.completed
                          ).length}
                      totalTasks={day.quests.length}
                      color={"green"}
                      onClick={() => {
                        const updatedDay = {
                          ...day,
                          tasks: day.quests,
                          tasksCompleted: (day.quests).filter(
                            (t) => t.completed
                          ).length
                        };
                        setSelectedDay(updatedDay);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Calendar Section */}
              <div className="bg-cyan-900/10 border border-[#be002a]/30 rounded-lg p-8 neon-glow-cyan">
                <h2 className="text-lg font-bold text-[#be002a] uppercase tracking-wider mb-6">
                  Calendário
                </h2>
                <CalendarWithTasks
                  month={4}
                  year={2026}
                  onDateClick={(date) => console.log("Data clicada:", date)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Day Detail Modal */}
      {selectedDay && (
        <DayDetailModal
          dayName={selectedDay.dayName}
          date={selectedDay.date}
          tasks={selectedDay.quests}
          onClose={() => setSelectedDay(null)}
          onTaskToggle={handleTaskToggle}
        />
      )}
    </div>
  );
}
