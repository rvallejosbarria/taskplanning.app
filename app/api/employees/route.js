export const GET = async (req) => {
  const response = await fetch('http://10.200.72.21/TaskPlanningAPI/api/Employees')

  if (!response.ok) {
    return new Response("Failed to fetch all employees", { status: 500 })
  }

  const employees = await response.json()

  return new Response(JSON.stringify(employees), { status: 200 })
}