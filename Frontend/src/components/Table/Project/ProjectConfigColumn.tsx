import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { GiEvilBook, GiLightningBow } from "react-icons/gi";
import type { Project } from "../../../types/project.types";
import { Button } from "../../Button";
import { Closed } from "../../LodingBar/Closed/Closed";
import { Deadline } from "../../LodingBar/deadline/Deadline";
import { CreateProject } from "../../Modal/Project/CreateProject";
import { DeleteProject } from "../../Modal/Project/DeleteProject";
import { EditProject } from "../../Modal/Project/EditProject";
import { ReadProject } from "../../Modal/Project/ReadProject";

export function ProjectConfigColumn(): ColumnDef<Project>[] {
  return useMemo(
    () => [
      {
        header: "Projeto",
        accessorKey: "name",
        cell: ({ row, getValue }) => (
          <div className=" flex flex-row gap-2 justify-center">
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
              }}
            >
              {row.getIsExpanded() ? (
                <GiLightningBow className="w-5 h-5 text-[#55b196] rotate-50" />
              ) : (
                <GiLightningBow className="w-5 h-5 text-[#55b196] -rotate-40" />
              )}
            </button>
            <span>{getValue<string>()}</span>
          </div>
        ),
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
        cell: ({ row }) => (
          <Closed
            done={
              row.original.tasks
                ? row.original.tasks?.filter((t) => t.conclude).length
                : 0
            }
            total={row.original.tasks ? row.original.tasks?.length : 0}
          />
        ),
      },
      {
        header: <CreateProject />,
        id: "acoes",
        cell: () => (
          <div className="flex justify-center gap-2">
            <ReadProject />
            <EditProject />
            <DeleteProject />
            <Button
              icon=<GiEvilBook className="w-7 h-7 text-[#1EA669]" />
              className="cursor-pointer"
              onClick={() => alert("Cadastrar Task")}
            />
          </div>
        ),
      },
    ],
    []
  );
}
