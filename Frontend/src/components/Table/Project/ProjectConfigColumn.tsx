import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { GiDeathZone, GiSheikahEye, GiWingedSword } from "react-icons/gi";
import type { Project } from "../../../types/project.types";
import { Closed } from "../../LodingBar/Closed/Closed";
import { Deadline } from "../../LodingBar/deadline/Deadline";

export function ProjectConfigColumn(): ColumnDef<Project>[] {
  return useMemo(
    () => [
      {
        header: "Projeto",
        accessorKey: "name",
        cell: (info) => <span>{info.getValue<string>()}</span>,
      },
      {
        header: "Categoria",
        accessorKey: "category",
        cell: (info) => <span>{info.getValue<string>()}</span>,
      },
      {
        header: "Prazo",
        id: "deadline",
        cell: () => <Deadline />,
      },
      {
        header: "Conclusão",
        id: "closed",
        cell: () => <Closed />,
      },
      {
        header: "Ações",
        id: "acoes",
        cell: () => (
          <div className="flex justify-center gap-2">
            <button className="cursor-pointer">
              <GiSheikahEye
                color="#6bd1ce"
                name="Visualizar"
                className="w-7 h-7"
              />
            </button>
            <button className="cursor-pointer">
              <GiWingedSword
                color="#F59E0B"
                name="Editar"
                className="w-7 h-7"
              />
            </button>
            <button className="cursor-pointer">
              <GiDeathZone color="#EF4444" name="Deletar" className="w-7 h-7" />
            </button>
          </div>
        ),
      },
    ],
    []
  );
}
