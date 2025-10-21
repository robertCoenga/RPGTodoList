import type { Project } from "../types/project.types";

export const ProjectService = {
  getAll(): Project[] {
    let projects: Project[] = [
      {
        name: "CantinaBeats",
        category: "Estudo",
        deadline: "2025-10-18",
      },
      {
        name: "QA - Reports",
        category: "Estudo",
        deadline: "2025-12-31",
      },
      {
        name: "RPG - ToDoList",
        category: "Estudo",
        deadline: "2025-10-30",
        tasks: [
          {
            description: "Desenvolver layout da tela de login",
            conclude: true,
          },
          {
            description: "Desenvolver componente de modal ",
            conclude: true,
          },
          {
            description: "Desenvolver expanded da listagem",
            conclude: false,
          },
        ],
      },
    ];

    return projects;
  },
};
