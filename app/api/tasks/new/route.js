export const POST = async (req) => {
  const data = await req.json()

  const employees = data.employees

  employees.forEach((employee, idx) => {
    if (idx === 0) {
      employee.role = "Leader"
    } else {
      employee.role = "Helper"
    }
  })

  const response = await fetch('http://10.200.72.21/TaskPlanningAPI/api/Tasks', {
    method: 'POST',
    body: JSON.stringify({
      description: data.description,
      creator: "rvallejos",
      status: data.status,
      importance: data.importance,
      taskEmployees: employees
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    return new Response("Failed to create a new task", { status: 500 })
  }

  return new Response("Created successfully", { status: 201 })
}