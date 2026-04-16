"use client";
import { useState } from "react";
import { ExpandableButton } from "@/app/components/ExpandableButton";
import { GiDoubleDragon, GiSeaSerpent , GiHydra,  GiFreedomDove, GiWilliamTellSkull, GiBurningBook    } from "react-icons/gi";
import { DayCard } from "./components/DayCard";
import {DayDetailModal} from "./components/DayDetailModal";
import {CalendarWithTasks} from "./components/CalendarWithTasks";
import Image from "next/image";
import { MageIcon } from "@/shared/icons/MageIcon";

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

export default function Lobby (){

  //#region Variables
    const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
    const [tasks, setTasks] = useState<Record<string, Task[]>>({
        monday: [
          {
            id: "1",
            title: "Revisar código do projeto",
            time: "09:00",
            tag: "Importante",
            project: "Projeto X",
            completed: true
          },
          {
            id: "2",
            title: "Treino de musculação",
            time: "18:00",
            tag: "Normal",
            habit: "Exercício",
            completed: false
          },
          {
            id: "3",
            title: "Estudar React",
            time: "20:00",
            tag: "Normal",
            course: "React Avançado",
            completed: false
          }
        ],
        tuesday: [
          {
            id: "4",
            title: "Reunião com time",
            time: "10:00",
            tag: "Importante",
            project: "Projeto X",
            completed: true
          },
          {
            id: "5",
            title: "Escrever documentação",
            time: "14:00",
            tag: "Normal",
            project: "Projeto X",
            completed: false
          },
          {
            id: "6",
            title: "Meditação",
            time: "07:00",
            tag: "Normal",
            habit: "Bem-estar",
            completed: true
          }
        ],
        wednesday: [
          {
            id: "7",
            title: "Code review",
            time: "11:00",
            tag: "Importante",
            project: "Projeto Y",
            completed: false
          },
          {
            id: "8",
            title: "Treino cardio",
            time: "19:00",
            tag: "Normal",
            habit: "Exercício",
            completed: false
          }
        ],
        thursday: [
          {
            id: "9",
            title: "Planejamento semanal",
            time: "09:00",
            tag: "Importante",
            completed: false
          },
          {
            id: "10",
            title: "Estudar TypeScript",
            time: "20:00",
            tag: "Normal",
            course: "TypeScript Pro",
            completed: false
          },
          {
            id: "11",
            title: "Treino de musculação",
            time: "18:00",
            tag: "Normal",
            habit: "Exercício",
            completed: false
          }
        ],
        friday: [
          {
            id: "12",
            title: "Deploy em produção",
            time: "15:00",
            tag: "Importante",
            project: "Projeto X",
            completed: false
          },
          {
            id: "13",
            title: "Retrospectiva",
            time: "16:00",
            tag: "Normal",
            completed: false
          },
          {
            id: "14",
            title: "Relaxamento",
            time: "20:00",
            tag: "Baixa",
            habit: "Bem-estar",
            completed: false
          }
        ]
      });
    
      const daysData: DayData[] = [
        {
          id: "monday",
          day: "DIA 1",
          dayName: "Segunda",
          date: "18 de Março",
          imageUrl:
            "https://d2xsxph8kpxj0f.cloudfront.net/310519663250832866/ctKp2BhseTiuMbpXXeDTGv/day-monday-neon-8XGeTsGQTp9uWBgdXTGbfJ.webp",
          tasksCompleted: 2,
          totalTasks: 3,
          color: "orange",
          tasks: tasks.monday
        },
        {
          id: "tuesday",
          day: "DIA 2",
          dayName: "Terça",
          date: "19 de Março",
          imageUrl:
            "https://d2xsxph8kpxj0f.cloudfront.net/310519663250832866/ctKp2BhseTiuMbpXXeDTGv/day-tuesday-neon-mXkF3r4F2yw8KbKkHf59yf.webp",
          tasksCompleted: 2,
          totalTasks: 3,
          color: "green",
          tasks: tasks.tuesday
        },
        {
          id: "wednesday",
          day: "DIA 3",
          dayName: "Quarta",
          date: "20 de Março",
          imageUrl:
            "https://d2xsxph8kpxj0f.cloudfront.net/310519663250832866/ctKp2BhseTiuMbpXXeDTGv/day-wednesday-neon-bGjdE5CMrnuS9TrfJhy89Z.webp",
          tasksCompleted: 0,
          totalTasks: 2,
          color: "blue",
          tasks: tasks.wednesday
        },
        {
          id: "thursday",
          day: "DIA 4",
          dayName: "Quinta",
          date: "21 de Março",
          imageUrl:
            "https://d2xsxph8kpxj0f.cloudfront.net/310519663250832866/ctKp2BhseTiuMbpXXeDTGv/day-thursday-neon-c9t4FgeRQZiXUNygeotN6k.webp",
          tasksCompleted: 0,
          totalTasks: 3,
          color: "purple",
          tasks: tasks.thursday
        },
        {
          id: "friday",
          day: "DIA 5",
          dayName: "Sexta",
          date: "22 de Março",
          imageUrl:
            "https://d2xsxph8kpxj0f.cloudfront.net/310519663250832866/ctKp2BhseTiuMbpXXeDTGv/day-friday-neon-RsmBeCqZSDa8QsaBFjh9BX.webp",
          tasksCompleted: 0,
          totalTasks: 3,
          color: "pink",
          tasks: tasks.friday
        }
      ];
    
      const handleTaskToggle = (taskId: string) => {
        if (!selectedDay) return;
    
        setTasks((prev) => ({
          ...prev,
          [selectedDay.id]: prev[selectedDay.id].map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        }));

     setSelectedDay((prev) => {
      if (!prev) return null;
      const updatedTasks = prev.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      const newCompleted = updatedTasks.filter((t) => t.completed).length;
      return {
        ...prev,
        tasksCompleted: newCompleted,
        tasks: updatedTasks
      };
    });
  };
  
    var projects: Project[] = [], habits: Habit[] = [];

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
  //#endregion

    return (
         <div className="flex bg-black/40 items-center justify-center h-full w-full  max-w-screen overflow-hidden max-h-screen">
            <div className=" flex flex-row max-h-200 min-h-180 max-w-220 gap-5 p-10 items-center border-2 bg-[#1b1b1b] border-gray-600 rounded-2xl">
              <div className="flex flex-col gap-10" id="character-menu-left">
                    <ExpandableButton buttonPosition="left"
                          margin=""
                          color="#be002a" 
                          icon={<GiSeaSerpent className="text-gray-600 max-h-20 max-w-20 min-h-20 min-w-15 h-full w-full hover:text-[#be002a]"/>} title="Quest">
                          <DayDetailModal
                            dayName={daysData[0].dayName}
                            date={daysData[0].date}
                            tasks={daysData[0].tasks}
                            onClose={() => setSelectedDay(null)}
                            onTaskToggle={handleTaskToggle}
                            />
                    </ExpandableButton>
                     <ExpandableButton buttonPosition="left"
                          margin=""
                          color="#ad0a4e" 
                          icon={<GiDoubleDragon className=" text-gray-600 max-h-20 max-w-20 min-h-20 min-w-15 h-full w-full hover:text-[#ad0a4e]"/>} title="Quest Semanal">
                        <div className="w-2xl">
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
                                    tasksCompleted: (tasks[day.id] || day.tasks).filter(
                                    (t) => t.completed
                                    ).length
                                };
                                setSelectedDay(updatedDay);
                                }}
                            />
                            ))}
                        </div>
                        </div>
                    </ExpandableButton>
                    <ExpandableButton buttonPosition="left"
                        margin=""
                        color="#760a91" 
                        icon={<GiHydra className="text-gray-600 max-h-20 max-w-20 min-h-20 min-w-15 h-full w-full hover:text-[#760a91]"/>} title="Temporada">
                        <div className="w-3xl">
                              <CalendarWithTasks
                                              month={2}
                                              year={2026}
                                              allTasks={tasks}
                                              onDateClick={(date) => console.log("Data clicada:", date)}
                                            />
                        </div>
                    </ExpandableButton>  
              </div>
              <div className="flex flex-col gap-5" id="game-presentation">
                <h1 className="text-amber-400 text-5xl w-full text-center">RPG-LIFE</h1>
                <div className=" rounded-md bg-gray-600 p-2 flex flex-col max-w-150" id="character">
                      <Image
                          className="w-full h-full overflow-hidden"
                          src="/mage_base.gif"
                          alt="character_gif"
                          width={100}
                          height={100}

                      />
                      <div className="flex flex-row bg-gray-800 border-t-6 border-gray-600 gap-2" id="statics">
                          <MageIcon className=" h-25 text-green-400 bg-gray-700 border-r-3 border-gray-600" />
                          <div className="flex flex-col w-full items-start">
                            <h1 className="text-5xl text-green-400">Gamet</h1>
                            <p className="text-xl text-gray-500">Level: 1</p>
                          </div>
                      </div> 
                </div>
                <div className=" flex flex-row items-center justify-center gap-5" id="game-options">
                    <button className="rounded-md bg-green-300 text-white p-2 w-25">Start</button>
                    <button className="rounded-md bg-red-400 text-white p-2 w-25">Inventari</button>
                </div>
              </div>  
                
                 <div className="flex flex-col items-center gap-10" id="character-menu-right">
                   <ExpandableButton buttonPosition="right"
                      margin=""
                      color="#6bd1ce" 
                      icon={<GiFreedomDove className="text-gray-600 max-h-20 max-w-20 min-h-20 min-w-15 h-full w-full hover:text-[#6bd1ce]"/>} title="Sonhos">
                        <h1>Sonhos</h1>
                    </ExpandableButton>
                     <ExpandableButton buttonPosition="right" 
                          margin= ""
                          color="#0d53bd" 
                          icon={<GiWilliamTellSkull className="text-gray-600 max-h-20 max-w-20 min-h-20 min-w-15 h-full w-full hover:text-[#0d53bd]"/>} title="Metas">
                        <div className="w-xl">
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
                    </ExpandableButton>
                    <ExpandableButton buttonPosition="right"
                        margin= ""
                        color="#401d85" 
                        icon={<GiBurningBook className="text-gray-600 max-h-20 max-w-20 min-h-20 min-w-15 h-full w-full hover:text-[#401d85]"/>} title="Projetos">
                        <div className="w-xl">
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
                    </ExpandableButton>  
                </div>
                
            </div>   
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
    )
}