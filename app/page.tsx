'use client'

import { Button } from "@/components/ui/button";

import Link from "next/link";

import { DataTable } from "./data-table";
import { Task, columns } from "./columns";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
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
      <div className="mb-6">
        {session && session.user ? (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </div>
      <Button className="mb-6" asChild>
        <Link href="/create-task">Add new Task</Link>
      </Button>

      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
