'use client'

import { Button } from "@/components/ui/button";

import Link from "next/link";

import { DataTable } from "./data-table";
import { Task, columns } from "./columns";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks')
      const data = await response.json()

      setTasks(data)
    }

    fetchTasks()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Button className="mb-6" asChild>
        <Link href="/create-task">Add new Task</Link>
      </Button>

      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
