import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GiDeathZone, GiWingedSword } from "react-icons/gi";
import type { Task } from "../../../types/project.types";
import { Button } from "../../Button";

export function TaskTable({ tasks }: { tasks: Task[] }) {
  const taskColumns: ColumnDef<Task>[] = [
    {
      accessorKey: "description",
      header: "Descrição",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "conclude",
      header: "Concluído",
      cell: ({ getValue, row }) => {
        const value = getValue() as boolean;
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={() => {
              console.log("Alterar task:", row.original);
              // aqui você pode chamar uma função de updateTask(row.original)
            }}
          />
        );
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            icon=<GiWingedSword
              color="#F59E0B"
              name="Editar"
              className="w-7 h-7"
            />
            className="cursor-pointer"
            onClick={() => console.log("Editar", row.original)}
          />
          <Button
            icon=<GiDeathZone
              color="#BE002A"
              name="Deletar"
              className="w-7 h-7"
            />
            className="cursor-pointer"
            onClick={() => console.log("Excluir", row.original)}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable<Task>({
    data: tasks,
    columns: taskColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border-t border-neutral-700 text-white text-sm">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="p-2 text-center font-medium bg-neutral-700"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b text-center border-neutral-700">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
