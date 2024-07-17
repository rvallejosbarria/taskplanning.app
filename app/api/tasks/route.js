export const GET = async (req) => {
  const response = await fetch('http://10.200.72.21/TaskPlanningAPI/api/Tasks')

  if (!response.ok) {
    return new Response("Failed to fetch all tasks", { status: 500 })
  }

  const tasks = await response.json()

  return new Response(JSON.stringify(tasks), { status: 200 })
}