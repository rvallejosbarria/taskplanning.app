'use client'

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export type Task = {
  id: number,
  created: string,
  description: string,
  status: "InProgress" | "OnHold" | "Pending" | "Completed",
  importance: "High" | "Medium" | "Low",
  deadline?: string
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("id")}</div>
    )
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const formatted = moment(row.getValue("created")).fromNow()
      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: "description",
    header: "Description"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return <Badge variant="outline">{status}</Badge>
    }
  },
  {
    accessorKey: "importance",
    header: "Importance",
    cell: ({ row }) => {
      const importance = row.getValue("importance")
      return <Badge>{importance}</Badge>
    }
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      const deadline = row.getValue("deadline")
      const formatted = deadline ? moment(row.getValue("deadline")).format("MMM Do YY") : ""
      return <div>{formatted}</div>
    }
  }
]