type Task = {
  description: string;
  conclude: boolean;
};

type Project = {
  name: string;
  category: string;
  deadline: string;
  tasks?: Task[];
};

export type { Project, Task };
