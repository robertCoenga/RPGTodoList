"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  time: string;
  endTime?: string;
  tag: string;
  course?: string;
  project?: string;
  habit?: string;
  completed: boolean;
  color?: string;
}

interface CalendarDay {
  date: number;
  month: number;
  year: number;
  tasks: Task[];
  isCurrentMonth: boolean;
}

interface CalendarWithTasksProps {
  month: number;
  year: number;
  allTasks: Record<string, Task[]>;
  onDateClick?: (date: number) => void;
}

/**
 * Calendário com visualização de tarefas e horários
 * Design: Taverna Neon - Cyberpunk RPG
 * Características: Exibe tarefas em cada dia com horários de início e fim
 */
export function CalendarWithTasks({
  month,
  year,
  allTasks,
  onDateClick
}: CalendarWithTasksProps) {
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);

  // Gerar calendário
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays: CalendarDay[] = [];

  // Dias do mês anterior
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      date: daysInPrevMonth - i,
      month: currentMonth - 1,
      year: currentMonth === 0 ? currentYear - 1 : currentYear,
      tasks: [],
      isCurrentMonth: false
    });
  }

  // Dias do mês atual
  for (let i = 1; i <= daysInMonth; i++) {
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    const dayOfWeek = (firstDay + i - 1) % 7;
    const dayName = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ][dayOfWeek];

    calendarDays.push({
      date: i,
      month: currentMonth,
      year: currentYear,
      tasks: allTasks[dayName] || [],
      isCurrentMonth: true
    });
  }

  // Dias do próximo mês
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      date: i,
      month: currentMonth + 1,
      year: currentMonth === 11 ? currentYear + 1 : currentYear,
      tasks: [],
      isCurrentMonth: false
    });
  }

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const tagColorMap: Record<string, string> = {
    Importante: "bg-red-900/40 text-red-300 border-red-500/30",
    Normal: "bg-slate-700/40 text-slate-300 border-slate-500/30",
    Baixa: "bg-green-900/40 text-green-300 border-green-500/30"
  };

  const getTaskColor = (tag: string): string => {
    const colors = {
      Importante: "bg-red-900/60 border-red-500/50",
      Normal: "bg-slate-700/60 border-slate-500/50",
      Baixa: "bg-green-900/60 border-green-500/50"
    };
    return (
      colors[tag as keyof typeof colors] ||
      "bg-slate-700/60 border-slate-500/50"
    );
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-cyan-300 uppercase tracking-wider">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-300 text-cyan-400 hover:text-cyan-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-300 text-cyan-400 hover:text-cyan-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-mono text-slate-500 py-2 font-bold"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((day, index) => {
          const isToday =
            new Date().getDate() === day.date &&
            new Date().getMonth() === currentMonth &&
            new Date().getFullYear() === currentYear;
          const isCurrentMonth = day.isCurrentMonth;

          return (
            <div
              key={index}
              onClick={() => isCurrentMonth && onDateClick?.(day.date)}
              className={`min-h-24 p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
                isToday
                  ? "bg-cyan-500/20 border-cyan-500 shadow-lg shadow-cyan-500/30"
                  : isCurrentMonth
                    ? "bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/70"
                    : "bg-slate-900/30 border-slate-800 text-slate-600"
              }`}
            >
              {/* Date Number */}
              <div
                className={`text-xs font-mono font-bold mb-1 ${isCurrentMonth ? "text-slate-300" : "text-slate-600"}`}
              >
                {day.date}
              </div>

              {/* Tasks */}
              <div className="space-y-1">
                {day.tasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className={`text-xs p-1 rounded border truncate font-mono transition-all duration-300 hover:shadow-lg ${getTaskColor(task.tag)}`}
                    title={`${task.title} - ${task.time}${task.endTime ? ` até ${task.endTime}` : ""}`}
                  >
                    <div className="font-bold text-xs truncate">
                      {task.time}
                    </div>
                    <div className="text-xs truncate">{task.title}</div>
                  </div>
                ))}

                {/* Show more indicator */}
                {day.tasks.length > 3 && (
                  <div className="text-xs text-cyan-400 font-mono px-1">
                    +{day.tasks.length - 3} mais
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
