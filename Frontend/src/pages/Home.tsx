import { Card } from "../components/Card";
import { ProjectTable } from "../components/Table/Project/ProjectTable";
import { ProjectService } from "../services/ProjectService";

export function Home() {
  return (
    <div className="flex p-8 justify-center w-full h-full bg-[url(src/assets/RPG-toDo-List-bg.png)]">
      <Card className="bg-neutral-800 flex flex-col w-full border-2 rounded-2xl border-[#55b196]">
        <ProjectTable data={ProjectService.getAll()} />
      </Card>
    </div>
  );
}
