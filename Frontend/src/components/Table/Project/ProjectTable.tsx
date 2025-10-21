import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ExpandedState,
} from "@tanstack/react-table";
import { useState } from "react";
import type { Project } from "../../../types/project.types";
import { TaskTable } from "../Task/TaskTable";
import { ProjectConfigColumn } from "./ProjectConfigColumn";

export function ProjectTable({ data }: { data: Project[] }) {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const columns = ProjectConfigColumn();
  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.tasks ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col">
      <table className="border-collapse text-white">
        <thead className="border-b-1 border-b-[#55b196]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, idx) => (
            <>
              <tr
                key={row.id}
                className={idx % 2 != 0 ? "bg-neutral-700" : " "}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={row.id}
                    className="max-h-1 text-center font-light font-noto"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>

              {row.getIsExpanded() && (
                <tr className="bg-neutral-800">
                  <td colSpan={columns.length} className="p-0">
                    <TaskTable tasks={row.original.tasks} />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
